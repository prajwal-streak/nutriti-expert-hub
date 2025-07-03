
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Heart, User, Calendar } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: "Deep Research Expertise",
    description: "AI assistant trained on global nutrition research and verified by certified dietitians and doctors.",
    color: "from-green-400 to-green-600"
  },
  {
    icon: Heart,
    title: "Personalized Health Plans",
    description: "Custom nutrition plans based on your medical history, goals, and dietary preferences.",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: User,
    title: "Expert Authentication",
    description: "Every plan reviewed and approved by licensed nutritionists and healthcare professionals.",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: Calendar,
    title: "Instant Consultations",
    description: "Book secure video calls with approved experts for personalized guidance and support.",
    color: "from-orange-400 to-orange-600"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose NutriExpert?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge AI technology with real medical expertise to provide 
            you with the most comprehensive nutrition guidance available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card hover:shadow-xl transition-all duration-300 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-6 text-center">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-4`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
