
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Calendar, Target, Award, Mail, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import AIChat from '@/components/AIChat';
import ActivityTracker from '@/components/ActivityTracker';
import ProgressTracker from '@/components/ProgressTracker';

const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAIChat, setShowAIChat] = useState(false);

  const handleSendReport = async () => {
    if (!user?.email) {
      toast.error('User email not found');
      return;
    }
    
    // Simulate sending report
    toast.success(`Progress report sent to ${user.email} and your assigned nutritionist!`);
    console.log('Sending comprehensive progress report to:', user.email);
    
    // Simulate email to nutritionist
    setTimeout(() => {
      toast.success('Nutritionist has been notified of your progress!');
    }, 2000);
  };

  const handleExportData = () => {
    const progressData = {
      user: user?.name,
      email: user?.email,
      exportDate: new Date().toISOString(),
      assessment: localStorage.getItem(`assessment_${user?.id}`),
      nutritionPlan: localStorage.getItem(`nutrition_plan_${user?.id}`),
      activities: localStorage.getItem(`activities_${user?.id}`),
      progress: localStorage.getItem(`progress_${user?.id}`)
    };
    
    const blob = new Blob([JSON.stringify(progressData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutrition-data-${user?.name || 'user'}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Your complete nutrition data has been exported!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
            <p className="text-gray-600">Your personalized nutrition journey with real-time insights</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAIChat(!showAIChat)}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              {showAIChat ? 'Hide' : 'Ask'} AI Expert
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExportData}
              className="flex items-center gap-2"
            >
              <Award className="h-4 w-4" />
              Export Data
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

        <div className="mb-8">
          <ProgressTracker />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                Update Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Modify your nutrition goals and targets based on your progress.
              </p>
              <Button 
                className="w-full" 
                onClick={() => navigate('/assessment')}
              >
                Retake Assessment
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Meal Planning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                View and update your personalized nutrition plan.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/nutrition-plan')}
              >
                View Meal Plan
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Book a session with our nutrition experts for personalized guidance.
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-blue-500"
                onClick={() => navigate('/consultation')}
              >
                Book Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
