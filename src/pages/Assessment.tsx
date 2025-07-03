
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AssessmentData {
  personalInfo: {
    age: string;
    gender: string;
    height: string;
    weight: string;
    activityLevel: string;
  };
  medicalHistory: {
    conditions: string[];
    allergies: string;
    medications: string;
    supplements: string;
  };
  lifestyle: {
    sleepHours: string;
    stressLevel: string;
    waterIntake: string;
    alcoholConsumption: string;
  };
  goals: {
    primaryGoal: string;
    targetWeight: string;
    timeline: string;
  };
  dietary: {
    preferences: string[];
    restrictions: string;
    favoriteFoods: string;
    dislikedFoods: string;
    cookingTime: string;
    budget: string;
  };
}

const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    personalInfo: { age: '', gender: '', height: '', weight: '', activityLevel: '' },
    medicalHistory: { conditions: [], allergies: '', medications: '', supplements: '' },
    lifestyle: { sleepHours: '', stressLevel: '', waterIntake: '', alcoholConsumption: '' },
    goals: { primaryGoal: '', targetWeight: '', timeline: '' },
    dietary: { preferences: [], restrictions: '', favoriteFoods: '', dislikedFoods: '', cookingTime: '', budget: '' }
  });

  const steps = [
    'Personal Information',
    'Medical History',
    'Lifestyle Factors',
    'Health Goals',
    'Dietary Preferences'
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Assessment Data:', assessmentData);
    toast.success('Assessment completed! Our experts will review your information.');
    navigate('/dashboard');
  };

  const updateData = (section: keyof AssessmentData, field: string, value: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={assessmentData.personalInfo.age}
                  onChange={(e) => updateData('personalInfo', 'age', e.target.value)}
                />
              </div>
              <div>
                <Label>Gender</Label>
                <RadioGroup
                  value={assessmentData.personalInfo.gender}
                  onValueChange={(value) => updateData('personalInfo', 'gender', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={assessmentData.personalInfo.height}
                  onChange={(e) => updateData('personalInfo', 'height', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={assessmentData.personalInfo.weight}
                  onChange={(e) => updateData('personalInfo', 'weight', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Activity Level</Label>
              <RadioGroup
                value={assessmentData.personalInfo.activityLevel}
                onValueChange={(value) => updateData('personalInfo', 'activityLevel', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sedentary" id="sedentary" />
                  <Label htmlFor="sedentary">Sedentary (little to no exercise)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Light activity (1-3 days/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Moderate activity (3-5 days/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active">Very active (6-7 days/week)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label>Do you have any of these conditions? (Check all that apply)</Label>
              <div className="space-y-2 mt-2">
                {['Diabetes', 'High Blood Pressure', 'Heart Disease', 'PCOS', 'Thyroid Issues', 'IBS/IBD'].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition}
                      checked={assessmentData.medicalHistory.conditions.includes(condition)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateData('medicalHistory', 'conditions', [...assessmentData.medicalHistory.conditions, condition]);
                        } else {
                          updateData('medicalHistory', 'conditions', assessmentData.medicalHistory.conditions.filter(c => c !== condition));
                        }
                      }}
                    />
                    <Label htmlFor={condition}>{condition}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="allergies">Food Allergies/Intolerances</Label>
              <Textarea
                id="allergies"
                placeholder="List any food allergies or intolerances..."
                value={assessmentData.medicalHistory.allergies}
                onChange={(e) => updateData('medicalHistory', 'allergies', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                placeholder="List any medications you're currently taking..."
                value={assessmentData.medicalHistory.medications}
                onChange={(e) => updateData('medicalHistory', 'medications', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="supplements">Supplements</Label>
              <Textarea
                id="supplements"
                placeholder="List any supplements or vitamins you take..."
                value={assessmentData.medicalHistory.supplements}
                onChange={(e) => updateData('medicalHistory', 'supplements', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="sleep">Average Sleep Hours per Night</Label>
              <Input
                id="sleep"
                type="number"
                value={assessmentData.lifestyle.sleepHours}
                onChange={(e) => updateData('lifestyle', 'sleepHours', e.target.value)}
              />
            </div>
            <div>
              <Label>Stress Level</Label>
              <RadioGroup
                value={assessmentData.lifestyle.stressLevel}
                onValueChange={(value) => updateData('lifestyle', 'stressLevel', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low-stress" />
                  <Label htmlFor="low-stress">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate-stress" />
                  <Label htmlFor="moderate-stress">Moderate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high-stress" />
                  <Label htmlFor="high-stress">High</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="water">Daily Water Intake (glasses)</Label>
              <Input
                id="water"
                type="number"
                value={assessmentData.lifestyle.waterIntake}
                onChange={(e) => updateData('lifestyle', 'waterIntake', e.target.value)}
              />
            </div>
            <div>
              <Label>Alcohol Consumption</Label>
              <RadioGroup
                value={assessmentData.lifestyle.alcoholConsumption}
                onValueChange={(value) => updateData('lifestyle', 'alcoholConsumption', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="no-alcohol" />
                  <Label htmlFor="no-alcohol">None</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="occasional" id="occasional-alcohol" />
                  <Label htmlFor="occasional-alcohol">Occasional (1-2 drinks/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate-alcohol" />
                  <Label htmlFor="moderate-alcohol">Moderate (3-7 drinks/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="frequent" id="frequent-alcohol" />
                  <Label htmlFor="frequent-alcohol">Frequent (8+ drinks/week)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label>Primary Health Goal</Label>
              <RadioGroup
                value={assessmentData.goals.primaryGoal}
                onValueChange={(value) => updateData('goals', 'primaryGoal', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weight-loss" id="weight-loss" />
                  <Label htmlFor="weight-loss">Weight Loss</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weight-gain" id="weight-gain" />
                  <Label htmlFor="weight-gain">Weight Gain</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="muscle-gain" id="muscle-gain" />
                  <Label htmlFor="muscle-gain">Muscle Gain</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maintenance" id="maintenance" />
                  <Label htmlFor="maintenance">Weight Maintenance</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="health" id="general-health" />
                  <Label htmlFor="general-health">General Health Improvement</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="target-weight">Target Weight (kg) - Optional</Label>
              <Input
                id="target-weight"
                type="number"
                value={assessmentData.goals.targetWeight}
                onChange={(e) => updateData('goals', 'targetWeight', e.target.value)}
              />
            </div>
            <div>
              <Label>Timeline to Achieve Goal</Label>
              <RadioGroup
                value={assessmentData.goals.timeline}
                onValueChange={(value) => updateData('goals', 'timeline', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-month" id="1-month" />
                  <Label htmlFor="1-month">1 Month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3-months" id="3-months" />
                  <Label htmlFor="3-months">3 Months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6-months" id="6-months" />
                  <Label htmlFor="6-months">6 Months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-year" id="1-year" />
                  <Label htmlFor="1-year">1 Year</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label>Dietary Preferences (Check all that apply)</Label>
              <div className="space-y-2 mt-2">
                {['Vegetarian', 'Vegan', 'Keto', 'Mediterranean', 'Paleo', 'Halal', 'Kosher', 'Gluten-Free'].map((pref) => (
                  <div key={pref} className="flex items-center space-x-2">
                    <Checkbox
                      id={pref}
                      checked={assessmentData.dietary.preferences.includes(pref)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateData('dietary', 'preferences', [...assessmentData.dietary.preferences, pref]);
                        } else {
                          updateData('dietary', 'preferences', assessmentData.dietary.preferences.filter(p => p !== pref));
                        }
                      }}
                    />
                    <Label htmlFor={pref}>{pref}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="favorite-foods">Favorite Foods</Label>
              <Textarea
                id="favorite-foods"
                placeholder="Tell us about your favorite foods..."
                value={assessmentData.dietary.favoriteFoods}
                onChange={(e) => updateData('dietary', 'favoriteFoods', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="disliked-foods">Foods You Dislike</Label>
              <Textarea
                id="disliked-foods"
                placeholder="Any foods you strongly dislike or want to avoid..."
                value={assessmentData.dietary.dislikedFoods}
                onChange={(e) => updateData('dietary', 'dislikedFoods', e.target.value)}
              />
            </div>
            <div>
              <Label>Time Available for Cooking</Label>
              <RadioGroup
                value={assessmentData.dietary.cookingTime}
                onValueChange={(value) => updateData('dietary', 'cookingTime', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="minimal" id="minimal-cooking" />
                  <Label htmlFor="minimal-cooking">Minimal (15 min or less)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate-cooking" />
                  <Label htmlFor="moderate-cooking">Moderate (15-45 min)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="extensive" id="extensive-cooking" />
                  <Label htmlFor="extensive-cooking">I enjoy cooking (45+ min)</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label>Weekly Food Budget</Label>
              <RadioGroup
                value={assessmentData.dietary.budget}
                onValueChange={(value) => updateData('dietary', 'budget', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="budget" id="budget" />
                  <Label htmlFor="budget">Budget-friendly ($50-100/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate-budget" />
                  <Label htmlFor="moderate-budget">Moderate ($100-200/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="premium" id="premium" />
                  <Label htmlFor="premium">Premium ($200+/week)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Nutrition Assessment</CardTitle>
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-center text-sm text-gray-600">
                Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-green-500 to-blue-500"
              >
                {currentStep === steps.length - 1 ? 'Complete Assessment' : 'Next'}
                {currentStep !== steps.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;
