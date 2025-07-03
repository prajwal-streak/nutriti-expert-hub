
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import QuizPreview from '@/components/QuizPreview';
import ExpertsSection from '@/components/ExpertsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <QuizPreview />
      <ExpertsSection />
      <Footer />
    </div>
  );
};

export default Index;
