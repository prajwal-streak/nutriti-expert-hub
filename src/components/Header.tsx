
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleStartAssessment = () => {
    if (user) {
      navigate('/assessment');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">NutriExpert</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">How It Works</a>
            <a href="#experts" className="text-gray-600 hover:text-primary transition-colors">Our Experts</a>
            <button 
              onClick={() => navigate('/ai-chat')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              AI Assistant
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" onClick={handleAuthClick}>
              <User className="h-4 w-4 mr-2" />
              {user ? 'Dashboard' : 'Sign In'}
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              onClick={handleStartAssessment}
            >
              {user ? 'Continue Assessment' : 'Start Free Assessment'}
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 p-4">
            <nav className="flex flex-col gap-4">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors py-2">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors py-2">How It Works</a>
              <a href="#experts" className="text-gray-600 hover:text-primary transition-colors py-2">Our Experts</a>
              <button 
                onClick={() => navigate('/ai-chat')} 
                className="text-gray-600 hover:text-primary transition-colors py-2 text-left"
              >
                AI Assistant
              </button>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="outline" onClick={handleAuthClick}>
                  <User className="h-4 w-4 mr-2" />
                  {user ? 'Dashboard' : 'Sign In'}
                </Button>
                <Button 
                  className="bg-gradient-to-r from-green-500 to-blue-500"
                  onClick={handleStartAssessment}
                >
                  {user ? 'Continue Assessment' : 'Start Free Assessment'}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;
