
interface MealPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snack?: Meal;
}

interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  ingredients: string[];
  instructions: string;
  category: string;
}

const breakfastOptions: Meal[] = [
  {
    name: "Protein Oatmeal Bowl",
    calories: 350,
    protein: 25,
    carbs: 45,
    fat: 8,
    time: "15 min",
    ingredients: ["Rolled oats", "Protein powder", "Banana", "Almonds", "Cinnamon"],
    instructions: "1. Cook oats with water\n2. Mix in protein powder\n3. Top with sliced banana and almonds\n4. Sprinkle cinnamon",
    category: "protein-rich"
  },
  {
    name: "Veggie Scrambled Eggs",
    calories: 320,
    protein: 24,
    carbs: 12,
    fat: 20,
    time: "12 min",
    ingredients: ["Eggs", "Spinach", "Tomatoes", "Bell peppers", "Olive oil"],
    instructions: "1. Heat oil in pan\n2. Sauté vegetables\n3. Add beaten eggs\n4. Scramble until cooked",
    category: "low-carb"
  },
  {
    name: "Greek Yogurt Parfait",
    calories: 280,
    protein: 20,
    carbs: 35,
    fat: 8,
    time: "5 min",
    ingredients: ["Greek yogurt", "Mixed berries", "Granola", "Honey", "Chia seeds"],
    instructions: "1. Layer yogurt in bowl\n2. Add berries and granola\n3. Drizzle honey\n4. Top with chia seeds",
    category: "quick"
  },
  {
    name: "Avocado Toast Supreme",
    calories: 380,
    protein: 18,
    carbs: 42,
    fat: 18,
    time: "8 min",
    ingredients: ["Whole grain bread", "Avocado", "Eggs", "Feta cheese", "Cherry tomatoes"],
    instructions: "1. Toast bread\n2. Mash avocado with seasoning\n3. Top with poached egg\n4. Add feta and tomatoes",
    category: "trendy"
  },
  {
    name: "Protein Smoothie Bowl",
    calories: 340,
    protein: 28,
    carbs: 38,
    fat: 12,
    time: "10 min",
    ingredients: ["Protein powder", "Frozen berries", "Banana", "Coconut flakes", "Nuts"],
    instructions: "1. Blend protein, berries, banana\n2. Pour into bowl\n3. Top with coconut flakes\n4. Add mixed nuts",
    category: "fitness"
  }
];

const lunchOptions: Meal[] = [
  {
    name: "Quinoa Buddha Bowl",
    calories: 480,
    protein: 22,
    carbs: 65,
    fat: 15,
    time: "20 min",
    ingredients: ["Quinoa", "Chickpeas", "Avocado", "Spinach", "Tahini dressing"],
    instructions: "1. Cook quinoa\n2. Roast chickpeas with spices\n3. Assemble bowl with greens\n4. Drizzle tahini dressing",
    category: "vegetarian"
  },
  {
    name: "Grilled Chicken Salad",
    calories: 420,
    protein: 35,
    carbs: 25,
    fat: 20,
    time: "15 min",
    ingredients: ["Chicken breast", "Mixed greens", "Cucumber", "Feta", "Olive oil vinaigrette"],
    instructions: "1. Season and grill chicken\n2. Prepare salad base\n3. Slice chicken on top\n4. Add dressing",
    category: "protein-focused"
  },
  {
    name: "Sweet Potato & Black Bean Bowl",
    calories: 450,
    protein: 18,
    carbs: 72,
    fat: 12,
    time: "25 min",
    ingredients: ["Sweet potato", "Black beans", "Corn", "Cilantro", "Lime dressing"],
    instructions: "1. Roast cubed sweet potato\n2. Heat black beans\n3. Combine with corn\n4. Top with cilantro and lime",
    category: "plant-based"
  },
  {
    name: "Mediterranean Wrap",
    calories: 390,
    protein: 24,
    carbs: 45,
    fat: 16,
    time: "10 min",
    ingredients: ["Whole wheat tortilla", "Hummus", "Grilled vegetables", "Feta", "Olives"],
    instructions: "1. Spread hummus on tortilla\n2. Add grilled vegetables\n3. Sprinkle feta and olives\n4. Roll tightly",
    category: "mediterranean"
  },
  {
    name: "Asian Lettuce Wraps",
    calories: 320,
    protein: 28,
    carbs: 18,
    fat: 14,
    time: "18 min",
    ingredients: ["Ground turkey", "Lettuce cups", "Water chestnuts", "Ginger", "Soy sauce"],
    instructions: "1. Cook turkey with ginger\n2. Add water chestnuts\n3. Season with soy sauce\n4. Serve in lettuce cups",
    category: "asian-fusion"
  }
];

const dinnerOptions: Meal[] = [
  {
    name: "Grilled Salmon with Vegetables",
    calories: 420,
    protein: 35,
    carbs: 25,
    fat: 20,
    time: "25 min",
    ingredients: ["Salmon fillet", "Broccoli", "Sweet potato", "Olive oil", "Herbs"],
    instructions: "1. Season salmon with herbs\n2. Grill for 6-8 minutes per side\n3. Steam broccoli\n4. Roast sweet potato",
    category: "omega-rich"
  },
  {
    name: "Lentil Curry with Rice",
    calories: 380,
    protein: 20,
    carbs: 58,
    fat: 10,
    time: "30 min",
    ingredients: ["Red lentils", "Brown rice", "Coconut milk", "Curry spices", "Vegetables"],
    instructions: "1. Cook lentils with spices\n2. Add coconut milk\n3. Simmer with vegetables\n4. Serve over rice",
    category: "comfort-food"
  },
  {
    name: "Stuffed Bell Peppers",
    calories: 350,
    protein: 25,
    carbs: 35,
    fat: 12,
    time: "35 min",
    ingredients: ["Bell peppers", "Ground turkey", "Quinoa", "Tomato sauce", "Cheese"],
    instructions: "1. Hollow out peppers\n2. Mix turkey and quinoa\n3. Stuff peppers\n4. Bake with cheese on top",
    category: "family-friendly"
  },
  {
    name: "Zucchini Noodle Carbonara",
    calories: 290,
    protein: 22,
    carbs: 15,
    fat: 18,
    time: "20 min",
    ingredients: ["Zucchini", "Eggs", "Parmesan", "Turkey bacon", "Garlic"],
    instructions: "1. Spiralize zucchini\n2. Cook turkey bacon\n3. Make carbonara sauce\n4. Toss together",
    category: "low-carb"
  },
  {
    name: "Moroccan Chicken Tagine",
    calories: 400,
    protein: 32,
    carbs: 28,
    fat: 18,
    time: "40 min",
    ingredients: ["Chicken thighs", "Apricots", "Chickpeas", "Moroccan spices", "Couscous"],
    instructions: "1. Brown chicken pieces\n2. Add spices and apricots\n3. Simmer with chickpeas\n4. Serve over couscous",
    category: "exotic"
  }
];

export const generateWeeklyPlan = (userProfile: any): Record<string, MealPlan> => {
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const plan: Record<string, MealPlan> = {};

  daysOfWeek.forEach((day, index) => {
    // Rotate through different meal options to ensure variety
    const breakfastIndex = index % breakfastOptions.length;
    const lunchIndex = index % lunchOptions.length;
    const dinnerIndex = index % dinnerOptions.length;

    plan[day] = {
      breakfast: breakfastOptions[breakfastIndex],
      lunch: lunchOptions[lunchIndex],
      dinner: dinnerOptions[dinnerIndex]
    };

    // Add snacks for higher calorie needs
    if (userProfile?.goal === 'muscle-gain' || userProfile?.activityLevel === 'high') {
      plan[day].snack = {
        name: "Protein Snack",
        calories: 150,
        protein: 15,
        carbs: 10,
        fat: 6,
        time: "5 min",
        ingredients: ["Greek yogurt", "Nuts", "Berries"],
        instructions: "Mix yogurt with nuts and berries",
        category: "snack"
      };
    }
  });

  return plan;
};

export const adjustMealsForGoal = (plan: Record<string, MealPlan>, goal: string): Record<string, MealPlan> => {
  const adjustedPlan = { ...plan };
  
  Object.keys(adjustedPlan).forEach(day => {
    if (goal === 'weight-loss') {
      // Reduce portions slightly for weight loss
      Object.keys(adjustedPlan[day]).forEach(mealType => {
        const meal = adjustedPlan[day][mealType as keyof MealPlan];
        if (meal) {
          meal.calories = Math.round(meal.calories * 0.85);
          meal.carbs = Math.round(meal.carbs * 0.8);
        }
      });
    } else if (goal === 'muscle-gain') {
      // Increase protein for muscle gain
      Object.keys(adjustedPlan[day]).forEach(mealType => {
        const meal = adjustedPlan[day][mealType as keyof MealPlan];
        if (meal) {
          meal.protein = Math.round(meal.protein * 1.3);
          meal.calories = Math.round(meal.calories * 1.15);
        }
      });
    }
  });

  return adjustedPlan;
};
