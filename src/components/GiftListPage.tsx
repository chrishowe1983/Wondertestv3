import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Gift, 
  Plus, 
  DollarSign, 
  User, 
  Heart,
  CheckCircle,
  ArrowLeft,
  Star,
  Search,
  Filter
} from 'lucide-react';

interface GiftListPageProps {
  onNavigate: (page: string) => void;
}

export function GiftListPage({ onNavigate }: GiftListPageProps) {
  const [totalBudget, setTotalBudget] = useState(500);
  const [spentAmount, setSpentAmount] = useState(0);

  const giftCategories = [
    { id: 'family', name: 'Family', count: 0, icon: '👨‍👩‍👧‍👦' },
    { id: 'friends', name: 'Friends', count: 0, icon: '👥' },
    { id: 'colleagues', name: 'Colleagues', count: 0, icon: '💼' },
    { id: 'kids', name: 'Kids', count: 0, icon: '🧸' },
    { id: 'teachers', name: 'Teachers', count: 0, icon: '📚' },
    { id: 'others', name: 'Others', count: 0, icon: '🎁' }
  ];

  const giftIdeas = [
    { name: 'Cozy Blanket', price: '$25-45', category: 'Family', popularity: 'High' },
    { name: 'Coffee Subscription', price: '$30-60', category: 'Friends', popularity: 'High' },
    { name: 'Desk Plant', price: '$15-30', category: 'Colleagues', popularity: 'Medium' },
    { name: 'Art Supplies', price: '$20-50', category: 'Kids', popularity: 'High' },
    { name: 'Gift Card', price: '$25-100', category: 'Teachers', popularity: 'High' },
    { name: 'Candle Set', price: '$20-40', category: 'Others', popularity: 'Medium' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white py-12">
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
              <Gift className="h-10 w-10" />
              <div>
                <h1 className="text-3xl font-bold">Gift Planning</h1>
                <p className="text-lg opacity-90">Organize presents for everyone you love</p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">${totalBudget}</div>
              <div className="text-sm opacity-75">Total Budget</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Gift className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm opacity-75">Gifts Planned</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm opacity-75">Purchased</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <User className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm opacity-75">Recipients</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Budget Setup */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-[#7C3AED]" />
              Budget Overview
            </CardTitle>
            <CardDescription>
              Set your total gift budget and track your spending
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Total Budget</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    type="number" 
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(parseInt(e.target.value) || 0)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Spent So Far</label>
                <div className="text-2xl font-bold text-gray-900">
                  ${spentAmount}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Remaining</label>
                <div className="text-2xl font-bold text-green-600">
                  ${totalBudget - spentAmount}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Budget Progress</span>
                <span>{totalBudget > 0 ? Math.round((spentAmount / totalBudget) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#7C3AED] h-2 rounded-full transition-all"
                  style={{ width: `${totalBudget > 0 ? Math.min((spentAmount / totalBudget) * 100, 100) : 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gift Lists */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5" />
                      Gift Lists
                    </CardTitle>
                    <CardDescription>
                      Organize gifts by recipient categories
                    </CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Person
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="family" className="space-y-6">
                  <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
                    {giftCategories.map((category) => (
                      <TabsTrigger 
                        key={category.id} 
                        value={category.id}
                        className="text-xs flex flex-col gap-1 h-16"
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span className="hidden lg:inline">{category.name}</span>
                        <span className="lg:hidden">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {giftCategories.map((category) => (
                    <TabsContent key={category.id} value={category.id}>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input placeholder={`Search ${category.name.toLowerCase()}...`} className="pl-10" />
                          </div>
                          <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-center py-12 text-gray-500">
                          <Gift className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <h3 className="text-lg font-medium mb-2">No {category.name.toLowerCase()} added yet</h3>
                          <p className="text-sm mb-4">Start adding people to plan their perfect gifts</p>
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add First Person
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Gift Ideas & Inspiration */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Popular Gift Ideas
                </CardTitle>
                <CardDescription>
                  Trending gifts this season
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {giftIdeas.map((idea, index) => (
                    <div 
                      key={index}
                      className="p-3 border border-gray-200 rounded-lg hover:border-[#7C3AED] hover:bg-purple-50 transition-colors cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{idea.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {idea.category}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{idea.price}</span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3 text-red-400" />
                          {idea.popularity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  View More Ideas
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => onNavigate('christmas-budget')}
                  className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Budget Tracker
                </Button>
                <Button 
                  onClick={() => onNavigate('christmas-shopping')}
                  variant="outline" 
                  className="w-full"
                >
                  <Gift className="mr-2 h-4 w-4" />
                  Shopping List
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}