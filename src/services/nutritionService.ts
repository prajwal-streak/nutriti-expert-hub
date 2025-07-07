
export interface NutritionQuery {
  question: string;
  userProfile?: {
    age: number;
    gender: string;
    weight: number;
    height: number;
    activityLevel: string;
    goals: string[];
    restrictions: string[];
  };
}

export interface NutritionResponse {
  answer: string;
  recommendations?: string[];
  calories?: number;
  macros?: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

class NutritionService {
  private apiEndpoint = 'https://api.nutritionix.com/v1_1';
  private backendAPI = '/api/nutrition'; // This would be your backend API

  async getPersonalizedAdvice(query: NutritionQuery): Promise<NutritionResponse> {
    // Simulate AI-powered nutrition advice
    const responses = this.generateNutritionResponse(query);
    
    // Add some delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return responses;
  }

  private generateNutritionResponse(query: NutritionQuery): NutritionResponse {
    const { question, userProfile } = query;
    const lowerQuestion = question.toLowerCase();

    // Weight loss advice
    if (lowerQuestion.includes('weight loss') || lowerQuestion.includes('lose weight')) {
      return {
        answer: `For weight loss, create a calorie deficit of 300-500 calories daily. Focus on lean proteins, fiber-rich vegetables, and whole grains. Avoid processed foods and sugary drinks.`,
        recommendations: [
          'Eat protein with every meal (20-30g)',
          'Fill half your plate with vegetables',
          'Choose whole grains over refined carbs',
          'Drink water before meals',
          'Get 7-9 hours of sleep'
        ],
        calories: userProfile ? this.calculateCaloriesForWeightLoss(userProfile) : 1500
      };
    }

    // Muscle gain advice
    if (lowerQuestion.includes('muscle') || lowerQuestion.includes('protein')) {
      return {
        answer: `For muscle gain, consume 1.6-2.2g protein per kg of body weight daily. Eat in a slight calorie surplus and include resistance training.`,
        recommendations: [
          'Eat protein every 3-4 hours',
          'Include post-workout protein within 30 minutes',
          'Choose complete proteins (eggs, chicken, fish)',
          'Don\'t skip carbs - they fuel your workouts',
          'Stay hydrated during training'
        ],
        calories: userProfile ? this.calculateCaloriesForMuscleGain(userProfile) : 2200
      };
    }

    // Hydration advice
    if (lowerQuestion.includes('water') || lowerQuestion.includes('hydration')) {
      return {
        answer: `Aim for 35ml of water per kg of body weight daily. Increase during exercise or hot weather. Monitor urine color - pale yellow indicates good hydration.`,
        recommendations: [
          'Start your day with a glass of water',
          'Drink water before, during, and after exercise',
          'Eat water-rich foods (cucumbers, watermelon)',
          'Set reminders to drink water regularly',
          'Limit caffeine and alcohol intake'
        ]
      };
    }

    // Energy/fatigue advice
    if (lowerQuestion.includes('energy') || lowerQuestion.includes('tired') || lowerQuestion.includes('fatigue')) {
      return {
        answer: `Boost energy with balanced meals every 3-4 hours, complex carbs, iron-rich foods, and adequate B vitamins. Avoid energy crashes from sugar spikes.`,
        recommendations: [
          'Eat regular, balanced meals',
          'Include iron-rich foods (spinach, lean meat)',
          'Get B vitamins from whole grains and eggs',
          'Limit sugar and refined carbs',
          'Consider a blood test to check for deficiencies'
        ]
      };
    }

    // General nutrition advice
    if (lowerQuestion.includes('healthy') || lowerQuestion.includes('nutrition')) {
      return {
        answer: `Follow a balanced diet with variety from all food groups. Focus on whole, minimally processed foods. Practice portion control and mindful eating.`,
        recommendations: [
          'Eat 5-9 servings of fruits and vegetables daily',
          'Choose whole grains over refined options',
          'Include healthy fats (nuts, olive oil, avocado)',
          'Limit processed and packaged foods',
          'Cook meals at home when possible'
        ]
      };
    }

    // Meal planning
    if (lowerQuestion.includes('meal plan') || lowerQuestion.includes('what to eat')) {
      return {
        answer: `Plan meals around lean proteins, colorful vegetables, and whole grains. Prep ingredients in advance and keep healthy snacks available.`,
        recommendations: [
          'Plan your meals for the week',
          'Batch cook grains and proteins',
          'Keep frozen vegetables as backup',
          'Prepare healthy snacks in advance',
          'Use a grocery list to stay on track'
        ]
      };
    }

    // Default response
    return {
      answer: `I understand you're asking about nutrition. For personalized advice, consider your individual needs, preferences, and health goals. Focus on whole foods and balanced nutrition.`,
      recommendations: [
        'Eat a variety of foods from all food groups',
        'Stay hydrated throughout the day',
        'Practice portion control',
        'Listen to your body\'s hunger cues',
        'Consult a registered dietitian for personalized guidance'
      ]
    };
  }

  private calculateCaloriesForWeightLoss(profile: any): number {
    const bmr = this.calculateBMR(profile);
    const tdee = bmr * this.getActivityMultiplier(profile.activityLevel);
    return Math.round(tdee - 400); // 400 calorie deficit
  }

  private calculateCaloriesForMuscleGain(profile: any): number {
    const bmr = this.calculateBMR(profile);
    const tdee = bmr * this.getActivityMultiplier(profile.activityLevel);
    return Math.round(tdee + 300); // 300 calorie surplus
  }

  private calculateBMR(profile: any): number {
    const { age, gender, weight, height } = profile;
    
    if (gender === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  }

  private getActivityMultiplier(activityLevel: string): number {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    return multipliers[activityLevel] || 1.2;
  }

  async getFoodNutritionInfo(foodName: string): Promise<any> {
    // Simulate nutrition database lookup
    const nutritionData = {
      'chicken breast': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
      'brown rice': { calories: 112, protein: 2.6, carbs: 23, fat: 0.9 },
      'broccoli': { calories: 25, protein: 3, carbs: 5, fat: 0.3 },
      'salmon': { calories: 208, protein: 22, carbs: 0, fat: 12 },
      'oats': { calories: 389, protein: 17, carbs: 66, fat: 7 },
      'eggs': { calories: 155, protein: 13, carbs: 1.1, fat: 11 }
    };

    return nutritionData[foodName.toLowerCase()] || null;
  }

  async generateMealPlan(userProfile: any): Promise<any> {
    const { dislikedFoods = [], allergies = [], dietType = 'balanced' } = userProfile;
    
    // Base meal database
    const meals = {
      breakfast: [
        { name: 'Greek Yogurt Parfait', ingredients: ['greek yogurt', 'berries', 'granola'], calories: 300 },
        { name: 'Scrambled Eggs with Toast', ingredients: ['eggs', 'whole grain bread', 'spinach'], calories: 320 },
        { name: 'Oatmeal with Fruit', ingredients: ['oats', 'banana', 'almonds'], calories: 280 },
        { name: 'Smoothie Bowl', ingredients: ['protein powder', 'berries', 'spinach'], calories: 250 }
      ],
      lunch: [
        { name: 'Grilled Chicken Salad', ingredients: ['chicken breast', 'mixed greens', 'tomatoes'], calories: 400 },
        { name: 'Quinoa Bowl', ingredients: ['quinoa', 'vegetables', 'chickpeas'], calories: 450 },
        { name: 'Salmon with Rice', ingredients: ['salmon', 'brown rice', 'broccoli'], calories: 500 },
        { name: 'Turkey Wrap', ingredients: ['turkey', 'whole wheat tortilla', 'vegetables'], calories: 380 }
      ],
      dinner: [
        { name: 'Baked Cod with Vegetables', ingredients: ['cod', 'sweet potato', 'asparagus'], calories: 420 },
        { name: 'Lean Beef Stir-Fry', ingredients: ['lean beef', 'mixed vegetables', 'brown rice'], calories: 480 },
        { name: 'Chicken Curry', ingredients: ['chicken', 'coconut milk', 'vegetables'], calories: 450 },
        { name: 'Vegetable Pasta', ingredients: ['whole wheat pasta', 'vegetables', 'olive oil'], calories: 400 }
      ]
    };

    // Filter meals based on restrictions
    const filterMeals = (mealList: any[]) => {
      return mealList.filter(meal => {
        // Check for disliked foods
        const hasDislikedFood = dislikedFoods.some((disliked: string) =>
          meal.ingredients.some((ingredient: string) =>
            ingredient.toLowerCase().includes(disliked.toLowerCase()) ||
            meal.name.toLowerCase().includes(disliked.toLowerCase())
          )
        );

        // Check for allergies
        const hasAllergen = allergies.some((allergy: string) =>
          meal.ingredients.some((ingredient: string) =>
            ingredient.toLowerCase().includes(allergy.toLowerCase())
          )
        );

        return !hasDislikedFood && !hasAllergen;
      });
    };

    return {
      breakfast: filterMeals(meals.breakfast).slice(0, 3),
      lunch: filterMeals(meals.lunch).slice(0, 3),
      dinner: filterMeals(meals.dinner).slice(0, 3)
    };
  }
}

export const nutritionService = new NutritionService();
