
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface UserProfile {
  name: string;
  age?: number;
  weight?: number;
  height?: number;
  activityLevel?: string;
  dietaryRestrictions?: string[];
  healthGoals?: string[];
  medicalConditions?: string[];
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your personalized AI nutrition expert. I have access to your profile and can provide specific recommendations based on your health goals, dietary preferences, and current nutrition plan. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Simulated user profile data (in real app, this would come from database)
  const userProfile: UserProfile = {
    name: user?.name || 'User',
    age: 28,
    weight: 70,
    height: 175,
    activityLevel: 'Moderate',
    dietaryRestrictions: ['Vegetarian'],
    healthGoals: ['Weight Loss', 'Muscle Gain'],
    medicalConditions: []
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generatePersonalizedResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Personalized responses based on user profile
    if (lowerMessage.includes('weight loss') || lowerMessage.includes('lose weight')) {
      return `Based on your profile (${userProfile.age} years, ${userProfile.weight}kg, ${userProfile.height}cm, ${userProfile.activityLevel} activity), I recommend a caloric deficit of 300-500 calories daily. Since you're vegetarian, focus on high-protein plant sources like lentils, quinoa, and tofu. Your current meal plan already includes protein-rich oatmeal and quinoa bowls - perfect for your goals! I suggest increasing your protein intake to 1.6g per kg of body weight (112g daily) and adding more fiber-rich vegetables to keep you satisfied.`;
    }
    
    if (lowerMessage.includes('muscle gain') || lowerMessage.includes('build muscle')) {
      return `Perfect! For muscle gain with your vegetarian diet, you'll need approximately 112-140g protein daily (1.6-2g per kg). Your current nutrition plan includes Greek yogurt and quinoa - excellent choices! I recommend adding: hemp seeds to your oatmeal (10g protein), chickpea pasta for lunch (14g protein per serving), and a plant-based protein smoothie post-workout. Since you're moderately active, timing your protein intake within 2 hours after exercise will optimize muscle synthesis.`;
    }
    
    if (lowerMessage.includes('meal plan') || lowerMessage.includes('today') || lowerMessage.includes('eat')) {
      return `Looking at your current meal plan for today: Breakfast (Protein Oatmeal - 350 cal, 25g protein), Lunch (Quinoa Buddha Bowl - 480 cal, 22g protein), Dinner (Grilled Salmon with Vegetables - 420 cal, 35g protein). Total: 1,250 calories, 82g protein. For your weight loss goal, this is good, but you might need 100-200 more calories. I suggest adding a healthy snack like Greek yogurt with berries (150 cal, 15g protein) between lunch and dinner.`;
    }
    
    if (lowerMessage.includes('substitute') || lowerMessage.includes('replace') || lowerMessage.includes('alternative')) {
      return `Since you're vegetarian, here are some great substitutions for your meal plan: Replace salmon with pan-seared tofu or tempeh (similar protein content), swap Greek yogurt with coconut yogurt + protein powder if you prefer dairy-free options, or substitute quinoa with bulgur wheat or brown rice for variety. Would you like me to adjust your meal plan with any of these alternatives?`;
    }
    
    if (lowerMessage.includes('calories') || lowerMessage.includes('nutrition')) {
      return `Based on your stats (${userProfile.weight}kg, ${userProfile.height}cm, ${userProfile.activityLevel} activity), your daily caloric needs are approximately 1,800-2,000 calories for maintenance. For weight loss, your current plan at ~1,250 calories creates a healthy deficit. Your macro targets should be: Protein: 25-30% (112-140g), Carbs: 40-45% (180-225g), Fat: 25-30% (50-67g). Your current plan is protein-rich but might need slight adjustments in healthy fats.`;
    }
    
    if (lowerMessage.includes('supplement') || lowerMessage.includes('vitamins')) {
      return `For your vegetarian diet and fitness goals, consider these supplements: Vitamin B12 (essential for vegetarians), Vitamin D3 (especially if limited sun exposure), Iron (with vitamin C for better absorption), and Omega-3 from algae sources. A plant-based protein powder can help meet your muscle-building goals. Always consult with your healthcare provider before starting new supplements.`;
    }
    
    return `Great question! As your personalized nutrition AI, I'm here to help with specific advice tailored to your vegetarian lifestyle and weight loss goals. I can provide detailed meal modifications, recipe suggestions, nutrient timing advice, or help troubleshoot any dietary concerns. What specific aspect of your nutrition would you like to optimize today?`;
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

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generatePersonalizedResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <Bot className="h-16 w-16 mx-auto mb-4 text-green-500" />
          <h3 className="text-xl font-semibold mb-2">AI Nutrition Assistant</h3>
          <p className="text-gray-600 mb-4">
            Please sign in to access personalized nutrition guidance based on your profile and goals.
          </p>
          <Button className="bg-gradient-to-r from-green-500 to-blue-500">
            Sign In to Chat
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-green-500" />
          AI Nutrition Expert - Personalized for {userProfile.name}
        </CardTitle>
        <div className="text-sm text-gray-600">
          Profile: {userProfile.age}y, {userProfile.weight}kg, {userProfile.activityLevel} • Goals: {userProfile.healthGoals.join(', ')}
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
              placeholder="Ask me about your nutrition plan, meal modifications, or health goals..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputText.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Pro tip: Ask specific questions like "Can I substitute salmon?" or "How many calories should I eat?"
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
