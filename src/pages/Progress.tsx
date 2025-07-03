
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Target, Award, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [weightData] = useState([
    { date: '2024-01-01', weight: 75, target: 68 },
    { date: '2024-01-15', weight: 74, target: 68 },
    { date: '2024-02-01', weight: 72.5, target: 68 },
    { date: '2024-02-15', weight: 71, target: 68 },
    { date: '2024-03-01', weight: 69.5, target: 68 },
  ]);

  const [nutritionData] = useState([
    { nutrient: 'Protein', current: 85, target: 100, unit: 'g' },
    { nutrient: 'Carbs', current: 200, target: 180, unit: 'g' },
    { nutrient: 'Fat', current: 60, target: 70, unit: 'g' },
    { nutrient: 'Fiber', current: 25, target: 30, unit: 'g' },
    { nutrient: 'Vitamin D', current: 15, target: 20, unit: 'mcg' },
  ]);

  const currentWeight = weightData[weightData.length - 1].weight;
  const startWeight = weightData[0].weight;
  const weightLoss = startWeight - currentWeight;
  const targetWeight = 68;
  const progressPercentage = ((startWeight - currentWeight) / (startWeight - targetWeight)) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
            <p className="text-gray-600">Monitor your nutrition journey and health improvements</p>
          </div>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-green-500" />
                Weight Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {currentWeight} kg
              </div>
              <p className="text-sm text-green-600 mb-4">
                -{weightLoss.toFixed(1)} kg from start
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
                Daily Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                4/5
              </div>
              <p className="text-sm text-blue-600 mb-4">
                Goals achieved today
              </p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Water intake</span>
                  <span className="text-green-600">✓</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Protein target</span>
                  <span className="text-green-600">✓</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Exercise</span>
                  <span className="text-red-600">✗</span>
                </div>
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
                12
              </div>
              <p className="text-sm text-purple-600 mb-4">
                Milestones reached
              </p>
              <div className="space-y-1">
                <div className="text-xs text-gray-600">🏆 First 5kg lost</div>
                <div className="text-xs text-gray-600">🎯 30-day streak</div>
                <div className="text-xs text-gray-600">💪 Protein goal met</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Weight Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nutrition Targets</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={nutritionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nutrient" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="current" fill="#8884d8" />
                  <Bar dataKey="target" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Nutrition Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Nutrition Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nutritionData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.nutrient}</span>
                      <span className="text-sm text-gray-600">
                        {item.current}/{item.target} {item.unit}
                      </span>
                    </div>
                    <Progress 
                      value={(item.current / item.target) * 100} 
                      className="h-2"
                    />
                  </div>
                  {item.current < item.target && (
                    <AlertCircle className="h-4 w-4 text-orange-500 ml-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressPage;
