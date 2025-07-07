
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AssessmentData {
  personalInfo: {
    age: number;
    gender: string;
    height: number;
    weight: number;
    targetWeight: number;
    activityLevel: string;
  };
  healthInfo: {
    medicalConditions: string[];
    allergies: string[];
    medications: string;
    sleepHours: number;
    stressLevel: number;
  };
  dietaryPreferences: {
    dietType: string;
    mealsPerDay: number;
    waterIntake: number;
    dislikedFoods: string[];
    preferredFoods: string[];
    cookingTime: string;
  };
  goals: {
    primaryGoal: string;
    timeframe: string;
    specificTargets: string[];
  };
}

const NutritionAssessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    personalInfo: {
      age: 0,
      gender: '',
      height: 0,
      weight: 0,
      targetWeight: 0,
      activityLevel: ''
    },
    healthInfo: {
      medicalConditions: [],
      allergies: [],
      medications: '',
      sleepHours: 8,
      stressLevel: 3
    },
    dietaryPreferences: {
      dietType: '',
      mealsPerDay: 3,
      waterIntake: 2,
      dislikedFoods: [],
      preferredFoods: [],
      cookingTime: ''
    },
    goals: {
      primaryGoal: '',
      timeframe: '',
      specificTargets: []
    }
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const steps = [
    { title: 'Personal Information', key: 'personalInfo' },
    { title: 'Health Information', key: 'healthInfo' },
    { title: 'Dietary Preferences', key: 'dietaryPreferences' },
    { title: 'Goals & Targets', key: 'goals' }
  ];

  const handleInputChange = (section: keyof AssessmentData, field: string, value: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayAdd = (section: keyof AssessmentData, field: string, value: string) => {
    if (value.trim()) {
      setAssessmentData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: [...(prev[section][field] || []), value.trim()]
        }
      }));
    }
  };

  const handleArrayRemove = (section: keyof AssessmentData, field: string, index: number) => {
    setAssessmentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_, i) => i !== index)
      }
    }));
  };

  const calculateBMI = () => {
    const { height, weight } = assessmentData.personalInfo;
    if (height && weight) {
      return (weight / ((height / 100) ** 2)).toFixed(1);
    }
    return '0';
  };

  const completeAssessment = () => {
    // Save assessment data
    localStorage.setItem(`assessment_${user?.id}`, JSON.stringify(assessmentData));
    
    // Generate personalized nutrition plan
    const nutritionPlan = generateNutritionPlan(assessmentData);
    localStorage.setItem(`nutrition_plan_${user?.id}`, JSON.stringify(nutritionPlan));
    
    toast.success('Assessment completed! Your personalized nutrition plan is ready.');
    navigate('/nutrition-plan');
  };

  const generateNutritionPlan = (data: AssessmentData) => {
    const { personalInfo, dietaryPreferences, goals } = data;
    const bmi = parseFloat(calculateBMI());
    
    // Calculate calorie needs
    let basalMetabolicRate;
    if (personalInfo.gender === 'male') {
      basalMetabolicRate = 88.362 + (13.397 * personalInfo.weight) + (4.799 * personalInfo.height) - (5.677 * personalInfo.age);
    } else {
      basalMetabolicRate = 447.593 + (9.247 * personalInfo.weight) + (3.098 * personalInfo.height) - (4.330 * personalInfo.age);
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const dailyCalories = Math.round(basalMetabolicRate * (activityMultipliers[personalInfo.activityLevel] || 1.2));
    
    // Generate meal suggestions avoiding disliked foods
    const mealSuggestions = generateMealSuggestions(data, dailyCalories);
    
    return {
      userId: user?.id,
      createdAt: new Date().toISOString(),
      personalInfo,
      targetCalories: dailyCalories,
      macros: {
        protein: Math.round(dailyCalories * 0.25 / 4),
        carbs: Math.round(dailyCalories * 0.45 / 4),
        fat: Math.round(dailyCalories * 0.30 / 9)
      },
      mealPlan: mealSuggestions,
      waterTarget: Math.max(2.5, personalInfo.weight * 0.035),
      restrictions: {
        dislikedFoods: dietaryPreferences.dislikedFoods,
        allergies: data.healthInfo.allergies,
        dietType: dietaryPreferences.dietType
      },
      goals: goals
    };
  };

  const generateMealSuggestions = (data: AssessmentData, calories: number) => {
    const { dislikedFoods, preferredFoods, dietType } = data.dietaryPreferences;
    
    // Base meal options
    let mealOptions = {
      breakfast: [
        { name: 'Greek Yogurt with Berries', calories: 300, protein: 20, carbs: 25, fat: 10 },
        { name: 'Avocado Toast with Eggs', calories: 400, protein: 18, carbs: 30, fat: 22 },
        { name: 'Protein Smoothie Bowl', calories: 350, protein: 25, carbs: 35, fat: 12 },
        { name: 'Overnight Oats with Nuts', calories: 320, protein: 12, carbs: 45, fat: 14 }
      ],
      lunch: [
        { name: 'Grilled Chicken Salad', calories: 450, protein: 35, carbs: 20, fat: 25 },
        { name: 'Quinoa Buddha Bowl', calories: 500, protein: 20, carbs: 60, fat: 18 },
        { name: 'Salmon with Sweet Potato', calories: 520, protein: 40, carbs: 35, fat: 22 },
        { name: 'Turkey and Veggie Wrap', calories: 420, protein: 30, carbs: 45, fat: 15 }
      ],
      dinner: [
        { name: 'Lean Beef with Vegetables', calories: 550, protein: 45, carbs: 25, fat: 28 },
        { name: 'Baked Cod with Quinoa', calories: 480, protein: 38, carbs: 40, fat: 16 },
        { name: 'Chicken Stir-fry', calories: 420, protein: 35, carbs: 30, fat: 18 },
        { name: 'Vegetable Curry with Rice', calories: 400, protein: 15, carbs: 65, fat: 12 }
      ]
    };

    // Filter out disliked foods
    const filterMeals = (meals: any[]) => {
      return meals.filter(meal => {
        return !dislikedFoods.some(disliked => 
          meal.name.toLowerCase().includes(disliked.toLowerCase())
        );
      });
    };

    return {
      breakfast: filterMeals(mealOptions.breakfast).slice(0, 3),
      lunch: filterMeals(mealOptions.lunch).slice(0, 3),
      dinner: filterMeals(mealOptions.dinner).slice(0, 3)
    };
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={assessmentData.personalInfo.age || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'age', parseInt(e.target.value))}
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  className="w-full p-2 border rounded"
                  value={assessmentData.personalInfo.gender}
                  onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={assessmentData.personalInfo.height || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'height', parseInt(e.target.value))}
                  placeholder="170"
                />
              </div>
              <div>
                <Label htmlFor="weight">Current Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={assessmentData.personalInfo.weight || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'weight', parseInt(e.target.value))}
                  placeholder="70"
                />
              </div>
              <div>
                <Label htmlFor="target-weight">Target Weight (kg)</Label>
                <Input
                  id="target-weight"
                  type="number"
                  value={assessmentData.personalInfo.targetWeight || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'targetWeight', parseInt(e.target.value))}
                  placeholder="65"
                />
              </div>
            </div>

            {assessmentData.personalInfo.height && assessmentData.personalInfo.weight && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium">Your BMI: {calculateBMI()}</p>
                <p className="text-xs text-gray-600">
                  {parseFloat(calculateBMI()) < 18.5 ? 'Underweight' :
                   parseFloat(calculateBMI()) < 25 ? 'Normal weight' :
                   parseFloat(calculateBMI()) < 30 ? 'Overweight' : 'Obese'}
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="activity">Activity Level</Label>
              <select
                id="activity"
                className="w-full p-2 border rounded"
                value={assessmentData.personalInfo.activityLevel}
                onChange={(e) => handleInputChange('personalInfo', 'activityLevel', e.target.value)}
              >
                <option value="">Select activity level</option>
                <option value="sedentary">Sedentary (office job, no exercise)</option>
                <option value="light">Light (1-3 days/week light exercise)</option>
                <option value="moderate">Moderate (3-5 days/week moderate exercise)</option>
                <option value="active">Active (6-7 days/week exercise)</option>
                <option value="veryActive">Very Active (2x/day or intense exercise)</option>
              </select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label>Medical Conditions (if any)</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="e.g., diabetes, hypertension"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleArrayAdd('healthInfo', 'medicalConditions', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Button 
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    handleArrayAdd('healthInfo', 'medicalConditions', input.value);
                    input.value = '';
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {assessmentData.healthInfo.medicalConditions.map((condition, index) => (
                  <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                    {condition}
                    <button
                      onClick={() => handleArrayRemove('healthInfo', 'medicalConditions', index)}
                      className="ml-2 text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <Label>Food Allergies</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="e.g., nuts, dairy, gluten"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleArrayAdd('healthInfo', 'allergies', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Button 
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    handleArrayAdd('healthInfo', 'allergies', input.value);
                    input.value = '';
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {assessmentData.healthInfo.allergies.map((allergy, index) => (
                  <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
                    {allergy}
                    <button
                      onClick={() => handleArrayRemove('healthInfo', 'allergies', index)}
                      className="ml-2 text-orange-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={assessmentData.healthInfo.medications}
                onChange={(e) => handleInputChange('healthInfo', 'medications', e.target.value)}
                placeholder="List any medications you're taking..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sleep">Average Sleep Hours</Label>
                <Input
                  id="sleep"
                  type="number"
                  min="4"
                  max="12"
                  value={assessmentData.healthInfo.sleepHours}
                  onChange={(e) => handleInputChange('healthInfo', 'sleepHours', parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="stress">Stress Level (1-10)</Label>
                <Input
                  id="stress"
                  type="number"
                  min="1"
                  max="10"
                  value={assessmentData.healthInfo.stressLevel}
                  onChange={(e) => handleInputChange('healthInfo', 'stressLevel', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="diet-type">Diet Type</Label>
              <select
                id="diet-type"
                className="w-full p-2 border rounded"
                value={assessmentData.dietaryPreferences.dietType}
                onChange={(e) => handleInputChange('dietaryPreferences', 'dietType', e.target.value)}
              >
                <option value="">Select diet type</option>
                <option value="balanced">Balanced Diet</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="keto">Ketogenic</option>
                <option value="paleo">Paleo</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="lowcarb">Low Carb</option>
              </select>
            </div>

            <div>
              <Label className="text-red-600 font-medium">⚠️ Foods You DISLIKE (Very Important)</Label>
              <p className="text-sm text-gray-600 mb-2">List foods you don't want in your meal plan</p>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="e.g., oats, broccoli, fish"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleArrayAdd('dietaryPreferences', 'dislikedFoods', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Button 
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    handleArrayAdd('dietaryPreferences', 'dislikedFoods', input.value);
                    input.value = '';
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {assessmentData.dietaryPreferences.dislikedFoods.map((food, index) => (
                  <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                    {food}
                    <button
                      onClick={() => handleArrayRemove('dietaryPreferences', 'dislikedFoods', index)}
                      className="ml-2 text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <Label>Preferred Foods</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="e.g., chicken, rice, vegetables"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleArrayAdd('dietaryPreferences', 'preferredFoods', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Button 
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    handleArrayAdd('dietaryPreferences', 'preferredFoods', input.value);
                    input.value = '';
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {assessmentData.dietaryPreferences.preferredFoods.map((food, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    {food}
                    <button
                      onClick={() => handleArrayRemove('dietaryPreferences', 'preferredFoods', index)}
                      className="ml-2 text-green-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="meals">Meals per Day</Label>
                <select
                  id="meals"
                  className="w-full p-2 border rounded"
                  value={assessmentData.dietaryPreferences.mealsPerDay}
                  onChange={(e) => handleInputChange('dietaryPreferences', 'mealsPerDay', parseInt(e.target.value))}
                >
                  <option value={3}>3 meals</option>
                  <option value={4}>4 meals</option>
                  <option value={5}>5 meals</option>
                  <option value={6}>6 meals</option>
                </select>
              </div>
              <div>
                <Label htmlFor="water">Daily Water (L)</Label>
                <Input
                  id="water"
                  type="number"
                  step="0.5"
                  value={assessmentData.dietaryPreferences.waterIntake}
                  onChange={(e) => handleInputChange('dietaryPreferences', 'waterIntake', parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="cooking-time">Cooking Time</Label>
                <select
                  id="cooking-time"
                  className="w-full p-2 border rounded"
                  value={assessmentData.dietaryPreferences.cookingTime}
                  onChange={(e) => handleInputChange('dietaryPreferences', 'cookingTime', e.target.value)}
                >
                  <option value="">Select time</option>
                  <option value="quick">Quick (under 15 min)</option>
                  <option value="moderate">Moderate (15-30 min)</option>
                  <option value="elaborate">Elaborate (30+ min)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="primary-goal">Primary Goal</Label>
              <select
                id="primary-goal"
                className="w-full p-2 border rounded"
                value={assessmentData.goals.primaryGoal}
                onChange={(e) => handleInputChange('goals', 'primaryGoal', e.target.value)}
              >
                <option value="">Select primary goal</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="weight-gain">Weight Gain</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="maintenance">Weight Maintenance</option>
                <option value="health-improvement">General Health</option>
                <option value="energy-boost">Energy & Vitality</option>
              </select>
            </div>

            <div>
              <Label htmlFor="timeframe">Target Timeframe</Label>
              <select
                id="timeframe"
                className="w-full p-2 border rounded"
                value={assessmentData.goals.timeframe}
                onChange={(e) => handleInputChange('goals', 'timeframe', e.target.value)}
              >
                <option value="">Select timeframe</option>
                <option value="1-month">1 Month</option>
                <option value="3-months">3 Months</option>
                <option value="6-months">6 Months</option>
                <option value="1-year">1 Year</option>
                <option value="long-term">Long-term</option>
              </select>
            </div>

            <div>
              <Label>Specific Targets</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="e.g., lose 5kg, run 5km, better energy"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleArrayAdd('goals', 'specificTargets', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Button 
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    handleArrayAdd('goals', 'specificTargets', input.value);
                    input.value = '';
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {assessmentData.goals.specificTargets.map((target, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {target}
                    <button
                      onClick={() => handleArrayRemove('goals', 'specificTargets', index)}
                      className="ml-2 text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Assessment Summary</h3>
              <div className="text-sm text-green-700 space-y-1">
                <p>• BMI: {calculateBMI()} ({parseFloat(calculateBMI()) < 18.5 ? 'Underweight' : parseFloat(calculateBMI()) < 25 ? 'Normal' : parseFloat(calculateBMI()) < 30 ? 'Overweight' : 'Obese'})</p>
                <p>• Goal: {assessmentData.goals.primaryGoal || 'Not specified'}</p>
                <p>• Diet: {assessmentData.dietaryPreferences.dietType || 'Not specified'}</p>
                <p>• Dislikes: {assessmentData.dietaryPreferences.dislikedFoods.length} foods</p>
                <p>• Allergies: {assessmentData.healthInfo.allergies.length} items</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Complete Nutrition Assessment</CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Step {currentStep + 1} of {steps.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-center text-gray-600">{steps[currentStep].title}</p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderStep()}
            
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              
              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={completeAssessment}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!assessmentData.goals.primaryGoal}
                >
                  Complete Assessment & Generate Plan
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={
                    (currentStep === 0 && (!assessmentData.personalInfo.age || !assessmentData.personalInfo.gender)) ||
                    (currentStep === 3 && !assessmentData.goals.primaryGoal)
                  }
                >
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NutritionAssessment;
