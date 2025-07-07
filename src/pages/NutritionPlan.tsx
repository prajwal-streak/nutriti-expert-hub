
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Target, 
  Droplets, 
  Utensils, 
  Clock,
  User,
  Mail,
  CheckCircle,
  AlertCircle,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

interface NutritionPlan {
  userId: string;
  createdAt: string;
  personalInfo: any;
  targetCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  mealPlan: {
    breakfast: any[];
    lunch: any[];
    dinner: any[];
  };
  waterTarget: number;
  restrictions: {
    dislikedFoods: string[];
    allergies: string[];
    dietType: string;
  };
  goals: any;
}

const NutritionPlan: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [approvalStatus, setApprovalStatus] = useState('pending');

  useEffect(() => {
    const savedPlan = localStorage.getItem(`nutrition_plan_${user?.id}`);
    if (savedPlan) {
      setNutritionPlan(JSON.parse(savedPlan));
    }
  }, [user?.id]);

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const requestDoctorApproval = async () => {
    // Simulate sending email to doctor
    toast.success('Plan sent to nutritionist for approval!');
    setApprovalStatus('pending');
    
    // Simulate doctor approval after 3 seconds
    setTimeout(() => {
      setApprovalStatus('approved');
      toast.success('Your nutrition plan has been approved by our nutritionist!');
    }, 3000);
  };

  const downloadPlan = () => {
    if (!nutritionPlan) return;
    
    const planData = {
      user: user?.name,
      date: new Date().toLocaleDateString(),
      ...nutritionPlan
    };
    
    const blob = new Blob([JSON.stringify(planData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutrition-plan-${user?.name || 'user'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Nutrition plan downloaded!');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
              <p className="text-gray-600 mb-6">
                You need to be signed in to view your nutrition plan.
              </p>
              <Button onClick={() => navigate('/')}>
                Go to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!nutritionPlan) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">No Nutrition Plan Found</h2>
              <p className="text-gray-600 mb-6">
                Please complete your assessment first to generate a personalized nutrition plan.
              </p>
              <Button onClick={() => navigate('/assessment')}>
                Take Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Nutrition Plan</h1>
              <p className="text-gray-600">Personalized meal plan based on your assessment</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={downloadPlan}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Plan
            </Button>
            <Button
              onClick={requestDoctorApproval}
              disabled={approvalStatus === 'approved'}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              {approvalStatus === 'approved' ? 'Approved' : 'Request Approval'}
            </Button>
          </div>
        </div>

        {/* Approval Status */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {approvalStatus === 'approved' ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-yellow-500" />
                )}
                <div>
                  <h3 className="font-medium">
                    {approvalStatus === 'approved' ? 'Plan Approved' : 'Pending Approval'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {approvalStatus === 'approved' 
                      ? 'Your nutrition plan has been reviewed and approved by our nutritionist'
                      : 'Your plan is waiting for nutritionist approval'
                    }
                  </p>
                </div>
              </div>
              <Badge 
                variant={approvalStatus === 'approved' ? 'default' : 'secondary'}
                className={approvalStatus === 'approved' ? 'bg-green-500' : 'bg-yellow-500'}
              >
                {approvalStatus === 'approved' ? 'Approved' : 'Pending'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Plan Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Daily Calories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {nutritionPlan.targetCalories}
              </div>
              <p className="text-sm text-gray-600">kcal per day</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-green-500" />
                Protein
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {nutritionPlan.macros.protein}g
              </div>
              <p className="text-sm text-gray-600">
                {Math.round((nutritionPlan.macros.protein * 4 / nutritionPlan.targetCalories) * 100)}% of calories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-cyan-500" />
                Water Target
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-600">
                {nutritionPlan.waterTarget.toFixed(1)}L
              </div>
              <p className="text-sm text-gray-600">per day</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-500" />
                Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-purple-600 capitalize">
                {nutritionPlan.goals.primaryGoal.replace('-', ' ')}
              </div>
              <p className="text-sm text-gray-600">{nutritionPlan.goals.timeframe}</p>
            </CardContent>
          </Card>
        </div>

        {/* Restrictions and Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Dietary Restrictions & Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2 text-red-600">Foods to Avoid</h4>
                <div className="flex flex-wrap gap-2">
                  {nutritionPlan.restrictions.dislikedFoods.length > 0 ? (
                    nutritionPlan.restrictions.dislikedFoods.map((food, index) => (
                      <Badge key={index} variant="destructive">{food}</Badge>
                    ))
                  ) : (
                    <span className="text-gray-500">None specified</span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 text-orange-600">Allergies</h4>
                <div className="flex flex-wrap gap-2">
                  {nutritionPlan.restrictions.allergies.length > 0 ? (
                    nutritionPlan.restrictions.allergies.map((allergy, index) => (
                      <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                        {allergy}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-500">None specified</span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 text-green-600">Diet Type</h4>
                <Badge variant="outline" className="bg-green-50 text-green-800 capitalize">
                  {nutritionPlan.restrictions.dietType || 'Balanced'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Meal Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Meal Plan
            </CardTitle>
            <p className="text-sm text-gray-600">
              Meals tailored to your preferences - no {nutritionPlan.restrictions.dislikedFoods.join(', ')} included
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-6">
              {weekDays.map((day, index) => (
                <Button
                  key={day}
                  variant={selectedDay === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDay(index)}
                >
                  {day}
                </Button>
              ))}
            </div>

            <div className="space-y-6">
              {/* Breakfast */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  Breakfast
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {nutritionPlan.mealPlan.breakfast.map((meal, index) => (
                    <Card key={index} className="border-orange-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{meal.name}</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex justify-between">
                            <span>Calories:</span>
                            <span className="font-medium">{meal.calories}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Protein:</span>
                            <span className="font-medium">{meal.protein}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Carbs:</span>
                            <span className="font-medium">{meal.carbs}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fat:</span>
                            <span className="font-medium">{meal.fat}g</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Lunch */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  Lunch
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {nutritionPlan.mealPlan.lunch.map((meal, index) => (
                    <Card key={index} className="border-green-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{meal.name}</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex justify-between">
                            <span>Calories:</span>
                            <span className="font-medium">{meal.calories}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Protein:</span>
                            <span className="font-medium">{meal.protein}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Carbs:</span>
                            <span className="font-medium">{meal.carbs}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fat:</span>
                            <span className="font-medium">{meal.fat}g</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Dinner */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Dinner
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {nutritionPlan.mealPlan.dinner.map((meal, index) => (
                    <Card key={index} className="border-blue-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{meal.name}</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex justify-between">
                            <span>Calories:</span>
                            <span className="font-medium">{meal.calories}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Protein:</span>
                            <span className="font-medium">{meal.protein}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Carbs:</span>
                            <span className="font-medium">{meal.carbs}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fat:</span>
                            <span className="font-medium">{meal.fat}g</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">💡 Plan Notes</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• All meals exclude your disliked foods: {nutritionPlan.restrictions.dislikedFoods.join(', ')}</li>
                <li>• Meals are designed for your {nutritionPlan.goals.primaryGoal.replace('-', ' ')} goal</li>
                <li>• Drink {nutritionPlan.waterTarget.toFixed(1)}L of water daily</li>
                <li>• You can swap similar meals within each category</li>
                <li>• Track your progress in the Progress section</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NutritionPlan;
