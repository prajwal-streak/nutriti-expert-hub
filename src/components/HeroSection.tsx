import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const HeroSection = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    if (user) {
      navigate('/assessment');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleBookConsultation = () => {
    if (user) {
      navigate('/consultation');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-20 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>

        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your Personal
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"> Nutrition Team</span>
              <br />Available 24/7
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Skip the waiting rooms. Get science-backed, doctor-approved nutrition plans 
              tailored specifically for your health goals and medical conditions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg px-8 py-4"
                onClick={handleStartAssessment}
              >
                {user ? 'Continue Your Assessment' : 'Start Your Free Assessment'}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4"
                onClick={handleBookConsultation}
              >
                Book Expert Consultation
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <Check className="h-5 w-5 text-green-500" />
                <span>Doctor Approved Plans</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <Check className="h-5 w-5 text-green-500" />
                <span>Instant Video Consultations</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <Check className="h-5 w-5 text-green-500" />
                <span>HIPAA Compliant</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </section>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default HeroSection;
