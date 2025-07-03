
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">NutriExpert</span>
            </div>
            <p className="text-gray-300 max-w-md mb-6">
              Your personal team of world-class researchers, doctors, and nutritionists 
              available 24/7 to guide your health journey.
            </p>
            <div className="text-sm text-gray-400">
              <p>HIPAA & GDPR Compliant</p>
              <p>Licensed Healthcare Professionals</p>
              <p>Evidence-Based Nutrition Science</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-green-400 transition-colors">Nutrition Assessment</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Personalized Plans</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Expert Consultations</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Progress Tracking</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-green-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 NutriExpert. All rights reserved. Licensed healthcare platform.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
