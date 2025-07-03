
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Users, ChefHat, ShoppingCart, RefreshCw, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NutritionPlan: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('monday');

  const weekPlan = {
    monday: {
      breakfast: {
        name: "Protein Oatmeal Bowl",
        calories: 350,
        protein: 25,
        carbs: 45,
        fat: 8,
        time: "15 min",
        ingredients: ["Oats", "Protein powder", "Banana", "Almonds", "Cinnamon"],
        instructions: "1. Cook oats with water\n2. Mix in protein powder\n3. Top with sliced banana and almonds"
      },
      lunch: {
        name: "Quinoa Buddha Bowl",
        calories: 480,
        protein: 22,
        carbs: 65,
        fat: 15,
        time: "20 min",
        ingredients: ["Quinoa", "Chickpeas", "Avocado", "Spinach", "Tahini"],
        instructions: "1. Cook quinoa\n2. Roast chickpeas\n3. Assemble bowl with greens\n4. Drizzle with tahini dressing"
      },
      dinner: {
        name: "Grilled Salmon with Vegetables",
        calories: 420,
        protein: 35,
        carbs: 25,
        fat: 20,
        time: "25 min",
        ingredients: ["Salmon fillet", "Broccoli", "Sweet potato", "Olive oil", "Herbs"],
        instructions: "1. Season and grill salmon\n2. Steam broccoli\n3. Roast sweet potato\n4. Serve with herbs"
      }
    },
    tuesday: {
      breakfast: {
        name: "Greek Yogurt Parfait",
        calories: 320,
        protein: 20,
        carbs: 35,
        fat: 12,
        time: "10 min",
        ingredients: ["Greek yogurt", "Berries", "Granola", "Honey", "Chia seeds"],
        instructions: "1. Layer yogurt in bowl\n2. Add berries and granola\n3. Drizzle with honey\n4. Sprinkle chia seeds"
      },
      lunch: {
        name: "Lentil Soup with Bread",
        calories: 450,
        protein: 18,
        carbs: 70,
        fat: 10,
        time: "30 min",
        ingredients: ["Red lentils", "Vegetables", "Vegetable broth", "Whole grain bread", "Herbs"],
        instructions: "1. Sauté vegetables\n2. Add lentils and broth\n3. Simmer until tender\n4. Serve with bread"
      },
      dinner: {
        name: "Chicken Stir-fry",
        calories: 380,
        protein: 30,
        carbs: 35,
        fat: 15,
        time: "20 min",
        ingredients: ["Chicken breast", "Mixed vegetables", "Brown rice", "Soy sauce", "Ginger"],
        instructions: "1. Cook chicken pieces\n2. Stir-fry vegetables\n3. Combine with sauce\n4. Serve over rice"
      }
    }
  };

  const currentPlan = weekPlan[selectedDay] || weekPlan.monday;
  const dailyTotals = {
    calories: currentPlan.breakfast.calories + currentPlan.lunch.calories + currentPlan.dinner.calories,
    protein: currentPlan.breakfast.protein + currentPlan.lunch.protein + currentPlan.dinner.protein,
    carbs: currentPlan.breakfast.carbs + currentPlan.lunch.carbs + currentPlan.dinner.carbs,
    fat: currentPlan.breakfast.fat + currentPlan.lunch.fat + currentPlan.dinner.fat
  };

  const MealCard = ({ meal, mealType }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{meal.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{meal.time}</span>
            </div>
          </div>
          <Button size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-1" />
            Swap
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="text-center">
            <div className="font-semibold text-sm">{meal.calories}</div>
            <div className="text-xs text-gray-600">Calories</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-sm">{meal.protein}g</div>
            <div className="text-xs text-gray-600">Protein</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-sm">{meal.carbs}g</div>
            <div className="text-xs text-gray-600">Carbs</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-sm">{meal.fat}g</div>
            <div className="text-xs text-gray-600">Fat</div>
          </div>
        </div>
        
        <div className="mb-3">
          <h4 className="font-medium text-sm mb-2">Ingredients:</h4>
          <div className="flex flex-wrap gap-1">
            {meal.ingredients.map((ingredient, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-sm mb-2">Instructions:</h4>
          <p className="text-sm text-gray-600 whitespace-pre-line">
            {meal.instructions}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <ChefHat className="h-4 w-4 mr-1" />
            Cook
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Nutrition Plan</h1>
            <p className="text-gray-600">Personalized meal plan approved by Dr. Sarah Johnson, RD</p>
          </div>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>

        {/* Expert Approval Badge */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Heart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">Expert Approved Plan</h3>
                  <p className="text-sm text-green-700">
                    Reviewed and approved by Dr. Sarah Johnson, RD - License #12345
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Contact Expert
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Daily Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Daily Nutrition Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{dailyTotals.calories}</div>
                <div className="text-sm text-blue-800">Total Calories</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{dailyTotals.protein}g</div>
                <div className="text-sm text-green-800">Protein</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{dailyTotals.carbs}g</div>
                <div className="text-sm text-orange-800">Carbs</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{dailyTotals.fat}g</div>
                <div className="text-sm text-purple-800">Fat</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={selectedDay} onValueChange={setSelectedDay}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="monday">Mon</TabsTrigger>
            <TabsTrigger value="tuesday">Tue</TabsTrigger>
            <TabsTrigger value="wednesday">Wed</TabsTrigger>
            <TabsTrigger value="thursday">Thu</TabsTrigger>
            <TabsTrigger value="friday">Fri</TabsTrigger>
            <TabsTrigger value="saturday">Sat</TabsTrigger>
            <TabsTrigger value="sunday">Sun</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedDay} className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Breakfast</h3>
                <MealCard meal={currentPlan.breakfast} mealType="breakfast" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Lunch</h3>
                <MealCard meal={currentPlan.lunch} mealType="lunch" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Dinner</h3>
                <MealCard meal={currentPlan.dinner} mealType="dinner" />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Shopping List */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Weekly Shopping List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium mb-2">Proteins</h4>
                <ul className="text-sm space-y-1">
                  <li>• Salmon fillets (2 lbs)</li>
                  <li>• Chicken breast (1.5 lbs)</li>
                  <li>• Greek yogurt (32 oz)</li>
                  <li>• Protein powder</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Vegetables & Fruits</h4>
                <ul className="text-sm space-y-1">
                  <li>• Broccoli (2 heads)</li>
                  <li>• Spinach (1 bag)</li>
                  <li>• Mixed berries</li>
                  <li>• Bananas (6)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Grains & Others</h4>
                <ul className="text-sm space-y-1">
                  <li>• Quinoa (1 lb)</li>
                  <li>• Oats (1 container)</li>
                  <li>• Brown rice</li>
                  <li>• Almonds</li>
                </ul>
              </div>
            </div>
            <Button className="mt-4 w-full">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Export Shopping List
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NutritionPlan;
