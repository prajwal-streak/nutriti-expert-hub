
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Target, Heart, Zap, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractiveAssessmentProps {
  onComplete: (data: any) => void;
}

const InteractiveAssessment: React.FC<InteractiveAssessmentProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const steps = [
    {
      id: 'welcome',
      title: "Welcome to Your Health Journey! 🎉",
      subtitle: "Let's create your personalized nutrition plan",
      type: 'welcome'
    },
    {
      id: 'goal',
      title: "What's Your Primary Goal?",
      subtitle: "Choose what matters most to you right now",
      type: 'single-choice',
      options: [
        { id: 'weight-loss', text: 'Lose Weight', icon: Target, color: 'from-red-400 to-red-600' },
        { id: 'muscle-gain', text: 'Build Muscle', icon: Zap, color: 'from-orange-400 to-orange-600' },
        { id: 'health', text: 'Improve Health', icon: Heart, color: 'from-green-400 to-green-600' },
        { id: 'energy', text: 'Boost Energy', icon: Brain, color: 'from-blue-400 to-blue-600' }
      ]
    },
    {
      id: 'activity',
      title: "How Active Are You?",
      subtitle: "This helps us calculate your calorie needs",
      type: 'activity-slider',
      levels: [
        { level: 1, title: 'Couch Potato', desc: 'Mostly sitting, minimal exercise' },
        { level: 2, title: 'Light Mover', desc: '1-3 light workouts per week' },
        { level: 3, title: 'Regular Exerciser', desc: '3-5 moderate workouts per week' },
        { level: 4, title: 'Fitness Enthusiast', desc: '6-7 intense workouts per week' },
        { level: 5, title: 'Athletic Beast', desc: 'Multiple daily training sessions' }
      ]
    },
    {
      id: 'diet-prefs',
      title: "What's Your Eating Style?",
      subtitle: "Select all that apply to you",
      type: 'multi-choice',
      options: [
        { id: 'vegetarian', text: '🥗 Vegetarian', desc: 'No meat, but dairy & eggs OK' },
        { id: 'vegan', text: '🌱 Vegan', desc: 'Plant-based only' },
        { id: 'keto', text: '🥑 Keto', desc: 'High fat, low carb' },
        { id: 'mediterranean', text: '🫒 Mediterranean', desc: 'Fish, olive oil, whole grains' },
        { id: 'flexible', text: '🍽️ Flexible', desc: 'I eat everything' }
      ]
    },
    {
      id: 'challenges',
      title: "What's Your Biggest Challenge?",
      subtitle: "We'll focus on solving this for you",
      type: 'single-choice',
      options: [
        { id: 'time', text: '⏰ No Time to Cook', desc: 'Need quick, easy meals' },
        { id: 'cravings', text: '🍰 Can\'t Stop Cravings', desc: 'Need help with portion control' },
        { id: 'knowledge', text: '🤔 Don\'t Know What to Eat', desc: 'Need meal guidance' },
        { id: 'motivation', text: '💪 Staying Consistent', desc: 'Need accountability' }
      ]
    }
  ];

  const handleAnswer = (stepId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [stepId]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];

  const renderStepContent = () => {
    switch (currentStepData.type) {
      case 'welcome':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="text-6xl mb-6">🚀</div>
            <p className="text-lg text-gray-600 mb-8">
              In just 2 minutes, we'll create a nutrition plan that fits your lifestyle perfectly!
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <p className="text-sm text-gray-600">Personalized Goals</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🧬</div>
                <p className="text-sm text-gray-600">Science-Based</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📱</div>
                <p className="text-sm text-gray-600">Easy to Follow</p>
              </div>
            </div>
          </motion.div>
        );

      case 'single-choice':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentStepData.options?.map((option: any, index: number) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    answers[currentStepData.id] === option.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => handleAnswer(currentStepData.id, option.id)}
                >
                  <CardContent className="p-6 text-center">
                    {option.icon && (
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${option.color} mb-4`}>
                        <option.icon className="h-8 w-8 text-white" />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold mb-2">{option.text}</h3>
                    {option.desc && <p className="text-sm text-gray-600">{option.desc}</p>}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        );

      case 'multi-choice':
        return (
          <div className="space-y-3">
            {currentStepData.options?.map((option: any, index: number) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedOptions.includes(option.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => {
                    const newSelection = selectedOptions.includes(option.id)
                      ? selectedOptions.filter(id => id !== option.id)
                      : [...selectedOptions, option.id];
                    setSelectedOptions(newSelection);
                    handleAnswer(currentStepData.id, newSelection);
                  }}
                >
                  <CardContent className="p-4 flex items-center">
                    <div className="flex-1">
                      <h3 className="font-medium">{option.text}</h3>
                      <p className="text-sm text-gray-600">{option.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded border-2 ${
                      selectedOptions.includes(option.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                    }`}>
                      {selectedOptions.includes(option.id) && (
                        <div className="text-white text-xs text-center">✓</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        );

      case 'activity-slider':
        const selectedLevel = answers[currentStepData.id] || 1;
        return (
          <div className="space-y-6">
            <div className="relative">
              <input
                type="range"
                min="1"
                max="5"
                value={selectedLevel}
                onChange={(e) => handleAnswer(currentStepData.id, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <motion.div
              key={selectedLevel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {currentStepData.levels?.[selectedLevel - 1]?.title}
              </h3>
              <p className="text-gray-600">
                {currentStepData.levels?.[selectedLevel - 1]?.desc}
              </p>
            </motion.div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
              <span className="text-sm opacity-90">
                {currentStep + 1}/{steps.length}
              </span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
            <p className="text-sm opacity-90 mt-2">{currentStepData.subtitle}</p>
          </CardHeader>
          
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-green-500 to-blue-500 flex items-center gap-2"
                disabled={currentStepData.type !== 'welcome' && !answers[currentStepData.id]}
              >
                {currentStep === steps.length - 1 ? 'Create My Plan! 🚀' : 'Next'}
                {currentStep !== steps.length - 1 && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveAssessment;
