import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, Search, Star, Filter, Heart, ShoppingCart, Clock, Truck, DollarSign, Gift, TrendingDown, TrendingUp, Zap, Brain, AlertCircle, Calendar, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface OnlineGiftOrderingPageProps {
  onNavigate: (page: string) => void;
}

const giftCategories = [
  { name: 'Electronics', icon: '📱', count: 245, color: '#3b82f6' },
  { name: 'Fashion', icon: '👗', count: 189, color: '#ec4899' },
  { name: 'Home & Garden', icon: '🏠', count: 156, color: '#10b981' },
  { name: 'Books & Media', icon: '📚', count: 98, color: '#f59e0b' },
  { name: 'Toys & Games', icon: '🎮', count: 167, color: '#8b5cf6' },
  { name: 'Beauty & Health', icon: '💄', count: 134, color: '#ef4444' }
];

const featuredDeals = [
  {
    id: 1,
    name: 'Smart Watch Series 9',
    price: '$299.99',
    originalPrice: '$399.99',
    discount: '25% OFF',
    rating: 4.8,
    reviews: 1247,
    image: '⌚',
    shippingDate: 'Dec 20',
    category: 'Electronics',
    priceHistory: [450, 420, 380, 350, 299],
    predictedPrice: 279,
    priceAlert: 'Price expected to drop $20 in 3 days',
    stockLevel: 'Low',
    demandTrend: 'rising'
  },
  {
    id: 2,
    name: 'Cozy Winter Blanket Set',
    price: '$79.99',
    originalPrice: '$119.99',
    discount: '33% OFF',
    rating: 4.9,
    reviews: 892,
    image: '🛋️',
    shippingDate: 'Dec 18',
    category: 'Home & Garden',
    priceHistory: [120, 110, 95, 85, 79],
    predictedPrice: 85,
    priceAlert: 'Best price of the season - Buy now!',
    stockLevel: 'Medium',
    demandTrend: 'stable'
  },
  {
    id: 3,
    name: 'Premium Coffee Gift Set',
    price: '$49.99',
    originalPrice: '$69.99',
    discount: '29% OFF',
    rating: 4.7,
    reviews: 634,
    image: '☕',
    shippingDate: 'Dec 19',
    category: 'Food & Drink',
    priceHistory: [70, 65, 60, 55, 49],
    predictedPrice: 52,
    priceAlert: 'Great deal - 15% below average',
    stockLevel: 'High',
    demandTrend: 'falling'
  },
  {
    id: 4,
    name: 'Wireless Earbuds Pro',
    price: '$159.99',
    originalPrice: '$199.99',
    discount: '20% OFF',
    rating: 4.6,
    reviews: 2156,
    image: '🎧',
    shippingDate: 'Dec 21',
    category: 'Electronics',
    priceHistory: [200, 190, 180, 170, 159],
    predictedPrice: 149,
    priceAlert: 'Price likely to drop further',
    stockLevel: 'High',
    demandTrend: 'stable'
  }
];

const quickFilters = [
  { label: 'Under $25', active: false },
  { label: '$25-$50', active: true },
  { label: '$50-$100', active: false },
  { label: 'Free Shipping', active: false },
  { label: 'Gift Wrap Available', active: false }
];

export function OnlineGiftOrderingPage({ onNavigate }: OnlineGiftOrderingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showAiInsights, setShowAiInsights] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);

  const startAiPriceAnalysis = () => {
    setAiAnalyzing(true);
    setTimeout(() => {
      setAiAnalyzing(false);
      setShowAiInsights(true);
    }, 2500);
  };

  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1F2937] text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('christmas-spark-interface')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Christmas Planning
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Online Gift Ordering</h1>
              <p className="text-white/80">Find and order the perfect gifts with guaranteed delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Price Intelligence Module */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 p-6">
        <div className="max-w-6xl mx-auto">
          <Card className="p-6 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Price Oracle</h3>
                  <p className="text-sm text-gray-600">Real-time price predictions & deal alerts</p>
                </div>
              </div>
              {!showAiInsights && !aiAnalyzing && (
                <Button 
                  onClick={startAiPriceAnalysis}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Activate AI Analysis
                </Button>
              )}
            </div>

            {aiAnalyzing && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white animate-pulse" />
                </div>
                <p className="text-gray-600">AI analyzing millions of price points and trends...</p>
              </div>
            )}

            {showAiInsights && (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <TrendingDown className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900">Price Drop Alert</h4>
                  <p className="text-sm text-gray-600">3 items in your wishlist will drop by 15% this week</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">Save $47</Badge>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900">Best Time to Buy</h4>
                  <p className="text-sm text-gray-600">Electronics are 23% cheaper on Thursday afternoons</p>
                  <Badge className="mt-2 bg-blue-100 text-blue-800">Optimal Timing</Badge>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900">Seasonal Insight</h4>
                  <p className="text-sm text-gray-600">Prices will spike 40% after Dec 20th</p>
                  <Badge className="mt-2 bg-orange-100 text-orange-800">Buy Now</Badge>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for gifts, brands, or recipients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="h-12">
                <Filter className="w-4 h-4 mr-2" />
                AI Filters
              </Button>
              <Button variant="outline" className="h-12">
                <Clock className="w-4 h-4 mr-2" />
                Delivery by Dec 24
              </Button>
            </div>
          </div>
          
          {/* Quick Filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {quickFilters.map((filter, index) => (
              <Badge 
                key={index}
                variant={filter.active ? "default" : "secondary"}
                className="whitespace-nowrap cursor-pointer hover:bg-gray-200"
              >
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Shop by Category</h3>
              <div className="space-y-3">
                {giftCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <div className="flex-grow text-left">
                      <div className="font-medium text-gray-900">{category.name}</div>
                      <div className="text-sm text-gray-500">{category.count} items</div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Shipping Info */}
            <Card className="p-6 mt-6 bg-green-50 border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-900">Fast Delivery</h4>
              </div>
              <p className="text-sm text-green-800">
                Order by Dec 21 for guaranteed Christmas delivery!
              </p>
            </Card>
          </div>

          {/* Main Content - Product Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Featured Holiday Deals</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{featuredDeals.length} results</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {featuredDeals.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="h-48 bg-gray-100 flex items-center justify-center text-6xl">
                      {item.image}
                    </div>
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        favorites.includes(item.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={favorites.includes(item.id) ? 'currentColor' : 'none'} />
                    </button>
                    <Badge className="absolute top-3 left-3 bg-red-500">
                      {item.discount}
                    </Badge>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-2">
                      <Badge variant="secondary" className="text-xs mb-2">{item.category}</Badge>
                      <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({item.reviews})</span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-semibold text-gray-900">{item.price}</span>
                        <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                      </div>
                      
                      {/* AI Price Insights */}
                      <div className="flex items-center gap-2 mb-2">
                        {item.demandTrend === 'rising' && <TrendingUp className="w-4 h-4 text-red-500" />}
                        {item.demandTrend === 'falling' && <TrendingDown className="w-4 h-4 text-green-500" />}
                        <span className="text-xs text-gray-600">{item.priceAlert}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">AI Predicted: ${item.predictedPrice}</span>
                        <Badge 
                          variant="secondary" 
                          className={`${
                            item.stockLevel === 'Low' ? 'bg-red-100 text-red-700' :
                            item.stockLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}
                        >
                          {item.stockLevel} Stock
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <Truck className="w-4 h-4" />
                        <span>Arrives {item.shippingDate}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Gift className="w-4 h-4 mr-1" />
                        Gift Wrap
                      </Button>
                      <Button size="sm" className="bg-[#1F2937] hover:bg-[#374151]">
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}