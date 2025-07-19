import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  TrendingDown, 
  TrendingUp, 
  Activity, 
  Heart, 
  Zap,
  ArrowRight,
  ArrowLeft 
} from 'lucide-react';

interface GoalSelectionProps {
  onNext: (data: { goal: string; intensity: string }) => void;
  onBack: () => void;
}

const goals = [
  {
    id: 'weight_loss',
    title: 'Weight Loss',
    description: 'Lose weight and improve body composition',
    icon: TrendingDown,
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'muscle_gain',
    title: 'Muscle Gain',
    description: 'Build lean muscle and increase strength',
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    description: 'Maintain current weight and improve health',
    icon: Target,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'athletic',
    title: 'Athletic Performance',
    description: 'Optimize performance for sports and activities',
    icon: Activity,
    color: 'from-purple-500 to-violet-500'
  },
  {
    id: 'health',
    title: 'General Health',
    description: 'Focus on overall wellness and longevity',
    icon: Heart,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'energy',
    title: 'Energy & Vitality',
    description: 'Boost energy levels and mental clarity',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500'
  }
];

const intensityLevels = [
  {
    id: 'light',
    title: 'Light',
    description: 'Busy schedule, minimal time for fitness',
    commitment: '2-3 days/week'
  },
  {
    id: 'moderate',
    title: 'Moderate',
    description: 'Balanced approach with regular activity',
    commitment: '4-5 days/week'
  },
  {
    id: 'intense',
    title: 'Intense',
    description: 'Dedicated to maximizing results',
    commitment: '6-7 days/week'
  }
];

const GoalSelection: React.FC<GoalSelectionProps> = ({ onNext, onBack }) => {
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedIntensity, setSelectedIntensity] = useState<string>('');
  const [step, setStep] = useState<'goal' | 'intensity'>('goal');

  const handleGoalNext = () => {
    if (selectedGoal) {
      setStep('intensity');
    }
  };

  const handleFinish = () => {
    if (selectedGoal && selectedIntensity) {
      onNext({ goal: selectedGoal, intensity: selectedIntensity });
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full mx-auto"
      >
        {/* Progress Header */}
        <div className="premium-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {step === 'goal' ? 'What\'s Your Primary Goal?' : 'Choose Your Intensity Level'}
            </h2>
            <div className="text-sm text-muted-foreground">
              Step {step === 'goal' ? '1' : '2'} of 2
            </div>
          </div>
          <Progress value={step === 'goal' ? 50 : 100} className="h-2" />
        </div>

        {/* Goal Selection */}
        {step === 'goal' && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {goals.map((goal, index) => {
                const Icon = goal.icon;
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card
                      className={`p-6 cursor-pointer transition-all duration-300 hover-lift ${
                        selectedGoal === goal.id
                          ? 'ring-2 ring-primary shadow-lg animate-glow'
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedGoal(goal.id)}
                    >
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${goal.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{goal.title}</h3>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={onBack} className="hover-glow">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleGoalNext} 
                disabled={!selectedGoal}
                className="hover-glow"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Intensity Selection */}
        {step === 'intensity' && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {intensityLevels.map((level, index) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card
                    className={`p-6 cursor-pointer transition-all duration-300 hover-lift ${
                      selectedIntensity === level.id
                        ? 'ring-2 ring-primary shadow-lg animate-glow'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedIntensity(level.id)}
                  >
                    <div className="text-center">
                      <h3 className="font-semibold text-xl mb-2">{level.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{level.description}</p>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {level.commitment}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('goal')} className="hover-glow">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleFinish} 
                disabled={!selectedIntensity}
                className="premium-gradient text-white hover-glow"
              >
                Continue to Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GoalSelection;