interface MealPlanRequest {
  userProfile: {
    age: number;
    gender: string;
    weight: number;
    height: number;
    activityLevel: string;
    goal: string;
    dietaryRestrictions: string[];
    foodDislikes: string[];
  };
  preferences: {
    mealsPerDay: number;
    cuisine: string[];
    cookingTime: string;
  };
}

interface MealPlan {
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: Meal[];
  recommendations: string[];
}

interface Meal {
  name: string;
  time: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  ingredients: string[];
  instructions: string[];
  prepTime: number;
}

class OpenAIService {
  private apiKey: string | null = null;

  constructor() {
    // For now, we'll use a temporary input field approach
    // Later this will be handled via Supabase Edge Functions
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async generateMealPlan(request: MealPlanRequest): Promise<MealPlan> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not set');
    }

    const prompt = this.createMealPlanPrompt(request);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a professional nutritionist and meal planning expert. Create detailed, practical meal plans with accurate nutritional information. Respond only with valid JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const mealPlanText = data.choices[0].message.content;
      
      // Parse the JSON response
      const mealPlan = JSON.parse(mealPlanText);
      return mealPlan;
    } catch (error) {
      console.error('Error generating meal plan:', error);
      throw new Error('Failed to generate meal plan. Please try again.');
    }
  }

  async getNutritionAdvice(query: string, userContext?: any): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not set');
    }

    const contextPrompt = userContext 
      ? `User context: ${JSON.stringify(userContext)}. `
      : '';

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a professional nutritionist and fitness expert. Provide helpful, accurate, and personalized nutrition advice. Keep responses concise but informative.'
            },
            {
              role: 'user',
              content: `${contextPrompt}Question: ${query}`
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error getting nutrition advice:', error);
      throw new Error('Failed to get nutrition advice. Please try again.');
    }
  }

  private createMealPlanPrompt(request: MealPlanRequest): string {
    const { userProfile, preferences } = request;
    
    return `Create a personalized meal plan for a ${userProfile.age}-year-old ${userProfile.gender} 
    weighing ${userProfile.weight}kg, height ${userProfile.height}cm, with ${userProfile.activityLevel} activity level.
    
    Goal: ${userProfile.goal}
    Dietary restrictions: ${userProfile.dietaryRestrictions.join(', ') || 'None'}
    Food dislikes: ${userProfile.foodDislikes.join(', ') || 'None'}
    Preferred cuisines: ${preferences.cuisine.join(', ') || 'Any'}
    Cooking time preference: ${preferences.cookingTime}
    Meals per day: ${preferences.mealsPerDay}
    
    Provide a complete meal plan with:
    1. Total daily calories and macronutrient breakdown
    2. ${preferences.mealsPerDay} meals with detailed recipes
    3. Accurate nutritional information for each meal
    4. Practical cooking instructions
    5. Personalized recommendations
    
    Return ONLY valid JSON in this exact format:
    {
      "totalCalories": number,
      "macros": {
        "protein": number,
        "carbs": number,
        "fat": number
      },
      "meals": [
        {
          "name": "string",
          "time": "string",
          "calories": number,
          "macros": {
            "protein": number,
            "carbs": number,
            "fat": number
          },
          "ingredients": ["string"],
          "instructions": ["string"],
          "prepTime": number
        }
      ],
      "recommendations": ["string"]
    }`;
  }
}

export const openaiService = new OpenAIService();
export type { MealPlan, Meal, MealPlanRequest };