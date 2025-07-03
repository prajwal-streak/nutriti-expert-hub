
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI nutrition expert. I can help you with personalized meal plans, answer nutrition questions, and guide you through your health journey. What would you like to know?",
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

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('weight loss') || lowerMessage.includes('lose weight')) {
      return "For healthy weight loss, I recommend focusing on a balanced diet with a moderate caloric deficit. Key principles include: eating plenty of vegetables, lean proteins, and whole grains while staying hydrated. Would you like me to create a personalized meal plan based on your specific goals and dietary preferences?";
    }
    
    if (lowerMessage.includes('muscle gain') || lowerMessage.includes('build muscle')) {
      return "Building muscle requires adequate protein intake (0.8-1g per lb of body weight) combined with resistance training. Focus on foods like chicken, fish, eggs, legumes, and dairy. Timing your protein intake throughout the day is also important. Would you like specific meal suggestions?";
    }
    
    if (lowerMessage.includes('diabetes') || lowerMessage.includes('blood sugar')) {
      return "For diabetes management, controlling carbohydrate intake and meal timing is crucial. Focus on complex carbs, fiber-rich foods, and consistent meal schedules. However, I strongly recommend consulting with your healthcare provider for personalized medical advice. Would you like general healthy eating tips?";
    }
    
    if (lowerMessage.includes('meal plan') || lowerMessage.includes('diet plan')) {
      return "I'd be happy to help create a personalized meal plan! To give you the best recommendations, I'll need to know about your goals, dietary restrictions, activity level, and food preferences. Have you completed our comprehensive nutrition assessment quiz yet?";
    }
    
    return "That's a great question! Based on current nutrition science, I can provide evidence-based guidance. For the most accurate and personalized advice, I recommend completing our full assessment or booking a consultation with one of our certified nutritionists. What specific aspect of nutrition would you like to explore?";
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
        text: generateAIResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
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
            Please sign in to access our AI-powered nutrition expert that can provide personalized guidance.
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
          <Bot className="h-6 w-6 text-green-500" />
          AI Nutrition Expert
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === 'bot' && <Bot className="h-4 w-4 mt-1 text-green-500" />}
                  {message.sender === 'user' && <User className="h-4 w-4 mt-1" />}
                  <div>
                    <p>{message.text}</p>
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-green-500" />
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
              placeholder="Ask me anything about nutrition..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputText.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
