import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { 
  ShoppingCart, 
  MapPin, 
  Clock, 
  DollarSign,
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Calendar,
  Navigation,
  CheckCircle
} from 'lucide-react';

interface FestiveShoppingPageProps {
  onNavigate: (page: string) => void;
}

export function FestiveShoppingPage({ onNavigate }: FestiveShoppingPageProps) {
  const [activeTab, setActiveTab] = useState('lists');

  const shoppingLists = [
    {
      id: 'gifts',
      name: 'Christmas Gifts',
      items: 0,
      completed: 0,
      budget: 500,
      spent: 0,
      color: '#7C3AED'
    },
    {
      id: 'food',
      name: 'Christmas Food',
      items: 0,
      completed: 0,
      budget: 200,
      spent: 0,
      color: '#DC2626'
    },
    {
      id: 'decorations',
      name: 'Decorations',
      items: 0,
      completed: 0,
      budget: 150,
      spent: 0,
      color: '#059669'
    }
  ];

  const stores = [
    { name: 'Target', category: 'Department Store', distance: '2.3 miles', hours: '8AM-10PM' },
    { name: 'Walmart', category: 'Superstore', distance: '3.1 miles', hours: '24 hours' },
    { name: 'Best Buy', category: 'Electronics', distance: '4.5 miles', hours: '10AM-9PM' },
    { name: 'Whole Foods', category: 'Grocery', distance: '1.8 miles', hours: '7AM-10PM' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#059669] to-[#047857] text-white py-12">
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
              <ShoppingCart className="h-10 w-10" />
              <div>
                <h1 className="text-3xl font-bold">Shopping & Reservations</h1>
                <p className="text-lg opacity-90">Coordinate all your holiday shopping</p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm opacity-75">Shopping Lists</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm opacity-75">Items Bought</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">$0</div>
              <div className="text-sm opacity-75">Total Spent</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm opacity-75">Stores Visited</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lists">Shopping Lists</TabsTrigger>
            <TabsTrigger value="stores">Store Locator</TabsTrigger>
            <TabsTrigger value="reservations">Reservations</TabsTrigger>
          </TabsList>

          {/* Shopping Lists Tab */}
          <TabsContent value="lists" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Shopping Lists</h2>
                <p className="text-gray-600">Organize your Christmas shopping by category</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New List
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {shoppingLists.map((list) => (
                <Card key={list.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${list.color}20` }}
                        >
                          <ShoppingCart className="h-5 w-5" style={{ color: list.color }} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{list.name}</CardTitle>
                          <CardDescription>
                            {list.items} items • {list.completed} completed
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Budget: ${list.budget}</span>
                        <span>Spent: ${list.spent}</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all"
                          style={{ 
                            backgroundColor: list.color,
                            width: `${list.budget > 0 ? (list.spent / list.budget) * 100 : 0}%`
                          }}
                        ></div>
                      </div>
                      
                      <div className="text-center text-gray-500 py-4">
                        <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No items yet</p>
                        <Button size="sm" className="mt-2" variant="outline">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Items
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Store Locator Tab */}
          <TabsContent value="stores" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Store Locator</h2>
                <p className="text-gray-600">Find the best stores for your Christmas shopping</p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search stores..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {stores.map((store, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{store.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {store.category}
                          </Badge>
                        </CardDescription>
                      </div>
                      <Button size="sm" variant="outline">
                        <Navigation className="h-4 w-4 mr-1" />
                        Directions
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{store.distance} away</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{store.hours}</span>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button className="flex-1 bg-[#059669] hover:bg-[#047857] text-white">
                          Add to Trip
                        </Button>
                        <Button variant="outline" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Holiday Reservations</h2>
                <p className="text-gray-600">Manage restaurant and venue bookings</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Reservation
              </Button>
            </div>

            <div className="text-center py-16 text-gray-500">
              <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium mb-2">No reservations yet</h3>
              <p className="mb-6">Start planning your holiday dining and entertainment</p>
              <Button className="bg-[#059669] hover:bg-[#047857] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Make First Reservation
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}