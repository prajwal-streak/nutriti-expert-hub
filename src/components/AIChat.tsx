
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { nutritionService } from '@/services/nutritionService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  recommendations?: string[];
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI nutrition expert. I can help with meal planning, weight management, nutrition advice, and answer questions about healthy eating. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getUserProfile = () => {
    const savedAssessment = localStorage.getItem(`assessment_${user?.id}`);
    if (savedAssessment) {
      const assessment = JSON.parse(savedAssessment);
      return {
        age: assessment.personalInfo.age,
        gender: assessment.personalInfo.gender,
        weight: assessment.personalInfo.weight,
        height: assessment.personalInfo.height,
        activityLevel: assessment.personalInfo.activityLevel,
        goals: [assessment.goals.primaryGoal],
        restrictions: [
          ...assessment.dietaryPreferences.dislikedFoods,
          ...assessment.healthInfo.allergies
        ]
      };
    }
    return null;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const userProfile = getUserProfile();
      const response = await nutritionService.getPersonalizedAdvice({
        question: inputText,
        userProfile: userProfile
      });
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.answer,
        sender: 'bot',
        timestamp: new Date(),
        recommendations: response.recommendations
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Nutrition service error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble right now. Here's some general advice: Focus on whole foods, stay hydrated, and eat balanced meals with protein, vegetables, and whole grains.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!user) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <Bot className="h-16 w-16 mx-auto mb-4 text-green-500" />
          <h3 className="text-xl font-semibold mb-2">AI Nutrition Expert</h3>
          <p className="text-gray-600 mb-4">
            Please sign in to access personalized nutrition guidance.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-green-500" />
          AI Nutrition Expert - Personalized Advice
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickQuestion("What should I eat for weight loss?")}
          >
            Weight Loss Tips
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickQuestion("How much protein do I need?")}
          >
            Protein Needs
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickQuestion("Give me a healthy meal plan")}
          >
            Meal Planning
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickQuestion("How much water should I drink?")}
          >
            Hydration Guide
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  {message.sender === 'bot' && <Sparkles className="h-5 w-5 mt-1 text-green-500" />}
                  {message.sender === 'user' && <User className="h-5 w-5 mt-1" />}
                  <div className="flex-1">
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    
                    {message.recommendations && (
                      <div className="mt-3 p-3 bg-white bg-opacity-20 rounded">
                        <p className="font-medium text-sm mb-2">💡 Quick Tips:</p>
                        <ul className="text-sm space-y-1">
                          {message.recommendations.map((rec, index) => (
                            <li key={index}>• {rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <span className="text-xs opacity-70 mt-2 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-green-500" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about nutrition, meals, or health advice..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputText.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Powered by intelligent nutrition algorithms - Get personalized advice based on your profile
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
