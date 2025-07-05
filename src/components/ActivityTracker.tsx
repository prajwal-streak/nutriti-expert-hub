
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Activity, Target, Lightbulb, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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

interface Suggestion {
  type: 'nutrition' | 'exercise' | 'lifestyle';
  message: string;
  priority: 'high' | 'medium' | 'low';
}

const ActivityTracker: React.FC = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [currentActivity, setCurrentActivity] = useState<Partial<ActivityEntry>>({
    date: new Date().toISOString().split('T')[0],
    intensity: 5,
    waterIntake: 2,
    sleepHours: 7,
    mood: 'good'
  });
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  // Load activities from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`activities_${user?.id}`);
    if (saved) {
      setActivities(JSON.parse(saved));
    }
  }, [user?.id]);

  // Generate suggestions based on activity data
  const generateSuggestions = (activityData: ActivityEntry[]): Suggestion[] => {
    const suggestions: Suggestion[] = [];
    
    if (activityData.length === 0) return suggestions;

    const recent = activityData.slice(-7); // Last 7 days
    const avgWater = recent.reduce((sum, a) => sum + (a.waterIntake || 0), 0) / recent.length;
    const avgSleep = recent.reduce((sum, a) => sum + (a.sleepHours || 0), 0) / recent.length;
    const avgSteps = recent.reduce((sum, a) => sum + (a.steps || 0), 0) / recent.length;
    const avgIntensity = recent.reduce((sum, a) => sum + (a.intensity || 0), 0) / recent.length;

    // Water intake suggestions
    if (avgWater < 2.5) {
      suggestions.push({
        type: 'nutrition',
        message: `Your average water intake is ${avgWater.toFixed(1)}L. Try to increase to 2.5-3L daily for better hydration.`,
        priority: 'high'
      });
    }

    // Sleep suggestions
    if (avgSleep < 7) {
      suggestions.push({
        type: 'lifestyle',
        message: `You're averaging ${avgSleep.toFixed(1)} hours of sleep. Aim for 7-9 hours for better recovery.`,
        priority: 'high'
      });
    }

    // Exercise suggestions
    if (avgSteps < 8000) {
      suggestions.push({
        type: 'exercise',
        message: `Your step count is ${Math.round(avgSteps)} steps/day. Try to reach 8,000-10,000 steps daily.`,
        priority: 'medium'
      });
    }

    // Intensity suggestions
    if (avgIntensity < 4) {
      suggestions.push({
        type: 'exercise',
        message: 'Consider increasing your workout intensity gradually to see better results.',
        priority: 'medium'
      });
    }

    return suggestions;
  };

  const handleSaveActivity = () => {
    if (!currentActivity.exerciseType || !currentActivity.duration) {
      toast.error('Please fill in exercise type and duration');
      return;
    }

    const newActivity: ActivityEntry = {
      id: Date.now().toString(),
      date: currentActivity.date || new Date().toISOString().split('T')[0],
      exerciseType: currentActivity.exerciseType || '',
      duration: currentActivity.duration || 0,
      intensity: currentActivity.intensity || 5,
      steps: currentActivity.steps || 0,
      waterIntake: currentActivity.waterIntake || 2,
      sleepHours: currentActivity.sleepHours || 7,
      meals: currentActivity.meals || '',
      mood: currentActivity.mood || 'good',
      notes: currentActivity.notes || ''
    };

    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    localStorage.setItem(`activities_${user?.id}`, JSON.stringify(updatedActivities));
    
    // Generate new suggestions
    setSuggestions(generateSuggestions(updatedActivities));
    
    // Reset form
    setCurrentActivity({
      date: new Date().toISOString().split('T')[0],
      intensity: 5,
      waterIntake: 2,
      sleepHours: 7,
      mood: 'good'
    });

    toast.success('Activity logged successfully!');
  };

  // Generate suggestions when component mounts
  useEffect(() => {
    setSuggestions(generateSuggestions(activities));
  }, [activities]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Daily Activity Logger
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={currentActivity.date}
                onChange={(e) => setCurrentActivity(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="exercise-type">Exercise Type</Label>
              <Select
                value={currentActivity.exerciseType}
                onValueChange={(value) => setCurrentActivity(prev => ({ ...prev, exerciseType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select exercise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="walking">Walking</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="cycling">Cycling</SelectItem>
                  <SelectItem value="swimming">Swimming</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="weight-training">Weight Training</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="30"
                value={currentActivity.duration || ''}
                onChange={(e) => setCurrentActivity(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <Label htmlFor="intensity">Intensity (1-10)</Label>
              <Input
                id="intensity"
                type="number"
                min="1"
                max="10"
                value={currentActivity.intensity}
                onChange={(e) => setCurrentActivity(prev => ({ ...prev, intensity: parseInt(e.target.value) || 5 }))}
              />
            </div>
            <div>
              <Label htmlFor="steps">Steps Count</Label>
              <Input
                id="steps"
                type="number"
                placeholder="8000"
                value={currentActivity.steps || ''}
                onChange={(e) => setCurrentActivity(prev => ({ ...prev, steps: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <Label htmlFor="water">Water Intake (Liters)</Label>
              <Input
                id="water"
                type="number"
                step="0.1"
                placeholder="2.5"
                value={currentActivity.waterIntake}
                onChange={(e) => setCurrentActivity(prev => ({ ...prev, waterIntake: parseFloat(e.target.value) || 2 }))}
              />
            </div>
            <div>
              <Label htmlFor="sleep">Sleep Hours</Label>
              <Input
                id="sleep"
                type="number"
                step="0.5"
                placeholder="7.5"
                value={currentActivity.sleepHours}
                onChange={(e) => setCurrentActivity(prev => ({ ...prev, sleepHours: parseFloat(e.target.value) || 7 }))}
              />
            </div>
            <div>
              <Label htmlFor="mood">Mood</Label>
              <Select
                value={currentActivity.mood}
                onValueChange={(value) => setCurrentActivity(prev => ({ ...prev, mood: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent 😊</SelectItem>
                  <SelectItem value="good">Good 🙂</SelectItem>
                  <SelectItem value="okay">Okay 😐</SelectItem>
                  <SelectItem value="tired">Tired 😴</SelectItem>
                  <SelectItem value="stressed">Stressed 😰</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="meals">Meals Summary</Label>
            <Textarea
              id="meals"
              placeholder="Brief description of what you ate today..."
              value={currentActivity.meals}
              onChange={(e) => setCurrentActivity(prev => ({ ...prev, meals: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any other observations or notes..."
              value={currentActivity.notes}
              onChange={(e) => setCurrentActivity(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>

          <Button onClick={handleSaveActivity} className="w-full">
            Log Activity
          </Button>
        </CardContent>
      </Card>

      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Personalized Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    suggestion.priority === 'high' ? 'border-red-500 bg-red-50' :
                    suggestion.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-green-500 bg-green-50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Target className="h-4 w-4 mt-1" />
                    <div>
                      <span className="font-medium capitalize">{suggestion.type}</span>
                      <p className="text-sm text-gray-700">{suggestion.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {activities.slice(-5).reverse().map((activity) => (
                <div key={activity.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{activity.exerciseType}</div>
                    <div className="text-sm text-gray-600">
                      {activity.duration} min • Intensity: {activity.intensity}/10
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{activity.date}</div>
                    <div className="text-xs text-gray-500">{activity.steps} steps</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ActivityTracker;
