
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Scan, Plus, Trash2, ChefHat, ShoppingCart, Refrigerator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PantrySync: React.FC = () => {
  const navigate = useNavigate();
  const [pantryItems, setPantryItems] = useState([
    { id: 1, name: 'Chicken Breast', quantity: '2 lbs', expiry: '2024-03-20', category: 'protein' },
    { id: 2, name: 'Broccoli', quantity: '1 head', expiry: '2024-03-18', category: 'vegetable' },
    { id: 3, name: 'Rice', quantity: '5 lbs', expiry: '2025-01-01', category: 'grain' },
    { id: 4, name: 'Eggs', quantity: '12 count', expiry: '2024-03-25', category: 'protein' },
    { id: 5, name: 'Spinach', quantity: '1 bag', expiry: '2024-03-19', category: 'vegetable' },
    { id: 6, name: 'Olive Oil', quantity: '500ml', expiry: '2025-06-01', category: 'oil' },
  ]);

  const [newItem, setNewItem] = useState({ name: '', quantity: '', expiry: '', category: 'other' });
  const [scanMode, setScanMode] = useState(false);

  const suggestedRecipes = [
    {
      id: 1,
      name: "Chicken and Broccoli Stir Fry",
      ingredients: ['Chicken Breast', 'Broccoli', 'Rice', 'Olive Oil'],
      availableIngredients: 4,
      totalIngredients: 4,
      cookTime: "20 min",
      difficulty: "Easy"
    },
    {
      id: 2,
      name: "Spinach and Egg Scramble",
      ingredients: ['Eggs', 'Spinach', 'Olive Oil'],
      availableIngredients: 3,
      totalIngredients: 3,
      cookTime: "10 min",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Vegetable Fried Rice",
      ingredients: ['Rice', 'Eggs', 'Broccoli', 'Spinach', 'Olive Oil'],
      availableIngredients: 5,
      totalIngredients: 5,
      cookTime: "15 min",
      difficulty: "Medium"
    }
  ];

  const expiringItems = pantryItems.filter(item => {
    const expiry = new Date(item.expiry);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  });

  const handleAddItem = () => {
    if (newItem.name && newItem.quantity) {
      setPantryItems([...pantryItems, {
        id: Date.now(),
        ...newItem
      }]);
      setNewItem({ name: '', quantity: '', expiry: '', category: 'other' });
      toast.success('Item added to pantry');
    }
  };

  const handleRemoveItem = (id: number) => {
    setPantryItems(pantryItems.filter(item => item.id !== id));
    toast.success('Item removed from pantry');
  };

  const handleBarcodeScanner = () => {
    setScanMode(true);
    // Simulate barcode scanning
    setTimeout(() => {
      const scannedItem = {
        name: 'Canned Tomatoes',
        quantity: '400g',
        expiry: '2025-12-31',
        category: 'canned'
      };
      setPantryItems([...pantryItems, { id: Date.now(), ...scannedItem }]);
      setScanMode(false);
      toast.success('Barcode scanned successfully!');
    }, 2000);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      protein: 'bg-red-100 text-red-800',
      vegetable: 'bg-green-100 text-green-800',
      grain: 'bg-yellow-100 text-yellow-800',
      dairy: 'bg-blue-100 text-blue-800',
      oil: 'bg-purple-100 text-purple-800',
      canned: 'bg-orange-100 text-orange-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.other;
  };

  const getExpiryStatus = (expiry: string) => {
    const expiryDate = new Date(expiry);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: 'expired', color: 'text-red-600', text: 'Expired' };
    if (diffDays <= 3) return { status: 'expiring', color: 'text-orange-600', text: `${diffDays} days` };
    return { status: 'fresh', color: 'text-green-600', text: 'Fresh' };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Smart Pantry</h1>
            <p className="text-gray-600">Track your ingredients and get personalized recipe suggestions</p>
          </div>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>

        {/* Expiring Items Alert */}
        {expiringItems.length > 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Refrigerator className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-orange-900">Items Expiring Soon</h3>
                  <p className="text-sm text-orange-700">
                    {expiringItems.length} items are expiring within 3 days
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {expiringItems.map(item => (
                  <Badge key={item.id} variant="outline" className="border-orange-300">
                    {item.name} - {getExpiryStatus(item.expiry).text}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pantry Management */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="inventory">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="inventory">My Pantry</TabsTrigger>
                <TabsTrigger value="add">Add Items</TabsTrigger>
              </TabsList>
              
              <TabsContent value="inventory" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Refrigerator className="h-5 w-5" />
                      Pantry Inventory ({pantryItems.length} items)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pantryItems.map(item => {
                        const expiryStatus = getExpiryStatus(item.expiry);
                        return (
                          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-medium">{item.name}</h3>
                                <Badge className={getCategoryColor(item.category)}>
                                  {item.category}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>Qty: {item.quantity}</span>
                                <span className={expiryStatus.color}>
                                  {expiryStatus.text}
                                </span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="add" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Items</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        onClick={handleBarcodeScanner}
                        disabled={scanMode}
                        className="h-20 flex-col gap-2"
                      >
                        <Scan className="h-6 w-6" />
                        {scanMode ? 'Scanning...' : 'Scan Barcode'}
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 flex-col gap-2"
                        onClick={() => toast.info('Receipt upload feature coming soon!')}
                      >
                        <Camera className="h-6 w-6" />
                        Upload Receipt
                      </Button>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-3">Manual Entry</h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input
                            placeholder="Item name"
                            value={newItem.name}
                            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                          />
                          <Input
                            placeholder="Quantity"
                            value={newItem.quantity}
                            onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input
                            type="date"
                            placeholder="Expiry date"
                            value={newItem.expiry}
                            onChange={(e) => setNewItem({...newItem, expiry: e.target.value})}
                          />
                          <select
                            className="px-3 py-2 border rounded-md"
                            value={newItem.category}
                            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                          >
                            <option value="protein">Protein</option>
                            <option value="vegetable">Vegetable</option>
                            <option value="grain">Grain</option>
                            <option value="dairy">Dairy</option>
                            <option value="oil">Oil</option>
                            <option value="canned">Canned</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <Button onClick={handleAddItem} className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Item
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Recipe Suggestions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  Recipe Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestedRecipes.map(recipe => (
                    <div key={recipe.id} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{recipe.name}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-green-600">
                          {recipe.availableIngredients}/{recipe.totalIngredients} ingredients available
                        </span>
                        <Badge variant="outline">{recipe.difficulty}</Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Cook time: {recipe.cookTime}
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-gray-600 mb-1">Required ingredients:</div>
                        <div className="flex flex-wrap gap-1">
                          {recipe.ingredients.map((ingredient, index) => (
                            <Badge
                              key={index}
                              variant={pantryItems.some(item => item.name === ingredient) ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {ingredient}
                              {pantryItems.some(item => item.name === ingredient) ? " ✓" : ""}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="flex-1">
                          <ChefHat className="h-3 w-3 mr-1" />
                          Cook
                        </Button>
                        {recipe.availableIngredients < recipe.totalIngredients && (
                          <Button size="sm" variant="outline" className="flex-1">
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Shop
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantrySync;
