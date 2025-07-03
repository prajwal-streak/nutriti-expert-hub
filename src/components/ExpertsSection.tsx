
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const experts = [
  {
    name: "Dr. Sarah Johnson",
    credentials: "MD, Registered Dietitian",
    specialization: "Metabolic Health & Weight Management",
    experience: "15+ years",
    image: "photo-1582562124811-c09040d0a901"
  },
  {
    name: "Dr. Michael Chen",
    credentials: "PhD Nutrition Science, RD",
    specialization: "Sports Nutrition & Performance",
    experience: "12+ years", 
    image: "photo-1506744038136-46273834b3fb"
  },
  {
    name: "Dr. Emily Rodriguez",
    credentials: "MD, Clinical Nutritionist",
    specialization: "Chronic Disease Management",
    experience: "18+ years",
    image: "photo-1501854140801-50d01698950b"
  }
];

const ExpertsSection = () => {
  return (
    <section id="experts" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every nutrition plan is reviewed and approved by our network of certified 
            doctors, dietitians, and nutrition specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {experts.map((expert, index) => (
            <Card key={index} className="glass-card hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
                  <img 
                    src={`https://images.unsplash.com/${expert.image}?auto=format&fit=crop&w=150&h=150`}
                    alt={expert.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{expert.name}</h3>
                <p className="text-sm text-blue-600 mb-2">{expert.credentials}</p>
                <p className="text-gray-600 mb-2">{expert.specialization}</p>
                <p className="text-sm text-gray-500">{expert.experience} experience</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="glass-card shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Expert Verification Process
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">AI generates personalized plan</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Expert reviews medical history</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Licensed professional approves plan</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Plan delivered with expert contact info</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-2xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Emergency Consultations Available
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Connect with our experts instantly for urgent nutrition concerns
                    </p>
                    <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                      Book Emergency Call
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection;
