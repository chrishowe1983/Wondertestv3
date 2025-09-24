import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { 
  ArrowLeft,
  ChefHat,
  Clock,
  Users,
  Sparkles,
  Settings
} from 'lucide-react';
import exampleImage from 'figma:asset/d772c6c3741bb2be09b79d4ace7a1f11a803d022.png';

interface ChristmasFoodListProps {
  onNavigate: (page: string) => void;
}

export function ChristmasFoodList({ onNavigate }: ChristmasFoodListProps) {
  const [numberOfGuests, setNumberOfGuests] = useState([8]);
  const [prepTime, setPrepTime] = useState([3]);
  const [cuisineStyle, setCuisineStyle] = useState('Traditional');
  const [eventType, setEventType] = useState('Family Dinner');
  const [budgetRange, setBudgetRange] = useState('Moderate ($100-200)');
  const [cookingSkill, setCookingSkill] = useState('Intermediate');
  const [dietaryPreference, setDietaryPreference] = useState('No restrictions');

  const cuisineOptions = ['Traditional', 'Modern', 'Fusion', 'International'];
  const eventOptions = ['Family Dinner', 'Holiday Party', 'Potluck', 'Formal Dinner'];
  const budgetOptions = ['Budget ($50-100)', 'Moderate ($100-200)', 'Premium ($200-350)', 'Luxury ($350+)'];
  const skillOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const dietaryOptions = ['No restrictions', 'Vegetarian', 'Vegan', 'Gluten-free', 'Keto'];

  const getButtonColor = (option: string, selected: string, category: string) => {
    if (option === selected) {
      switch (category) {
        case 'cuisine':
          return 'bg-blue-500 text-white hover:bg-blue-600';
        case 'event':
          return 'bg-blue-500 text-white hover:bg-blue-600';
        case 'budget':
          return option.includes('Moderate') ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
        case 'skill':
          return 'bg-green-500 text-white hover:bg-green-600';
        case 'dietary':
          return 'bg-purple-500 text-white hover:bg-purple-600';
        default:
          return 'bg-blue-500 text-white hover:bg-blue-600';
      }
    }
    return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => onNavigate('christmas')}
                variant="ghost" 
                className="text-gray-600 hover:bg-gray-100 flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Christmas
              </Button>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="font-semibold text-red-500">Christmaslist</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-medium">Christmas</span>
              <span className="text-blue-600 font-medium">Food List</span>
              <Settings className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Main Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Christmas Food List</h1>
          <p className="text-gray-600">Plan delicious holiday meals that bring everyone together</p>
        </div>

        {/* Feature Icons */}
        <div className="flex justify-center gap-12 mb-12">
          <div className="flex items-center gap-2 text-gray-600">
            <ChefHat className="h-5 w-5" />
            <span>Recipe Management</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span>Smart Timing</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="h-5 w-5" />
            <span>Guest Coordination</span>
          </div>
        </div>

        {/* AI-Powered Quick Start */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">AI-Powered Quick Start</h2>
            </div>

            <div className="space-y-8">
              {/* Number of Guests & Prep Time */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-medium text-gray-900">Number of Guests:</label>
                    <span className="text-blue-600 font-semibold">{numberOfGuests[0]}</span>
                  </div>
                  <Slider
                    value={numberOfGuests}
                    onValueChange={setNumberOfGuests}
                    max={20}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>1</span>
                    <span>8h+</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-medium text-gray-900">Prep Time:</label>
                    <span className="text-blue-600 font-semibold">{prepTime[0]} hours</span>
                  </div>
                  <Slider
                    value={prepTime}
                    onValueChange={setPrepTime}
                    max={8}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>1h</span>
                    <span>8h+</span>
                  </div>
                </div>
              </div>

              {/* Cuisine Style */}
              <div>
                <label className="block font-medium text-gray-900 mb-4">Cuisine Style</label>
                <div className="flex gap-3">
                  {cuisineOptions.map((option) => (
                    <Button
                      key={option}
                      onClick={() => setCuisineStyle(option)}
                      variant="outline"
                      className={getButtonColor(option, cuisineStyle, 'cuisine')}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Event Type */}
              <div>
                <label className="block font-medium text-gray-900 mb-4">Event Type</label>
                <div className="flex gap-3">
                  {eventOptions.map((option) => (
                    <Button
                      key={option}
                      onClick={() => setEventType(option)}
                      variant="outline"
                      className={getButtonColor(option, eventType, 'event')}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block font-medium text-gray-900 mb-4">Budget Range</label>
                <div className="grid grid-cols-2 gap-3">
                  {budgetOptions.map((option) => (
                    <Button
                      key={option}
                      onClick={() => setBudgetRange(option)}
                      variant="outline"
                      className={getButtonColor(option, budgetRange, 'budget')}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Cooking Skill & Dietary Preferences */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block font-medium text-gray-900 mb-4">Cooking Skill</label>
                  <div className="grid grid-cols-2 gap-2">
                    {skillOptions.map((option) => (
                      <Button
                        key={option}
                        onClick={() => setCookingSkill(option)}
                        variant="outline"
                        size="sm"
                        className={getButtonColor(option, cookingSkill, 'skill')}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-4">Dietary Preferences</label>
                  <div className="grid grid-cols-2 gap-2">
                    {dietaryOptions.map((option) => (
                      <Button
                        key={option}
                        onClick={() => setDietaryPreference(option)}
                        variant="outline"
                        size="sm"
                        className={getButtonColor(option, dietaryPreference, 'dietary')}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="pt-4">
                <Button 
                  onClick={() => onNavigate('christmas-food-results')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Complete Menu Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}