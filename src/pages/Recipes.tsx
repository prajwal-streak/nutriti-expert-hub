
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Heart, Clock, Users, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Recipes: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const recipes = [
    {
      id: 1,
      name: "Mediterranean Quinoa Bowl",
      category: "vegetarian",
      calories: 420,
      time: "25 min",
      servings: 2,
      difficulty: "Easy",
      image: "/placeholder.svg",
      tags: ["High Protein", "Gluten Free", "Heart Healthy"],
      ingredients: [
        "1 cup quinoa",
        "1 cucumber, diced",
        "1 cup cherry tomatoes",
        "1/2 red onion, sliced",
        "1/4 cup olives",
        "2 tbsp olive oil",
        "2 tbsp lemon juice",
        "1/4 cup feta cheese"
      ],
      instructions: [
        "Cook quinoa according to package instructions",
        "Dice cucumber and halve cherry tomatoes",
        "Combine vegetables in a large bowl",
        "Whisk olive oil and lemon juice for dressing",
        "Add cooked quinoa and toss with dressing",
        "Top with feta cheese and serve"
      ],
      nutrition: {
        protein: 15,
        carbs: 58,
        fat: 12,
        fiber: 6
      }
    },
    {
      id: 2,
      name: "Grilled Salmon with Asparagus",
      category: "keto",
      calories: 380,
      time: "20 min",
      servings: 1,
      difficulty: "Medium",
      image: "/placeholder.svg",
      tags: ["Keto", "High Protein", "Omega-3"],
      ingredients: [
        "6 oz salmon fillet",
        "1 bunch asparagus",
        "2 tbsp olive oil",
        "1 lemon, sliced",
        "2 cloves garlic, minced",
        "Salt and pepper to taste",
        "Fresh dill"
      ],
      instructions: [
        "Preheat grill to medium-high heat",
        "Season salmon with salt, pepper, and garlic",
        "Trim asparagus ends and drizzle with olive oil",
        "Grill salmon for 4-5 minutes per side",
        "Grill asparagus for 3-4 minutes",
        "Serve with lemon slices and fresh dill"
      ],
      nutrition: {
        protein: 35,
        carbs: 8,
        fat: 22,
        fiber: 4
      }
    },
    {
      id: 3,
      name: "Chickpea Curry",
      category: "vegan",
      calories: 320,
      time: "30 min",
      servings: 4,
      difficulty: "Easy",
      image: "/placeholder.svg",
      tags: ["Vegan", "High Fiber", "Plant-Based"],
      ingredients: [
        "2 cans chickpeas, drained",
        "1 can coconut milk",
        "1 onion, diced",
        "3 cloves garlic, minced",
        "1 tbsp curry powder",
        "1 tsp turmeric",
        "1 can diced tomatoes",
        "2 cups spinach"
      ],
      instructions: [
        "Sauté onion and garlic until fragrant",
        "Add curry powder and turmeric, cook 1 minute",
        "Add tomatoes and coconut milk",
        "Add chickpeas and simmer 15 minutes",
        "Stir in spinach until wilted",
        "Season with salt and pepper"
      ],
      nutrition: {
        protein: 12,
        carbs: 45,
        fat: 8,
        fiber: 10
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Recipes' },
    { id: 'vegetarian', name: 'Vegetarian' },
    { id: 'vegan', name: 'Vegan' },
    { id: 'keto', name: 'Keto' },
    { id: 'paleo', name: 'Paleo' },
    { id: 'gluten-free', name: 'Gluten Free' }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const RecipeCard = ({ recipe }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gray-200 rounded-t-lg relative overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <Button 
          size="sm" 
          variant="ghost" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{recipe.name}</CardTitle>
          <Badge variant="secondary">{recipe.difficulty}</Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {recipe.time}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {recipe.servings} servings
          </div>
          <div className="font-medium">{recipe.calories} cal</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-4">
          {recipe.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-4 text-center">
          <div>
            <div className="font-semibold text-sm">{recipe.nutrition.protein}g</div>
            <div className="text-xs text-gray-600">Protein</div>
          </div>
          <div>
            <div className="font-semibold text-sm">{recipe.nutrition.carbs}g</div>
            <div className="text-xs text-gray-600">Carbs</div>
          </div>
          <div>
            <div className="font-semibold text-sm">{recipe.nutrition.fat}g</div>
            <div className="text-xs text-gray-600">Fat</div>
          </div>
          <div>
            <div className="font-semibold text-sm">{recipe.nutrition.fiber}g</div>
            <div className="text-xs text-gray-600">Fiber</div>
          </div>
        </div>
        
        <Button className="w-full">
          <ChefHat className="h-4 w-4 mr-2" />
          View Recipe
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Recipe Collection</h1>
            <p className="text-gray-600">Discover healthy, delicious recipes tailored to your goals</p>
          </div>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search recipes, ingredients, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
