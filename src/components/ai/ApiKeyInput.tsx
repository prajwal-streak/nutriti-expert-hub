import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Key, Shield } from 'lucide-react';
import { openaiService } from '@/services/openaiService';

interface ApiKeyInputProps {
  onApiKeySet: () => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsLoading(true);
    try {
      // Set the API key in the service
      openaiService.setApiKey(apiKey.trim());
      
      // Store in localStorage for this session
      localStorage.setItem('openai_api_key', apiKey.trim());
      
      onApiKeySet();
    } catch (error) {
      console.error('Error setting API key:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="premium-card">
        <CardHeader className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
            <Key className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-xl">OpenAI API Key Required</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Your API key is stored locally and never sent to our servers. 
              This is temporary - we recommend connecting to Supabase for secure key management.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="apiKey">OpenAI API Key</Label>
              <div className="relative mt-1">
                <Input
                  id="apiKey"
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full premium-gradient text-white"
              disabled={!apiKey.trim() || isLoading}
            >
              {isLoading ? 'Setting up...' : 'Continue with AI Features'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Don't have an API key?</p>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Get one from OpenAI →
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeyInput;