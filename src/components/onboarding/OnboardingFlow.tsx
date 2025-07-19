import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import GoalSelection from './GoalSelection';
import { useNavigate } from 'react-router-dom';

export interface OnboardingData {
  goal: string;
  intensity: string;
}

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'goals'>('welcome');
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});
  const navigate = useNavigate();

  const handleWelcomeNext = () => {
    setCurrentStep('goals');
  };

  const handleGoalsNext = (data: { goal: string; intensity: string }) => {
    const completeData = { ...onboardingData, ...data };
    setOnboardingData(completeData);
    
    // Save onboarding data to localStorage
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('user_goals', JSON.stringify(completeData));
    
    // Navigate to assessment
    navigate('/assessment');
  };

  const handleGoalsBack = () => {
    setCurrentStep('welcome');
  };

  return (
    <>
      {currentStep === 'welcome' && (
        <WelcomeScreen onNext={handleWelcomeNext} />
      )}
      {currentStep === 'goals' && (
        <GoalSelection onNext={handleGoalsNext} onBack={handleGoalsBack} />
      )}
    </>
  );
};

export default OnboardingFlow;