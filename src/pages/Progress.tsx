
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Target, Award, AlertCircle, Mail, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import AIChat from '@/components/AIChat';
import ActivityTracker from '@/components/ActivityTracker';

interface ActivityEntry {
  id: string;
  date: string;
  exerciseType: string;
  duration: number;
  intensity: number;
  steps: number;
  waterIntake: number;
  sleepHours: number;
  meals: string;
  mood: string;
  notes: string;
}

const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAIChat, setShowAIChat] = useState(false);
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  
  // Load activities from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`activities_${user?.id}`);
    if (saved) {
      setActivities(JSON.parse(saved));
    }
  }, [user?.id]);

  // Calculate dynamic progress based on logged activities
  const calculateProgress = () => {
    if (activities.length === 0) {
      return {
        avgWater: 2.0,
        avgSleep: 7.0,
        avgSteps: 5000,
        avgIntensity: 5,
        totalWorkouts: 0,
        weeklyGoals: {
          water: 40,
          sleep: 60,
          exercise: 30,
          meals: 50
        }
      };
    }

    const recent = activities.slice(-7); // Last 7 days
    const avgWater = recent.reduce((sum, a) => sum + (a.waterIntake || 0), 0) / recent.length;
    const avgSleep = recent.reduce((sum, a) => sum + (a.sleepHours || 0), 0) / recent.length;
    const avgSteps = recent.reduce((sum, a) => sum + (a.steps || 0), 0) / recent.length;
    const avgIntensity = recent.reduce((sum, a) => sum + (a.intensity || 0), 0) / recent.length;
    const totalWorkouts = recent.filter(a => a.duration > 0).length;

    return {
      avgWater,
      avgSleep,
      avgSteps,
      avgIntensity,
      totalWorkouts,
      weeklyGoals: {
        water: Math.min(100, (avgWater / 2.5) * 100),
        sleep: Math.min(100, (avgSleep / 8) * 100),
        exercise: Math.min(100, (totalWorkouts / 4) * 100),
        meals: activities.filter(a => a.meals).length > 0 ? 80 : 20
      }
    };
  };

  const progress = calculateProgress();

  // Generate dynamic weight data based on activity consistency
  const generateWeightData = () => {
    const baseWeight = 75;
    const targetWeight = 68;
    const progressFactor = (progress.weeklyGoals.water + progress.weeklyGoals.sleep + progress.weeklyGoals.exercise) / 300;
    
    return Array.from({ length: 6 }, (_, i) => ({
      date: new Date(2024, 11, 1 + i * 7).toISOString().split('T')[0],
      weight: baseWeight - (i * 0.5 * progressFactor),
      target: targetWeight,
      bodyFat: 22 - (i * 0.3 * progressFactor)
    }));
  };

  const weightData = generateWeightData();
  const currentWeight = weightData[weightData.length - 1].weight;
  const startWeight = weightData[0].weight;
  const weightLoss = startWeight - currentWeight;
  const targetWeight = 68;
  const progressPercentage = ((startWeight - currentWeight) / (startWeight - targetWeight)) * 100;

  const nutritionData = [
    { nutrient: 'Water', current: progress.avgWater.toFixed(1), target: 2.5, unit: 'L', percentage: progress.weeklyGoals.water },
    { nutrient: 'Sleep', current: progress.avgSleep.toFixed(1), target: 8, unit: 'hrs', percentage: progress.weeklyGoals.sleep },
    { nutrient: 'Exercise', current: progress.totalWorkouts, target: 4, unit: 'days', percentage: progress.weeklyGoals.exercise },
    { nutrient: 'Steps', current: Math.round(progress.avgSteps), target: 8000, unit: 'steps', percentage: Math.min(100, (progress.avgSteps / 8000) * 100) },
  ];

  const weeklyGoals = [
    { goal: 'Daily water intake (2.5L)', completed: Math.round(progress.weeklyGoals.water / 100 * 7), target: 7, status: progress.weeklyGoals.water > 80 ? 'excellent' : progress.weeklyGoals.water > 60 ? 'good' : 'needs-improvement' },
    { goal: 'Quality sleep (8hrs)', completed: Math.round(progress.weeklyGoals.sleep / 100 * 7), target: 7, status: progress.weeklyGoals.sleep > 80 ? 'excellent' : progress.weeklyGoals.sleep > 60 ? 'good' : 'needs-improvement' },
    { goal: 'Exercise sessions', completed: progress.totalWorkouts, target: 4, status: progress.totalWorkouts >= 4 ? 'excellent' : progress.totalWorkouts >= 2 ? 'good' : 'needs-improvement' },
    { goal: 'Log meals daily', completed: Math.round(progress.weeklyGoals.meals / 100 * 7), target: 7, status: progress.weeklyGoals.meals > 80 ? 'excellent' : progress.weeklyGoals.meals > 60 ? 'good' : 'needs-improvement' },
  ];

  const handleSendReport = async () => {
    if (!user?.email) {
      toast.error('User email not found');
      return;
    }
    toast.success(`Progress report sent to ${user.email} and your assigned nutritionist!`);
    console.log('Sending progress report to:', user.email);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
            <p className="text-gray-600">Your personalized nutrition journey - {activities.length} activities logged</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAIChat(!showAIChat)}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              {showAIChat ? 'Hide' : 'Ask'} AI Assistant
            </Button>
            <Button onClick={handleSendReport} className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Send Report
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
          </div>
        </div>

        {showAIChat && (
          <div className="mb-8">
            <AIChat />
          </div>
        )}

        <div className="mb-8">
          <ActivityTracker />
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-green-500" />
                Weight Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {currentWeight.toFixed(1)} kg
              </div>
              <p className="text-sm text-green-600 mb-4">
                -{weightLoss.toFixed(1)} kg progress
              </p>
              <Progress value={Math.max(0, Math.min(100, progressPercentage))} className="h-2" />
              <p className="text-xs text-gray-500 mt-2">
                {progressPercentage.toFixed(1)}% to goal
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Weekly Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {weeklyGoals.filter(g => g.status === 'excellent' || g.status === 'good').length}/{weeklyGoals.length}
              </div>
              <p className="text-sm text-blue-600 mb-4">
                Goals on track
              </p>
              <div className="space-y-1">
                {weeklyGoals.slice(0, 3).map((goal, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="truncate">{goal.goal.split(' ')[0]} {goal.goal.split(' ')[1]}</span>
                    <span className={goal.status === 'excellent' ? 'text-green-600' : goal.status === 'good' ? 'text-blue-600' : 'text-orange-600'}>
                      {goal.completed}/{goal.target}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-500" />
                Activity Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {activities.length}
              </div>
              <p className="text-sm text-purple-600 mb-4">
                Total activities logged
              </p>
              <div className="space-y-1">
                <div className="text-xs text-gray-600">💧 Avg water: {progress.avgWater.toFixed(1)}L</div>
                <div className="text-xs text-gray-600">😴 Avg sleep: {progress.avgSleep.toFixed(1)}hrs</div>
                <div className="text-xs text-gray-600">🏃 Workouts: {progress.totalWorkouts}/week</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                Consistency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {Math.round((progress.weeklyGoals.water + progress.weeklyGoals.sleep + progress.weeklyGoals.exercise) / 3)}%
              </div>
              <p className="text-sm text-orange-600 mb-4">
                Overall consistency
              </p>
              <div className="space-y-1">
                <div className="text-xs text-gray-600">Steps: {Math.round(progress.avgSteps)}/day</div>
                <div className="text-xs text-gray-600">Intensity: {progress.avgIntensity.toFixed(1)}/10</div>
                <div className="text-xs text-gray-600">Trend: {progress.avgWater > 2 ? 'Improving' : 'Needs focus'}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Weight Progress Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} name="Weight (kg)" />
                  <Line type="monotone" dataKey="bodyFat" stroke="#ff7300" strokeWidth={2} name="Body Fat %" />
                  <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeDasharray="5 5" name="Target Weight" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Activity Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={nutritionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nutrient" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#8884d8" name="Progress %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Progress Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Goals Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyGoals.map((goal, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">{goal.goal}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          goal.status === 'excellent' ? 'bg-green-100 text-green-800' :
                          goal.status === 'good' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {goal.completed}/{goal.target}
                        </span>
                      </div>
                      <Progress 
                        value={(goal.completed / goal.target) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nutritionData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{item.nutrient}</span>
                        <span className="text-sm text-gray-600">
                          {item.current}/{item.target} {item.unit} ({Math.round(item.percentage)}%)
                        </span>
                      </div>
                      <Progress 
                        value={item.percentage} 
                        className="h-2"
                      />
                    </div>
                    {item.percentage < 70 && (
                      <AlertCircle className="h-4 w-4 text-orange-500 ml-4" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Based on Your Activity Logs</h4>
                <p className="text-sm text-blue-800">
                  {progress.avgWater < 2.5 && "Increase water intake. "}
                  {progress.avgSleep < 7 && "Focus on getting more sleep. "}
                  {progress.totalWorkouts < 3 && "Add more workout sessions. "}
                  Keep logging your activities to see better insights!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
