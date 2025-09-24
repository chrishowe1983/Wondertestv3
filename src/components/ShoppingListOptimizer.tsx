import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, MapPin, DollarSign, Clock, Plus, Check, Star, Navigation } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ShoppingListOptimizerProps {
  onNavigate: (page: string) => void;
}

const shoppingItems = [
  {
    id: 1,
    name: 'Turkey (15-20 lbs)',
    category: 'Meat & Poultry',
    quantity: 1,
    estimatedPrice: 35.99,
    bestStore: 'FreshMart',
    priority: 'high',
    completed: false,
    notes: 'Free-range preferred'
  },
  {
    id: 2,
    name: 'Cranberry Sauce',
    category: 'Pantry',
    quantity: 2,
    estimatedPrice: 4.98,
    bestStore: 'SuperSave',
    priority: 'medium',
    completed: true,
    notes: ''
  },
  {
    id: 3,
    name: 'Sweet Potatoes',
    category: 'Produce',
    quantity: 3,
    estimatedPrice: 7.50,
    bestStore: 'FreshMart',
    priority: 'medium',
    completed: false,
    notes: 'Organic if available'
  },
  {
    id: 4,
    name: 'Heavy Cream',
    category: 'Dairy',
    quantity: 2,
    estimatedPrice: 6.98,
    bestStore: 'QuickStop',
    priority: 'medium',
    completed: false,
    notes: ''
  },
  {
    id: 5,
    name: 'Christmas Cookies',
    category: 'Bakery',
    quantity: 1,
    estimatedPrice: 12.99,
    bestStore: 'SuperSave',
    priority: 'low',
    completed: false,
    notes: 'Sugar cookies with festive decorations'
  }
];

const stores = [
  {
    name: 'FreshMart',
    distance: '0.8 miles',
    estimatedTime: '15 min',
    priceRating: 4,
    items: ['Turkey', 'Sweet Potatoes', 'Fresh Herbs'],
    savings: '$8.50'
  },
  {
    name: 'SuperSave',
    distance: '1.2 miles',
    estimatedTime: '20 min',
    priceRating: 5,
    items: ['Cranberry Sauce', 'Christmas Cookies', 'Canned Goods'],
    savings: '$15.20'
  },
  {
    name: 'QuickStop',
    distance: '0.5 miles',
    estimatedTime: '10 min',
    priceRating: 3,
    items: ['Heavy Cream', 'Last-minute items'],
    savings: '$2.30'
  }
];

const optimizedRoute = [
  {
    order: 1,
    store: 'FreshMart',
    items: ['Turkey (15-20 lbs)', 'Sweet Potatoes', 'Fresh Herbs'],
    estimatedTime: '25 min',
    distance: '0.8 mi'
  },
  {
    order: 2,
    store: 'SuperSave',
    items: ['Cranberry Sauce', 'Christmas Cookies', 'Stuffing Mix'],
    estimatedTime: '20 min',
    distance: '0.6 mi from FreshMart'
  },
  {
    order: 3,
    store: 'QuickStop',
    items: ['Heavy Cream', 'Butter'],
    estimatedTime: '10 min',
    distance: '0.4 mi from SuperSave'
  }
];

const priceComparisons = [
  {
    item: 'Turkey (15-20 lbs)',
    stores: [
      { name: 'FreshMart', price: 35.99, savings: 'Best Quality' },
      { name: 'SuperSave', price: 38.99, savings: '-$3.00' },
      { name: 'QuickStop', price: 42.99, savings: '-$7.00' }
    ]
  },
  {
    item: 'Sweet Potatoes (3 lbs)',
    stores: [
      { name: 'FreshMart', price: 7.50, savings: 'Best Price' },
      { name: 'SuperSave', price: 8.99, savings: '-$1.49' },
      { name: 'QuickStop', price: 9.50, savings: '-$2.00' }
    ]
  }
];

export function ShoppingListOptimizer({ onNavigate }: ShoppingListOptimizerProps) {
  const [activeTab, setActiveTab] = useState('list');
  const [newItem, setNewItem] = useState('');

  const totalItems = shoppingItems.length;
  const completedItems = shoppingItems.filter(item => item.completed).length;
  const totalCost = shoppingItems.reduce((sum, item) => sum + item.estimatedPrice, 0);
  const totalSavings = stores.reduce((sum, store) => sum + parseFloat(store.savings.replace('$', '')), 0);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Meat & Poultry': '🥩',
      'Produce': '🥕',
      'Dairy': '🥛',
      'Pantry': '🥫',
      'Bakery': '🍞'
    };
    return icons[category as keyof typeof icons] || '🛒';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-2xl font-medium text-gray-900">Shopping List Optimizer</h1>
              <p className="text-gray-600">Store routing & price comparison intelligence</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-medium text-gray-900">{completedItems}/{totalItems}</div>
              <div className="text-sm text-gray-600">Items Complete</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-medium text-green-600">${totalSavings.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Total Savings</div>
            </div>
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex space-x-8">
            {[
              { id: 'list', label: 'Shopping List', icon: ShoppingCart },
              { id: 'route', label: 'Optimized Route', icon: Navigation },
              { id: 'prices', label: 'Price Comparison', icon: DollarSign },
              { id: 'stores', label: 'Store Analysis', icon: MapPin }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-yellow-600 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'list' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Add Item */}
            <Card className="p-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Add new item to shopping list..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  className="flex-1"
                />
                <Button className="bg-yellow-600 hover:bg-yellow-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </Card>
            
            {/* Shopping Items */}
            <div className="grid gap-4">
              {shoppingItems.map((item, index) => (
                <Card key={item.id} className={`p-6 ${item.completed ? 'bg-green-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          item.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-green-500'
                        }`}
                      >
                        {item.completed && <Check className="w-4 h-4 text-white" />}
                      </button>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getCategoryIcon(item.category)}</span>
                        <div>
                          <h3 className={`font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.category} • Qty: {item.quantity} • Best at: {item.bestStore}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(item.priority)}`}></div>
                      
                      <div className="text-right">
                        <div className="font-medium text-gray-900">${item.estimatedPrice}</div>
                        <div className="text-sm text-gray-600">Estimated</div>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {item.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{item.notes}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'route' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-900">Optimized Shopping Route</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Total Time: 55 min
                </div>
                <div className="flex items-center gap-1">
                  <Navigation className="w-4 h-4" />
                  Total Distance: 1.8 mi
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Route Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              
              {optimizedRoute.map((stop, index) => (
                <div key={index} className="relative flex items-start gap-6 pb-8">
                  {/* Stop Number */}
                  <div className="relative z-10 w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-lg">{stop.order}</span>
                  </div>
                  
                  {/* Stop Details */}
                  <Card className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{stop.store}</h3>
                        <div className="space-y-2">
                          {stop.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-1">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {stop.estimatedTime}
                        </div>
                        <div className="text-sm text-gray-600">
                          <Navigation className="w-4 h-4 inline mr-1" />
                          {stop.distance}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            
            <Card className="p-6 bg-green-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Route Optimized!</h3>
                  <p className="text-green-700">
                    This route saves you 15 minutes and $26.00 compared to random shopping
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'prices' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-medium text-gray-900">Price Comparison Analysis</h2>
            
            {priceComparisons.map((comparison, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">{comparison.item}</h3>
                
                <div className="grid gap-3">
                  {comparison.stores.map((store, storeIndex) => (
                    <div key={storeIndex} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border">
                          <span className="text-xs font-medium">{store.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium text-gray-900">{store.name}</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-gray-900">${store.price}</span>
                        <span className={`text-sm font-medium ${
                          store.savings.includes('Best') 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {store.savings}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </motion.div>
        )}

        {activeTab === 'stores' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-medium text-gray-900">Store Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stores.map((store, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900 text-lg">{store.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < store.priceRating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">Price Rating</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 font-medium">{store.savings}</div>
                      <div className="text-xs text-gray-600">Savings</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Distance</span>
                      <span className="text-gray-900">{store.distance}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Travel Time</span>
                      <span className="text-gray-900">{store.estimatedTime}</span>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm text-gray-600 mb-2">Available Items:</div>
                      <div className="space-y-1">
                        {store.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="text-sm text-gray-700">
                            • {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}