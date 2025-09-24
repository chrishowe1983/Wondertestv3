import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  UtensilsCrossed, 
  Plus, 
  Clock, 
  Users, 
  ChefHat, 
  ShoppingCart,
  Calendar,
  CheckCircle,
  ArrowLeft,
  Star
} from 'lucide-react';

interface ChristmasFoodPageProps {
  onNavigate: (page: string) => void;
}

export function ChristmasFoodPage({ onNavigate }: ChristmasFoodPageProps) {
  const [selectedMeal, setSelectedMeal] = useState('dinner');
  const [guestCount, setGuestCount] = useState(8);

  const mealTypes = [
    { id: 'breakfast', name: 'Christmas Breakfast', icon: '🥐' },
    { id: 'lunch', name: 'Christmas Lunch', icon: '🥗' },
    { id: 'dinner', name: 'Christmas Dinner', icon: '🦃' },
    { id: 'desserts', name: 'Holiday Desserts', icon: '🎂' },
    { id: 'snacks', name: 'Holiday Snacks', icon: '🧀' },
    { id: 'drinks', name: 'Holiday Drinks', icon: '🥂' }
  ];

  const suggestedDishes = [
    { name: 'Roast Turkey', category: 'Main', time: '4 hours', difficulty: 'Medium' },
    { name: 'Honey Glazed Ham', category: 'Main', time: '3 hours', difficulty: 'Easy' },
    { name: 'Roasted Vegetables', category: 'Side', time: '45 min', difficulty: 'Easy' },
    { name: 'Cranberry Sauce', category: 'Side', time: '30 min', difficulty: 'Easy' },
    { name: 'Christmas Pudding', category: 'Dessert', time: '6 hours', difficulty: 'Hard' },
    { name: 'Mince Pies', category: 'Dessert', time: '1 hour', difficulty: 'Medium' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={() => onNavigate('christmas')}
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4">
              <UtensilsCrossed className="h-10 w-10" />
              <div>
                <h1 className="text-3xl font-bold">Christmas Food & Menu</h1>
                <p className="text-lg opacity-90">Plan your perfect holiday meals</p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{guestCount}</div>
              <div className="text-sm opacity-75">Expected Guests</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">Dec 25</div>
              <div className="text-sm opacity-75">Christmas Day</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">0/6</div>
              <div className="text-sm opacity-75">Meals Planned</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Quick Setup */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-[#DC2626]" />
              Quick Setup
            </CardTitle>
            <CardDescription>
              Tell us about your Christmas meal planning to get personalized suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Number of Guests</label>
                <Input 
                  type="number" 
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value) || 0)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cooking Experience</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Dietary Preferences</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Traditional</option>
                  <option>Vegetarian</option>
                  <option>Vegan</option>
                  <option>Gluten-Free</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meal Planning Tabs */}
        <Tabs value={selectedMeal} onValueChange={setSelectedMeal} className="space-y-6">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
            {mealTypes.map((meal) => (
              <TabsTrigger 
                key={meal.id} 
                value={meal.id}
                className="text-xs flex flex-col gap-1 h-16"
              >
                <span className="text-lg">{meal.icon}</span>
                <span className="hidden lg:inline">{meal.name}</span>
                <span className="lg:hidden">{meal.name.split(' ')[1]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {mealTypes.map((meal) => (
            <TabsContent key={meal.id} value={meal.id} className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Menu Planning */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ChefHat className="h-5 w-5" />
                        {meal.name} Menu
                      </CardTitle>
                      <CardDescription>
                        Plan your {meal.name.toLowerCase()} dishes and timing
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button 
                          variant="outline" 
                          className="w-full border-dashed border-2 h-16"
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Add a dish to your menu
                        </Button>
                        
                        <div className="text-center text-gray-500 py-8">
                          <UtensilsCrossed className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No dishes added yet</p>
                          <p className="text-sm">Start by adding dishes from our suggestions</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Suggestions */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Suggested Dishes</CardTitle>
                      <CardDescription>
                        Popular {meal.name.toLowerCase()} options
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {suggestedDishes.map((dish, index) => (
                          <div 
                            key={index}
                            className="p-3 border border-gray-200 rounded-lg hover:border-[#DC2626] hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-sm">{dish.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {dish.category}
                              </Badge>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {dish.time}
                              </span>
                              <span>{dish.difficulty}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button className="w-full mt-4" variant="outline">
                        View More Suggestions
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button 
            onClick={() => onNavigate('christmas-shopping')}
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Generate Shopping List
          </Button>
          <Button 
            onClick={() => onNavigate('christmas-timeline')}
            variant="outline"
            className="border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Create Cooking Timeline
          </Button>
        </div>
      </div>
    </div>
  );
}