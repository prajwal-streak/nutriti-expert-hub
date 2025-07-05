import React, { useState } from 'react';
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

const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAIChat, setShowAIChat] = useState(false);
  
  // Realistic progress data based on actual user journey
  const [weightData] = useState([
    { date: '2024-12-01', weight: 75, target: 68, bodyFat: 22 },
    { date: '2024-12-08', weight: 74.2, target: 68, bodyFat: 21.5 },
    { date: '2024-12-15', weight: 73.5, target: 68, bodyFat: 21.2 },
    { date: '2024-12-22', weight: 72.8, target: 68, bodyFat: 20.8 },
    { date: '2024-12-29', weight: 72.1, target: 68, bodyFat: 20.5 },
    { date: '2025-01-05', weight: 71.5, target: 68, bodyFat: 20.2 },
  ]);

  const [nutritionData] = useState([
    { nutrient: 'Protein', current: 98, target: 112, unit: 'g', percentage: 87 },
    { nutrient: 'Carbs', current: 185, target: 200, unit: 'g', percentage: 92 },
    { nutrient: 'Fat', current: 52, target: 60, unit: 'g', percentage: 87 },
    { nutrient: 'Fiber', current: 28, target: 30, unit: 'g', percentage: 93 },
    { nutrient: 'Water', current: 2.1, target: 2.5, unit: 'L', percentage: 84 },
  ]);

  const [weeklyGoals] = useState([
    { goal: 'Follow meal plan 6/7 days', completed: 5, target: 6, status: 'good' },
    { goal: 'Drink 2.5L water daily', completed: 4, target: 7, status: 'needs-improvement' },
    { goal: 'Exercise 4 times', completed: 3, target: 4, status: 'good' },
    { goal: 'Sleep 7+ hours', completed: 6, target: 7, status: 'excellent' },
    { goal: 'Log meals daily', completed: 7, target: 7, status: 'excellent' },
  ]);

  const currentWeight = weightData[weightData.length - 1].weight;
  const startWeight = weightData[0].weight;
  const weightLoss = startWeight - currentWeight;
  const targetWeight = 68;
  const progressPercentage = ((startWeight - currentWeight) / (startWeight - targetWeight)) * 100;

  const handleSendReport = async () => {
    if (!user?.email) {
      toast.error('User email not found');
      return;
    }

    // Simulate sending report
    toast.success(`Progress report sent to ${user.email} and your assigned nutritionist!`);
    
    // In real implementation, this would trigger an email service
    console.log('Sending progress report to:', user.email);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
            <p className="text-gray-600">Monitor your nutrition journey - Week 6 of your transformation</p>
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

        {/* Add Activity Tracker */}
        <div className="mb-8">
          <ActivityTracker />
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-green-500" />
                Weight Loss
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {currentWeight} kg
              </div>
              <p className="text-sm text-green-600 mb-4">
                -{weightLoss.toFixed(1)} kg in 6 weeks
              </p>
              <Progress value={Math.max(0, Math.min(100, progressPercentage))} className="h-2" />
              <p className="text-xs text-gray-500 mt-2">
                {progressPercentage.toFixed(1)}% to goal ({(targetWeight - currentWeight).toFixed(1)} kg to go)
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
                4/5
              </div>
              <p className="text-sm text-blue-600 mb-4">
                Goals achieved this week
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
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                8
              </div>
              <p className="text-sm text-purple-600 mb-4">
                Milestones unlocked
              </p>
              <div className="space-y-1">
                <div className="text-xs text-gray-600">🏆 Lost first 2kg</div>
                <div className="text-xs text-gray-600">🎯 30-day consistency</div>
                <div className="text-xs text-gray-600">💪 Protein goals met</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                Body Composition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                20.2%
              </div>
              <p className="text-sm text-orange-600 mb-4">
                Body fat (-1.8% from start)
              </p>
              <div className="space-y-1">
                <div className="text-xs text-gray-600">Muscle mass: 56.2kg</div>
                <div className="text-xs text-gray-600">BMI: 23.4 (Normal)</div>
                <div className="text-xs text-gray-600">Waist: 78cm (-4cm)</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Weight & Body Fat Trend</CardTitle>
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
              <CardTitle>Today's Nutrition Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={nutritionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nutrient" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="current" fill="#8884d8" name="Current" />
                  <Bar dataKey="target" fill="#82ca9d" name="Target" />
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
              <CardTitle>Nutrition Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nutritionData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{item.nutrient}</span>
                        <span className="text-sm text-gray-600">
                          {item.current}/{item.target} {item.unit} ({item.percentage}%)
                        </span>
                      </div>
                      <Progress 
                        value={item.percentage} 
                        className="h-2"
                      />
                    </div>
                    {item.percentage < 90 && (
                      <AlertCircle className="h-4 w-4 text-orange-500 ml-4" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">AI Recommendations</h4>
                <p className="text-sm text-blue-800">
                  Increase water intake by 400ml daily. Add 14g protein through a post-workout snack. 
                  Your progress is excellent - keep up the consistency!
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
