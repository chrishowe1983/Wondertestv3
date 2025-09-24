import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  DollarSign, 
  Users, 
  Clock, 
  ChefHat, 
  ShoppingCart,
  Filter,
  Search,
  Utensils,
  Star
} from 'lucide-react';

interface ChristmasDinnerPlannerProps {
  onNavigate: (page: string) => void;
}

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  estimatedCost: number;
  priority: 'high' | 'medium' | 'low';
  checked: boolean;
  recipe?: string;
}

const dinnerPresets = {
  'traditional': {
    name: 'Traditional Christmas Dinner',
    servings: 8,
    courses: ['appetizers', 'main', 'sides', 'dessert'],
    recipes: [
      'Roast Turkey with Herb Stuffing',
      'Honey Glazed Ham',
      'Roasted Brussels Sprouts',
      'Mashed Potatoes',
      'Cranberry Sauce',
      'Christmas Pudding'
    ]
  },
  'modern': {
    name: 'Modern Christmas Feast',
    servings: 6,
    courses: ['appetizers', 'main', 'sides', 'dessert'],
    recipes: [
      'Prime Rib Roast',
      'Maple Glazed Carrots',
      'Truffle Mac and Cheese',
      'Winter Salad',
      'Chocolate Yule Log',
      'Mulled Wine'
    ]
  },
  'vegetarian': {
    name: 'Vegetarian Christmas',
    servings: 6,
    courses: ['appetizers', 'main', 'sides', 'dessert'],
    recipes: [
      'Stuffed Portobello Wellington',
      'Roasted Root Vegetables',
      'Wild Rice Stuffing',
      'Green Bean Almondine',
      'Vegan Christmas Cake',
      'Spiced Apple Cider'
    ]
  }
};

const generateShoppingList = (preset: string, servings: number): ShoppingItem[] => {
  const baseItems: Record<string, ShoppingItem[]> = {
    'traditional': [
      { id: '1', name: 'Whole Turkey', category: 'Meat', quantity: 1, unit: '12-14 lb', estimatedCost: 45.00, priority: 'high', checked: false, recipe: 'Roast Turkey' },
      { id: '2', name: 'Ham', category: 'Meat', quantity: 1, unit: '8 lb', estimatedCost: 35.00, priority: 'high', checked: false, recipe: 'Honey Glazed Ham' },
      { id: '3', name: 'Brussels Sprouts', category: 'Vegetables', quantity: 2, unit: 'lbs', estimatedCost: 8.00, priority: 'medium', checked: false, recipe: 'Roasted Brussels Sprouts' },
      { id: '4', name: 'Potatoes', category: 'Vegetables', quantity: 5, unit: 'lbs', estimatedCost: 4.00, priority: 'high', checked: false, recipe: 'Mashed Potatoes' },
      { id: '5', name: 'Cranberries', category: 'Fruits', quantity: 2, unit: 'cups', estimatedCost: 6.00, priority: 'medium', checked: false, recipe: 'Cranberry Sauce' },
      { id: '6', name: 'Heavy Cream', category: 'Dairy', quantity: 2, unit: 'cups', estimatedCost: 5.00, priority: 'medium', checked: false, recipe: 'Mashed Potatoes' },
      { id: '7', name: 'Butter', category: 'Dairy', quantity: 2, unit: 'sticks', estimatedCost: 4.00, priority: 'high', checked: false, recipe: 'Multiple' },
      { id: '8', name: 'Fresh Herbs', category: 'Herbs', quantity: 1, unit: 'bundle', estimatedCost: 8.00, priority: 'medium', checked: false, recipe: 'Herb Stuffing' },
      { id: '9', name: 'Bread Cubes', category: 'Pantry', quantity: 1, unit: 'bag', estimatedCost: 3.00, priority: 'medium', checked: false, recipe: 'Stuffing' },
      { id: '10', name: 'Christmas Pudding', category: 'Dessert', quantity: 1, unit: 'each', estimatedCost: 15.00, priority: 'low', checked: false, recipe: 'Christmas Pudding' }
    ],
    'modern': [
      { id: '11', name: 'Prime Rib Roast', category: 'Meat', quantity: 1, unit: '4-5 lb', estimatedCost: 65.00, priority: 'high', checked: false, recipe: 'Prime Rib Roast' },
      { id: '12', name: 'Baby Carrots', category: 'Vegetables', quantity: 2, unit: 'lbs', estimatedCost: 4.00, priority: 'medium', checked: false, recipe: 'Maple Glazed Carrots' },
      { id: '13', name: 'Truffle Oil', category: 'Pantry', quantity: 1, unit: 'bottle', estimatedCost: 12.00, priority: 'medium', checked: false, recipe: 'Truffle Mac and Cheese' },
      { id: '14', name: 'Gruyere Cheese', category: 'Dairy', quantity: 8, unit: 'oz', estimatedCost: 15.00, priority: 'medium', checked: false, recipe: 'Mac and Cheese' },
      { id: '15', name: 'Mixed Greens', category: 'Vegetables', quantity: 2, unit: 'bags', estimatedCost: 6.00, priority: 'low', checked: false, recipe: 'Winter Salad' },
      { id: '16', name: 'Dark Chocolate', category: 'Baking', quantity: 8, unit: 'oz', estimatedCost: 8.00, priority: 'medium', checked: false, recipe: 'Chocolate Yule Log' },
      { id: '17', name: 'Red Wine', category: 'Beverages', quantity: 2, unit: 'bottles', estimatedCost: 25.00, priority: 'low', checked: false, recipe: 'Mulled Wine' },
      { id: '18', name: 'Maple Syrup', category: 'Pantry', quantity: 1, unit: 'bottle', estimatedCost: 8.00, priority: 'medium', checked: false, recipe: 'Maple Glazed Carrots' }
    ],
    'vegetarian': [
      { id: '19', name: 'Large Portobello Mushrooms', category: 'Vegetables', quantity: 6, unit: 'pieces', estimatedCost: 12.00, priority: 'high', checked: false, recipe: 'Portobello Wellington' },
      { id: '20', name: 'Puff Pastry', category: 'Frozen', quantity: 2, unit: 'sheets', estimatedCost: 6.00, priority: 'high', checked: false, recipe: 'Wellington' },
      { id: '21', name: 'Root Vegetables Mix', category: 'Vegetables', quantity: 3, unit: 'lbs', estimatedCost: 8.00, priority: 'medium', checked: false, recipe: 'Roasted Root Vegetables' },
      { id: '22', name: 'Wild Rice', category: 'Pantry', quantity: 2, unit: 'cups', estimatedCost: 7.00, priority: 'medium', checked: false, recipe: 'Wild Rice Stuffing' },
      { id: '23', name: 'Green Beans', category: 'Vegetables', quantity: 2, unit: 'lbs', estimatedCost: 6.00, priority: 'medium', checked: false, recipe: 'Green Bean Almondine' },
      { id: '24', name: 'Sliced Almonds', category: 'Nuts', quantity: 1, unit: 'cup', estimatedCost: 5.00, priority: 'low', checked: false, recipe: 'Green Bean Almondine' },
      { id: '25', name: 'Vegan Butter', category: 'Dairy Alternative', quantity: 2, unit: 'sticks', estimatedCost: 6.00, priority: 'medium', checked: false, recipe: 'Multiple' },
      { id: '26', name: 'Apple Cider', category: 'Beverages', quantity: 1, unit: 'gallon', estimatedCost: 5.00, priority: 'low', checked: false, recipe: 'Spiced Apple Cider' }
    ]
  };

  return baseItems[preset] || baseItems['traditional'];
};

export function ChristmasDinnerPlanner({ onNavigate }: ChristmasDinnerPlannerProps) {
  const [selectedPreset, setSelectedPreset] = useState('traditional');
  const [servings, setServings] = useState(8);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  // Check for search context from intelligent search
  useEffect(() => {
    const context = sessionStorage.getItem('searchContext');
    if (context) {
      const parsed = JSON.parse(context);
      if (parsed.type === 'christmas-dinner') {
        // Auto-set preset based on search query
        const query = parsed.query.toLowerCase();
        if (query.includes('vegetarian') || query.includes('vegan')) {
          setSelectedPreset('vegetarian');
        } else if (query.includes('modern') || query.includes('contemporary')) {
          setSelectedPreset('modern');
        }
      }
      sessionStorage.removeItem('searchContext');
    }
  }, []);

  useEffect(() => {
    const list = generateShoppingList(selectedPreset, servings);
    setShoppingList(list);
    setTotalCost(list.reduce((sum, item) => sum + item.estimatedCost, 0));
  }, [selectedPreset, servings]);

  const toggleItem = (id: string) => {
    setShoppingList(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const updateQuantity = (id: string, delta: number) => {
    setShoppingList(prev => 
      prev.map(item => 
        item.id === id ? { 
          ...item, 
          quantity: Math.max(0, item.quantity + delta),
          estimatedCost: item.estimatedCost * (Math.max(0, item.quantity + delta) / item.quantity)
        } : item
      )
    );
  };

  const filteredItems = shoppingList.filter(item => {
    const matchesCategory = filterCategory === 'all' || item.category.toLowerCase() === filterCategory;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    const matchesSearch = searchFilter === '' || 
      item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (item.recipe && item.recipe.toLowerCase().includes(searchFilter.toLowerCase()));
    
    return matchesCategory && matchesPriority && matchesSearch;
  });

  const categories = [...new Set(shoppingList.map(item => item.category))];
  const completedItems = shoppingList.filter(item => item.checked).length;
  const completionPercentage = shoppingList.length > 0 ? (completedItems / shoppingList.length) * 100 : 0;

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F05959] to-[#E04848] text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => onNavigate('listmas')}
              className="text-white hover:bg-white/10 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-[#F05959]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Christmas Dinner Planner</h1>
                <p className="opacity-90">Intelligent meal planning with automated shopping lists</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold">{servings}</div>
              <div className="text-sm opacity-90">Servings</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">${totalCost.toFixed(2)}</div>
              <div className="text-sm opacity-90">Est. Cost</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{shoppingList.length}</div>
              <div className="text-sm opacity-90">Items</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{completionPercentage.toFixed(0)}%</div>
              <div className="text-sm opacity-90">Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <Tabs defaultValue="planner" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="planner">Meal Planner</TabsTrigger>
            <TabsTrigger value="shopping">Shopping List</TabsTrigger>
          </TabsList>

          <TabsContent value="planner" className="space-y-6">
            {/* Preset Selection */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Choose Your Christmas Dinner Style</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {Object.entries(dinnerPresets).map(([key, preset]) => (
                  <Card 
                    key={key}
                    className={`p-4 cursor-pointer transition-all border-2 ${
                      selectedPreset === key 
                        ? 'border-[#F05959] bg-[#F05959]/5' 
                        : 'border-gray-200 hover:border-[#F05959]/50'
                    }`}
                    onClick={() => setSelectedPreset(key)}
                  >
                    <h4 className="font-bold mb-2">{preset.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{preset.servings} servings</p>
                    <div className="space-y-1">
                      {preset.recipes.slice(0, 3).map((recipe, index) => (
                        <div key={index} className="text-xs text-gray-500">• {recipe}</div>
                      ))}
                      {preset.recipes.length > 3 && (
                        <div className="text-xs text-gray-400">+{preset.recipes.length - 3} more...</div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Servings Selector */}
              <div className="flex items-center gap-4">
                <label className="font-medium">Number of Servings:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setServings(Math.max(1, servings - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-bold">{servings}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setServings(servings + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Recipe Preview */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Your Christmas Menu</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dinnerPresets[selectedPreset as keyof typeof dinnerPresets].recipes.map((recipe, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Utensils className="w-5 h-5 text-[#F05959]" />
                    <span className="font-medium">{recipe}</span>
                    <Star className="w-4 h-4 text-yellow-500 ml-auto" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="shopping" className="space-y-6">
            {/* Filters */}
            <Card className="p-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search items..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Shopping List */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Shopping List</h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {completedItems} of {shoppingList.length} items
                  </span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#F05959] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id}
                    className={`flex items-center gap-4 p-4 border rounded-lg transition-all ${
                      item.checked ? 'bg-gray-50 opacity-75' : 'bg-white hover:shadow-sm'
                    }`}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => toggleItem(item.id)}
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium ${item.checked ? 'line-through text-gray-500' : ''}`}>
                          {item.name}
                        </h4>
                        <Badge variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'}>
                          {item.priority}
                        </Badge>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      {item.recipe && (
                        <p className="text-sm text-gray-500">For: {item.recipe}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-16 text-center text-sm">
                        {item.quantity} {item.unit}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <div className="font-bold">${item.estimatedCost.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total Estimated Cost:</span>
                  <span className="text-2xl font-bold text-[#F05959]">
                    ${totalCost.toFixed(2)}
                  </span>
                </div>
                <Button className="w-full mt-4 bg-[#F05959] hover:bg-[#E04848]">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Start Shopping
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}