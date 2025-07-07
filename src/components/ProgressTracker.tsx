
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, TrendingUp, Target, Droplets, Utensils, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ProgressEntry {
  date: string;
  weight: number;
  calories: number;
  protein: number;
  water: number;
  exercise: number;
  mood: number;
  notes: string;
}

interface NutritionPlan {
  targetCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  waterTarget: number;
  goals: {
    primaryGoal: string;
    timeframe: string;
  };
}

const ProgressTracker: React.FC = () => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState<ProgressEntry[]>([]);
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    // Load nutrition plan
    const savedPlan = localStorage.getItem(`nutrition_plan_${user?.id}`);
    if (savedPlan) {
      setNutritionPlan(JSON.parse(savedPlan));
    }

    // Load progress data
    const savedProgress = localStorage.getItem(`progress_${user?.id}`);
    if (savedProgress) {
      setProgressData(JSON.parse(savedProgress));
    } else {
      // Generate sample progress data
      generateSampleProgress();
    }
  }, [user?.id]);

  const generateSampleProgress = () => {
    const sampleData: ProgressEntry[] = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      sampleData.push({
        date: date.toISOString().split('T')[0],
        weight: 75 - (i * 0.1) + (Math.random() * 0.5),
        calories: 1800 + (Math.random() * 400),
        protein: 120 + (Math.random() * 40),
        water: 2.0 + (Math.random() * 1.5),
        exercise: Math.random() > 0.3 ? 30 + (Math.random() * 60) : 0,
        mood: 7 + (Math.random() * 3),
        notes: ''
      });
    }
    
    setProgressData(sampleData);
    localStorage.setItem(`progress_${user?.id}`, JSON.stringify(sampleData));
  };

  const calculateStreak = () => {
    let streak = 0;
    const sortedData = [...progressData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    for (const entry of sortedData) {
      if (entry.calories >= (nutritionPlan?.targetCalories || 1800) * 0.9 && 
          entry.water >= (nutritionPlan?.waterTarget || 2.5) * 0.8) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getWeeklyAverages = () => {
    const lastWeek = progressData.slice(-7);
    if (lastWeek.length === 0) return null;

    return {
      weight: lastWeek.reduce((sum, entry) => sum + entry.weight, 0) / lastWeek.length,
      calories: lastWeek.reduce((sum, entry) => sum + entry.calories, 0) / lastWeek.length,
      protein: lastWeek.reduce((sum, entry) => sum + entry.protein, 0) / lastWeek.length,
      water: lastWeek.reduce((sum, entry) => sum + entry.water, 0) / lastWeek.length,
      exercise: lastWeek.reduce((sum, entry) => sum + entry.exercise, 0) / lastWeek.length,
      mood: lastWeek.reduce((sum, entry) => sum + entry.mood, 0) / lastWeek.length
    };
  };

  const getProgressTowardsGoal = () => {
    if (!nutritionPlan || progressData.length < 2) return 0;
    
    const startWeight = progressData[0].weight;
    const currentWeight = progressData[progressData.length - 1].weight;
    const targetWeight = nutritionPlan.goals.primaryGoal.includes('loss') ? startWeight - 10 : startWeight + 5;
    
    const progress = Math.abs(currentWeight - startWeight) / Math.abs(targetWeight - startWeight) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const weeklyAverages = getWeeklyAverages();
  const goalProgress = getProgressTowardsGoal();
  const streak = calculateStreak();

  const chartData = progressData.slice(-14).map(entry => ({
    date: new Date(entry.date).toLocaleDateString(),
    weight: entry.weight,
    calories: entry.calories,
    protein: entry.protein,
    water: entry.water * 10, // Scale for chart visibility
    exercise: entry.exercise
  }));

  const complianceData = [
    {
      metric: 'Calories',
      target: nutritionPlan?.targetCalories || 1800,
      actual: weeklyAverages?.calories || 0,
      percentage: weeklyAverages ? (weeklyAverages.calories / (nutritionPlan?.targetCalories || 1800)) * 100 : 0
    },
    {
      metric: 'Protein',
      target: nutritionPlan?.macros.protein || 120,
      actual: weeklyAverages?.protein || 0,
      percentage: weeklyAverages ? (weeklyAverages.protein / (nutritionPlan?.macros.protein || 120)) * 100 : 0
    },
    {
      metric: 'Water',
      target: nutritionPlan?.waterTarget || 2.5,
      actual: weeklyAverages?.water || 0,
      percentage: weeklyAverages ? (weeklyAverages.water / (nutritionPlan?.waterTarget || 2.5)) * 100 : 0
    },
    {
      metric: 'Exercise',
      target: 30,
      actual: weeklyAverages?.exercise || 0,
      percentage: weeklyAverages ? Math.min(100, (weeklyAverages.exercise / 30) * 100) : 0
    }
  ];

  if (!nutritionPlan) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">No Nutrition Plan Found</h3>
          <p className="text-gray-600">Complete your assessment to enable progress tracking.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-green-500" />
              Goal Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 mb-2">
              {goalProgress.toFixed(1)}%
            </div>
            <Progress value={goalProgress} className="h-2 mb-2" />
            <p className="text-xs text-gray-600">
              {nutritionPlan.goals.primaryGoal.replace('-', ' ')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-blue-500" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {streak} days
            </div>
            <p className="text-xs text-gray-600">
              Meeting daily targets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              Weekly Avg Weight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {weeklyAverages ? weeklyAverages.weight.toFixed(1) : '0'} kg
            </div>
            <p className="text-xs text-gray-600">
              {progressData.length > 7 ? 
                `${(weeklyAverages!.weight - progressData[progressData.length - 8].weight).toFixed(1)}kg this week` : 
                'Tracking started'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-orange-500" />
              Avg Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-2">
              {weeklyAverages ? weeklyAverages.mood.toFixed(1) : '0'}/10
            </div>
            <p className="text-xs text-gray-600">
              {weeklyAverages && weeklyAverages.mood >= 8 ? 'Excellent' : 
               weeklyAverages && weeklyAverages.mood >= 6 ? 'Good' : 'Needs attention'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weight & Nutrition Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} name="Weight (kg)" />
                <Line type="monotone" dataKey="calories" stroke="#82ca9d" strokeWidth={2} name="Calories" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#8884d8" name="Compliance %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Compliance */}
      <Card>
        <CardHeader>
          <CardTitle>Nutrition Plan Compliance</CardTitle>
          <p className="text-sm text-gray-600">
            Based on your personalized nutrition plan targets
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {item.metric === 'Calories' && <Utensils className="h-5 w-5 text-green-500" />}
                  {item.metric === 'Protein' && <Target className="h-5 w-5 text-blue-500" />}
                  {item.metric === 'Water' && <Droplets className="h-5 w-5 text-cyan-500" />}
                  {item.metric === 'Exercise' && <Activity className="h-5 w-5 text-orange-500" />}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.metric}</span>
                      <span className="text-sm text-gray-600">
                        {item.actual.toFixed(1)} / {item.target} ({Math.round(item.percentage)}%)
                      </span>
                    </div>
                    <Progress 
                      value={Math.min(100, item.percentage)} 
                      className="h-2"
                    />
                  </div>
                </div>
                <div className={`ml-4 px-2 py-1 rounded text-xs ${
                  item.percentage >= 90 ? 'bg-green-100 text-green-800' :
                  item.percentage >= 70 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {item.percentage >= 90 ? 'Excellent' : 
                   item.percentage >= 70 ? 'Good' : 'Need Focus'}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">💡 Based on Your Nutrition Plan</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Target: {nutritionPlan.targetCalories} calories/day for {nutritionPlan.goals.primaryGoal.replace('-', ' ')}</p>
              <p>• Protein: {nutritionPlan.macros.protein}g/day for muscle support</p>
              <p>• Water: {nutritionPlan.waterTarget.toFixed(1)}L/day for optimal hydration</p>
              <p>• Exercise: 30+ minutes/day recommended for your goals</p>
              <p>• Current streak: {streak} days of meeting targets!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;
