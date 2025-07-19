import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Sparkles, Target, Brain } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Hero Section */}
        <div className="premium-card p-8 md:p-12 mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <div className="w-20 h-20 mx-auto mb-6 premium-gradient rounded-full flex items-center justify-center animate-glow">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent mb-4">
              Nutriti Expert Hub
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              AI-Powered Fitness & Nutrition Platform for Professionals
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Personalized meal plans, smart activity tracking, and AI-driven insights 
              tailored for busy executives and fitness enthusiasts.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            <Card className="p-6 hover-lift">
              <Target className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Personalized Goals</h3>
              <p className="text-sm text-muted-foreground">
                Custom fitness and nutrition plans based on your lifestyle and preferences
              </p>
            </Card>
            <Card className="p-6 hover-lift">
              <Brain className="w-8 h-8 text-secondary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-sm text-muted-foreground">
                Smart recommendations and real-time feedback to optimize your health journey
              </p>
            </Card>
            <Card className="p-6 hover-lift">
              <Sparkles className="w-8 h-8 text-accent mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Executive Ready</h3>
              <p className="text-sm text-muted-foreground">
                Designed for busy professionals who demand excellence in their health routine
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button 
              onClick={onNext} 
              size="lg" 
              className="premium-gradient text-white px-8 py-4 text-lg font-semibold hover-glow group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Trusted by executives from top companies worldwide
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="w-12 h-8 bg-gradient-to-r from-primary to-secondary rounded opacity-50"></div>
            <div className="w-12 h-8 bg-gradient-to-r from-secondary to-accent rounded opacity-50"></div>
            <div className="w-12 h-8 bg-gradient-to-r from-accent to-primary rounded opacity-50"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;