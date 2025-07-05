
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Droplets, Utensils, Activity, Moon } from 'lucide-react';
import { toast } from 'sonner';

interface LogEntry {
  id: string;
  type: 'meal' | 'water' | 'exercise' | 'sleep' | 'weight';
  value: string | number;
  timestamp: Date;
  details?: string;
}

const ProgressLogger: React.FC = () => {
  const [activeTab, setActiveTab] = useState('meal');
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [formData, setFormData] = useState<any>({});

  const logTypes = [
    { id: 'meal', label: 'Meal', icon: Utensils, color: 'bg-green-500' },
    { id: 'water', label: 'Water', icon: Droplets, color: 'bg-blue-500' },
    { id: 'exercise', label: 'Exercise', icon: Activity, color: 'bg-orange-500' },
    { id: 'sleep', label: 'Sleep', icon: Moon, color: 'bg-purple-500' }
  ];

  const handleLog = () => {
    const newEntry: LogEntry = {
      id: Date.now().toString(),
      type: activeTab as any,
      value: formData[activeTab] || '',
      timestamp: new Date(),
      details: formData[`${activeTab}_details`] || ''
    };

    setEntries(prev => [...prev, newEntry]);
    setFormData({});
    toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} logged successfully!`);
  };

  const renderLogForm = () => {
    switch (activeTab) {
      case 'meal':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="meal-name">Meal Name</Label>
              <Input
                id="meal-name"
                placeholder="e.g., Grilled Chicken Salad"
                value={formData.meal || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, meal: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="400"
                  value={formData.meal_calories || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, meal_calories: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  placeholder="30"
                  value={formData.meal_protein || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, meal_protein: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  placeholder="25"
                  value={formData.meal_carbs || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, meal_carbs: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );

      case 'water':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="water-amount">Water Amount (ml)</Label>
              <Input
                id="water-amount"
                type="number"
                placeholder="250"
                value={formData.water || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, water: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[250, 500, 750, 1000].map(amount => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, water: amount }))}
                >
                  {amount}ml
                </Button>
              ))}
            </div>
          </div>
        );

      case 'exercise':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="exercise-type">Exercise Type</Label>
              <Input
                id="exercise-type"
                placeholder="e.g., Running, Weight lifting"
                value={formData.exercise || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, exercise: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="duration">Duration (min)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="30"
                  value={formData.exercise_duration || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, exercise_duration: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="intensity">Intensity (1-10)</Label>
                <Input
                  id="intensity"
                  type="number"
                  min="1"
                  max="10"
                  placeholder="7"
                  value={formData.exercise_intensity || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, exercise_intensity: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );

      case 'sleep':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="sleep-hours">Sleep Hours</Label>
              <Input
                id="sleep-hours"
                type="number"
                step="0.5"
                placeholder="7.5"
                value={formData.sleep || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, sleep: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="sleep-quality">Sleep Quality (1-10)</Label>
              <Input
                id="sleep-quality"
                type="number"
                min="1"
                max="10"
                placeholder="8"
                value={formData.sleep_quality || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, sleep_quality: e.target.value }))}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Log Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 mb-6">
          {logTypes.map(type => (
            <Button
              key={type.id}
              variant={activeTab === type.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(type.id)}
              className="flex flex-col items-center gap-1 h-16"
            >
              <type.icon className="h-4 w-4" />
              <span className="text-xs">{type.label}</span>
            </Button>
          ))}
        </div>

        {renderLogForm()}

        <Button 
          onClick={handleLog} 
          className="w-full mt-4"
          disabled={!formData[activeTab]}
        >
          Log {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </Button>

        {entries.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-3">Recent Entries</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {entries.slice(-5).reverse().map(entry => (
                <div key={entry.id} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                  <span className="font-medium capitalize">{entry.type}</span>
                  <span>{entry.value}</span>
                  <span className="text-gray-500">
                    {entry.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressLogger;
