
import React from 'react';
import AIChat from '@/components/AIChat';

const AIChatPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Nutrition Assistant</h1>
          <p className="text-xl text-gray-600">
            Get instant, personalized nutrition advice from our AI expert
          </p>
        </div>
        <AIChat />
      </div>
    </div>
  );
};

export default AIChatPage;
