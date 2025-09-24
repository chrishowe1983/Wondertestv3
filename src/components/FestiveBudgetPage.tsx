import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Gift,
  Palette,
  UtensilsCrossed,
  Music,
  Target,
  Search,
  Filter,
  ChevronDown,
  Users,
  Plus,
  ShoppingCart
} from 'lucide-react';
import exampleImage from 'figma:asset/de38e5f6fe2e9f1c4378b692b35c5efe73e4ab47.png';

interface FestiveBudgetPageProps {
  onNavigate: (page: string) => void;
}

export function FestiveBudgetPage({ onNavigate }: FestiveBudgetPageProps) {
  const [activeTab, setActiveTab] = useState('gifts');
  const [searchTerm, setSearchTerm] = useState('');
  const [relationshipFilter, setRelationshipFilter] = useState('All Relationships');
  const [statusFilter, setStatusFilter] = useState('All Items');
  const [sortBy, setSortBy] = useState('Due Date');

  const giftItems = [
    {
      id: 1,
      recipients: ['Alex', 'Maya'],
      relationship: 'Family',
      item: 'Educational Toys Bundle',
      description: 'Ordered online, delivery pending',
      status: 'overdue',
      dueDate: '12/15',
      price: 150,
      progress: 75,
      completed: false
    },
    {
      id: 2,
      recipients: ['Robert Johns...'],
      relationship: 'Family', 
      item: 'Golf Accessories',
      description: 'Check Dick\'s Sporting Goods for deals',
      status: 'overdue',
      dueDate: '12/18',
      price: 120,
      progress: 0,
      completed: false
    },
    {
      id: 3,
      recipients: ['Michael Chen'],
      relationship: 'Co-worker',
      item: 'Executive Desk Set',
      description: 'Professional and thoughtful',
      status: 'overdue',
      dueDate: '12/18',
      price: 60,
      progress: 25,
      completed: false
    },
    {
      id: 4,
      recipients: ['Team Member...'],
      relationship: 'Co-worker',
      item: 'Coffee Gift Cards',
      description: '5x $20 Starbucks gift cards',
      status: 'overdue',
      dueDate: '12/19',
      price: 100,
      progress: 2,
      completed: false
    },
    {
      id: 5,
      recipients: ['Sarah Johnson'],
      relationship: 'Family',
      item: 'Luxury Skincare Set',
      description: 'Already purchased and wrapped',
      status: 'complete',
      dueDate: '12/20',
      price: 85,
      progress: 100,
      completed: true
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '💰' },
    { id: 'gifts', name: 'Gifts', icon: '🎁' },
    { id: 'decorations', name: 'Decorations/Crafts', icon: '🎨' },
    { id: 'groceries', name: 'Groceries', icon: '🛒' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎭' }
  ];

  const budgetData = {
    total: 1700,
    spent: 1180,
    percentage: 69
  };

  const categories = [
    {
      id: 'gifts',
      name: 'Holiday Gifts',
      spent: 650,
      predicted: 900,
      remaining: 150,
      percentage: 81,
      color: '#EF4444',
      status: 'over',
      statusText: 'Over Budget',
      statusColor: '#DC2626'
    },
    {
      id: 'decorations',
      name: 'Decorations',
      spent: 180,
      predicted: 195,
      remaining: 20,
      percentage: 60,
      color: '#10B981',
      status: 'good',
      statusColor: '#059669'
    },
    {
      id: 'food',
      name: 'Food & Catering',
      spent: 250,
      predicted: 380,
      remaining: 130,
      percentage: 63,
      color: '#3B82F6',
      status: 'good',
      statusColor: '#2563EB'
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      spent: 100,
      predicted: 280,
      remaining: 200,
      percentage: 33,
      color: '#8B5CF6',
      status: 'good',
      statusColor: '#7C3AED'
    }
  ];

  const recommendations = [
    {
      type: 'alert',
      title: 'Gift Budget Alert',
      message: 'Consider rebalancing from Entertainment',
      icon: AlertTriangle,
      color: '#EF4444'
    },
    {
      type: 'success',
      title: 'Great Progress!',
      message: 'Decorations perfectly on track',
      icon: CheckCircle,
      color: '#10B981'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => onNavigate('christmas')}
                variant="ghost" 
                size="icon"
                className="text-gray-600 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Smart Budget Tracker</h1>
                  <p className="text-gray-500">AI-powered spending insights & alerts</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">${budgetData.spent}</div>
                <div className="text-sm text-gray-500">of ${budgetData.total} spent</div>
              </div>
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray={`${budgetData.percentage}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-semibold text-green-600">{budgetData.percentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' ? (
          <>
            {/* Budget Categories Grid */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {categories.map((category) => (
                <Card key={category.id} className="p-6 bg-white">
                  <div className="text-center mb-4">
                    <div 
                      className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center relative"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <span 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: category.color }}
                      >
                        $
                      </span>
                      {category.status === 'over' && (
                        <Badge 
                          className="absolute -top-2 -right-2 bg-red-100 text-red-800 border-red-200 text-xs px-2 py-0.5"
                        >
                          Over Budget
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span 
                        className="text-2xl font-bold"
                        style={{ color: category.color }}
                      >
                        {category.percentage}%
                      </span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 text-center mb-4">{category.name}</h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Spent</span>
                      <span className="font-medium">${category.spent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Predicted</span>
                      <span className="font-medium">${category.predicted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Remaining</span>
                      <span 
                        className="font-medium"
                        style={{ color: category.color }}
                      >
                        ${category.remaining}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min(category.percentage, 100)}%`,
                          backgroundColor: category.color 
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Solid: Current • Outline: Predicted
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Smart Recommendations */}
            <Card className="p-6 bg-white">
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Smart Recommendations</h2>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {recommendations.map((rec, index) => {
                  const Icon = rec.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50"
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${rec.color}20` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: rec.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{rec.title}</h3>
                        <p className="text-sm text-gray-600">{rec.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </>
        ) : activeTab === 'groceries' ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Track your Christmas food expenses</p>
            <Button 
              onClick={() => onNavigate('christmas-food-list')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Plan Christmas Food List
            </Button>
          </div>
        ) : activeTab === 'gifts' ? (
          <>
            {/* Holiday Gifts Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <Gift className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Holiday Gifts</h2>
                  <p className="text-sm text-gray-500">{giftItems.length} items</p>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Gift Item
              </Button>
            </div>

            {/* Filters & Sort */}
            <Card className="p-4 mb-6 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-900">Filters & Sort</span>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search gifts, names..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div className="relative">
                  <select
                    value={relationshipFilter}
                    onChange={(e) => setRelationshipFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option>All Relationships</option>
                    <option>Family</option>
                    <option>Co-worker</option>
                    <option>Friends</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option>All Items</option>
                    <option>Complete</option>
                    <option>Overdue</option>
                    <option>In Progress</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option>Due Date</option>
                    <option>Price</option>
                    <option>Progress</option>
                    <option>Name</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </Card>

            {/* Gift Items List */}
            <div className="space-y-3">
              {giftItems.map((gift) => (
                <Card key={gift.id} className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Avatar/Icon */}
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {gift.recipients.join(' & ')}
                            </span>
                            <span className="text-sm text-gray-500">
                              {gift.relationship}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{gift.description}</p>
                        </div>
                      </div>
                      
                      {/* Gift Details */}
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{gift.item}</h3>
                      </div>
                    </div>
                    
                    {/* Status & Actions */}
                    <div className="flex items-center gap-4">
                      <Badge 
                        className={`${
                          gift.status === 'overdue' 
                            ? 'bg-red-100 text-red-800 border-red-200' 
                            : 'bg-gray-900 text-white'
                        }`}
                      >
                        {gift.status === 'overdue' ? 'Overdue' : 'Complete'}
                      </Badge>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{gift.dueDate}</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-medium text-gray-900">${gift.price}</div>
                      </div>
                      
                      <div className="w-20">
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${gift.progress}%`,
                              backgroundColor: gift.progress === 100 ? '#10B981' : '#EF4444'
                            }}
                          />
                        </div>
                        <div className="text-xs text-center text-gray-500">{gift.progress}%</div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Shop
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Content for {activeTab} tab coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}