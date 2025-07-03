
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowUp, ArrowDown } from 'lucide-react';

const QuizPreview = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const quizSteps = [
    {
      title: "Basic Information",
      description: "Age, gender, height, weight, and activity level"
    },
    {
      title: "Medical History",
      description: "Chronic conditions, allergies, medications, and supplements"
    },
    {
      title: "Lifestyle Factors",
      description: "Sleep patterns, stress levels, and daily routine"
    },
    {
      title: "Nutrition Goals",
      description: "Weight management, muscle gain, condition management"
    },
    {
      title: "Dietary Preferences",
      description: "Food preferences, restrictions, cultural factors"
    },
    {
      title: "Personalized Plan",
      description: "Your custom nutrition plan awaits expert approval"
    }
  ];

  const progress = ((currentStep + 1) / quizSteps.length) * 100;

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Smart Assessment Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our adaptive quiz learns about you just like a real nutritionist consultation, 
            gathering the right information to create your perfect plan.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="glass-card shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-gray-900">Nutrition Assessment Preview</CardTitle>
              <div className="mt-4">
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-gray-600 mt-2">
                  Step {currentStep + 1} of {quizSteps.length}
                </p>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-semibold text-gray-900 mb-4">
                  {quizSteps[currentStep].title}
                </h3>
                <p className="text-lg text-gray-600">
                  {quizSteps[currentStep].description}
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ArrowUp className="h-4 w-4" />
                  Previous
                </Button>
                <Button 
                  onClick={() => setCurrentStep(Math.min(quizSteps.length - 1, currentStep + 1))}
                  disabled={currentStep === quizSteps.length - 1}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 flex items-center gap-2"
                >
                  Next
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>

              {currentStep === quizSteps.length - 1 && (
                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl text-center">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Ready for Expert Review
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Your personalized plan will be reviewed by our certified nutritionists and doctors
                  </p>
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                    Start Your Real Assessment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuizPreview;
