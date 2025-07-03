
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">NutriExpert</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">How It Works</a>
          <a href="#experts" className="text-gray-600 hover:text-primary transition-colors">Our Experts</a>
          <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
            Start Free Assessment
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
