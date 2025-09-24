import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, DollarSign, TrendingUp, AlertCircle, Plus, Target, Calendar, CreditCard, Zap, BarChart3, PieChart, Settings, Lightbulb, TrendingDown, List, ExternalLink, Clock, ShoppingCart } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { PieChart as RechartsPie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

interface SmartBudgetTrackerProps {
  onNavigate: (page: string) => void;
}

const initialBudgetCategories = [
  {
    id: 'gifts',
    name: 'Holiday Gifts',
    budgeted: 800,
    spent: 650,
    remaining: 150,
    color: '#F05959',
    lightColor: 'bg-red-100',
    textColor: 'text-[#F05959]',
    trend: 'up',
    lastWeekSpent: 200,
    predictedTotal: 900
  },
  {
    id: 'decorations',
    name: 'Decorations',
    budgeted: 200,
    spent: 180,
    remaining: 20,
    color: '#57C289',
    lightColor: 'bg-green-100',
    textColor: 'text-[#57C289]',
    trend: 'stable',
    lastWeekSpent: 45,
    predictedTotal: 195
  },
  {
    id: 'food',
    name: 'Food & Catering',
    budgeted: 400,
    spent: 250,
    remaining: 150,
    color: '#0F73FF',
    lightColor: 'bg-blue-100',
    textColor: 'text-[#0F73FF]',
    trend: 'down',
    lastWeekSpent: 80,
    predictedTotal: 380
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    budgeted: 300,
    spent: 100,
    remaining: 200,
    color: '#9333EA',
    lightColor: 'bg-purple-100',
    textColor: 'text-purple-500',
    trend: 'up',
    lastWeekSpent: 60,
    predictedTotal: 280
  }
];

const spendingTrendData = [
  { week: 'Week 1', gifts: 150, decorations: 80, food: 90, entertainment: 40 },
  { week: 'Week 2', gifts: 200, decorations: 45, food: 75, entertainment: 30 },
  { week: 'Week 3', gifts: 100, decorations: 35, food: 65, entertainment: 15 },
  { week: 'Week 4', gifts: 200, decorations: 20, food: 20, entertainment: 15 }
];

const optimizationSuggestions = [
  {
    id: 1,
    type: 'rebalance',
    title: 'Budget Rebalancing Opportunity',
    description: 'Transfer $75 from Entertainment to Holiday Gifts to avoid overspending',
    impact: '+15% gift budget flexibility',
    priority: 'high',
    savings: 75,
    action: 'rebalance'
  },
  {
    id: 2,
    type: 'prediction',
    title: 'Spending Pattern Alert',
    description: 'Based on your trends, you\'ll exceed gift budget by $100 in final week',
    impact: 'Prevent $100 overspend',
    priority: 'high',
    savings: 100,
    action: 'adjust'
  },
  {
    id: 3,
    type: 'opportunity',
    title: 'Early Shopping Bonus',
    description: 'Complete 80% of gift shopping before Dec 20th to save 15% on average',
    impact: 'Save ~$120 on remaining gifts',
    priority: 'medium',
    savings: 120,
    action: 'schedule'
  },
  {
    id: 4,
    type: 'efficiency',
    title: 'Category Optimization',
    description: 'Your decoration spending is 10% under budget - perfect efficiency!',
    impact: 'On track for $20 savings',
    priority: 'low',
    savings: 20,
    action: 'maintain'
  }
];

const smartAlerts = [
  {
    icon: AlertCircle,
    title: 'Budget Alert',
    message: 'You\'re approaching your gift budget limit (81% used)',
    type: 'warning',
    color: 'text-orange-500',
    bg: 'bg-orange-100'
  },
  {
    icon: TrendingUp,
    title: 'Smart Suggestion',
    message: 'Consider shifting $50 from Entertainment to Gifts',
    type: 'suggestion',
    color: 'text-blue-500',
    bg: 'bg-blue-100'
  },
  {
    icon: CheckCircle,
    title: 'Great Progress',
    message: 'You\'re 25% under budget on decorations!',
    type: 'success',
    color: 'text-green-500',
    bg: 'bg-green-100'
  }
];

const upcomingExpenses = [
  {
    date: 'Dec 15',
    item: 'Gift wrapping supplies',
    amount: 45,
    category: 'Decorations'
  },
  {
    date: 'Dec 18',
    item: 'Christmas dinner ingredients',
    amount: 120,
    category: 'Food & Catering'
  },
  {
    date: 'Dec 20',
    item: 'Last-minute gifts',
    amount: 150,
    category: 'Holiday Gifts'
  }
];

const projectLineItems = [
  // Holiday Gifts Category
  {
    id: 'gift-mom',
    category: 'Holiday Gifts',
    categoryColor: '#F05959',
    item: 'Mom - Luxury Skincare Set',
    dueDate: '2024-12-20',
    estimatedCost: 85,
    progress: 100,
    completed: true,
    hasShopLink: false,
    notes: 'Already purchased and wrapped'
  },
  {
    id: 'gift-dad',
    category: 'Holiday Gifts',
    categoryColor: '#F05959',
    item: 'Dad - Golf Accessories',
    dueDate: '2024-12-18',
    estimatedCost: 120,
    progress: 0,
    completed: false,
    hasShopLink: true,
    shopUrl: 'https://amazon.com',
    notes: 'Check Dick\'s Sporting Goods for deals'
  },
  {
    id: 'gift-sister',
    category: 'Holiday Gifts',
    categoryColor: '#F05959',
    item: 'Sister - Designer Handbag',
    dueDate: '2024-12-22',
    estimatedCost: 200,
    progress: 50,
    completed: false,
    hasShopLink: true,
    shopUrl: 'https://nordstrom.com',
    notes: 'Waiting for Black Friday sale'
  },
  {
    id: 'gift-kids',
    category: 'Holiday Gifts',
    categoryColor: '#F05959',
    item: 'Kids - Educational Toys Bundle',
    dueDate: '2024-12-15',
    estimatedCost: 150,
    progress: 75,
    completed: false,
    hasShopLink: true,
    shopUrl: 'https://target.com',
    notes: 'Ordered online, delivery pending'
  },
  {
    id: 'gift-coworkers',
    category: 'Holiday Gifts',
    categoryColor: '#F05959',
    item: 'Coworkers - Gift Cards (5x)',
    dueDate: '2024-12-19',
    estimatedCost: 100,
    progress: 0,
    completed: false,
    hasShopLink: true,
    shopUrl: 'https://starbucks.com',
    notes: 'Starbucks gift cards'
  },
  
  // Decorations Category
  {
    id: 'dec-tree',
    category: 'Decorations',
    categoryColor: '#57C289',
    item: 'Christmas Tree & Stand',
    dueDate: '2024-12-10',
    estimatedCost: 60,
    progress: 100,
    completed: true,
    hasShopLink: false,
    notes: 'Beautiful 7ft Fraser Fir purchased'
  },
  {
    id: 'dec-lights',
    category: 'Decorations',
    categoryColor: '#57C289',
    item: 'LED String Lights (Indoor)',
    dueDate: '2024-12-12',
    estimatedCost: 35,
    progress: 100,
    completed: true,
    hasShopLink: false,
    notes: 'Warm white LEDs installed'
  },
  {
    id: 'dec-outdoor',
    category: 'Decorations',
    categoryColor: '#57C289',
    item: 'Outdoor Light Display',
    dueDate: '2024-12-08',
    estimatedCost: 75,
    progress: 80,
    completed: false,
    hasShopLink: true,
    shopUrl: 'https://homedepot.com',
    notes: 'Need roof clips for final installation'
  },
  {
    id: 'dec-wreath',
    category: 'Decorations',
    categoryColor: '#57C289',
    item: 'Front Door Wreath',
    dueDate: '2024-12-14',
    estimatedCost: 25,
    progress: 0,
    completed: false,
    hasShopLink: true,
    shopUrl: 'https://lowes.com',
    notes: 'Fresh wreath from garden center'
  },
  
  // Food & Catering Category
  {
    id: 'food-turkey',
    category: 'Food & Catering',
    categoryColor: '#0F73FF',
    item: 'Christmas Ham (12-15 lbs)',
    dueDate: '2024-12-22',
    estimatedCost: 80,
    progress: 0,
    completed: false,
    hasShopLink: true,
    shopUrl: 'https://wholefoodsmarket.com',
    notes: 'Pre-order from Whole Foods'
  },
  {
    id: 'food-sides',
    category: 'Food & Catering',
    categoryColor: '#0F73FF',
    item: 'Side Dishes Ingredients',
    dueDate: '2024-12-23',
    estimatedCost: 65,
    progress: 25,
    completed: false,
    hasShopLink: true,
    shopUrl: 'https://instacart.com',
    notes: 'Potatoes, vegetables, stuffing mix'
  },
  {
    id: 'food-dessert',
    category: 'Food & Catering',
    categoryColor: '#0F73FF',
    item: 'Christmas Desserts',
    dueDate: '2024-12-24',
    estimatedCost: 45,
    progress: 0,
    completed: false,
    hasShopLink: false,
    notes: 'Homemade pies and cookies'
  },
  {
    id: 'food-drinks',
    category: 'Food & Catering',
    categoryColor: '#0F73FF',
    item: 'Holiday Beverages',
    dueDate: '2024-12-20',
    estimatedCost: 60,
    progress: 50,
    completed: false,
    hasShopLink: true,
    shopUrl: 'https://totalwine.com',
    notes: 'Wine, eggnog, hot chocolate'
  },
  
  // Entertainment Category
  {
    id: 'ent-games',
    category: 'Entertainment',
    categoryColor: '#9333EA',
    item: 'Family Board Games',
    dueDate: '2024-12-16',
    estimatedCost: 55,
    progress: 100,
    completed: true,
    hasShopLink: false,
    notes: 'Ticket to Ride & Azul purchased'
  },
  {
    id: 'ent-movies',
    category: 'Entertainment',
    categoryColor: '#9333EA',
    item: 'Holiday Movie Collection',
    dueDate: '2024-12-10',
    estimatedCost: 25,
    progress: 100,
    completed: true,
    hasShopLink: false,
    notes: 'Digital downloads completed'
  },
  {
    id: 'ent-music',
    category: 'Entertainment',
    categoryColor: '#9333EA',
    item: 'Christmas Playlist & Speakers',
    dueDate: '2024-12-12',
    estimatedCost: 35,
    progress: 90,
    completed: false,
    hasShopLink: false,
    notes: 'Playlist ready, testing speakers'
  }
];

export function SmartBudgetTracker({ onNavigate }: SmartBudgetTrackerProps) {
  const [activeTab, setActiveTab] = useState('project-hub');
  const [budgetCategories, setBudgetCategories] = useState(initialBudgetCategories);
  const [optimizedBudgets, setOptimizedBudgets] = useState<{[key: string]: number}>({});
  const [lineItems, setLineItems] = useState(projectLineItems);
  
  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;
  const spentPercentage = (totalSpent / totalBudgeted) * 100;
  const totalPredicted = budgetCategories.reduce((sum, cat) => sum + cat.predictedTotal, 0);
  const potentialSavings = optimizationSuggestions.reduce((sum, suggestion) => sum + suggestion.savings, 0);

  // Chart data
  const pieChartData = budgetCategories.map(cat => ({
    name: cat.name,
    value: cat.spent,
    color: cat.color
  }));

  const handleBudgetAdjustment = (categoryId: string, newBudget: number) => {
    setBudgetCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, budgeted: newBudget, remaining: newBudget - cat.spent }
          : cat
      )
    );
    setOptimizedBudgets(prev => ({ ...prev, [categoryId]: newBudget }));
  };

  const applyOptimization = (suggestion: any) => {
    if (suggestion.action === 'rebalance' && suggestion.id === 1) {
      // Transfer $75 from Entertainment to Holiday Gifts
      setBudgetCategories(prev => 
        prev.map(cat => {
          if (cat.id === 'entertainment') {
            return { ...cat, budgeted: cat.budgeted - 75, remaining: (cat.budgeted - 75) - cat.spent };
          }
          if (cat.id === 'gifts') {
            return { ...cat, budgeted: cat.budgeted + 75, remaining: (cat.budgeted + 75) - cat.spent };
          }
          return cat;
        })
      );
    }
  };

  const toggleItemCompletion = (itemId: string) => {
    setLineItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, completed: !item.completed, progress: !item.completed ? 100 : item.progress }
          : item
      )
    );
  };

  const getProgressColor = (progress: number, completed: boolean) => {
    if (completed) return 'text-[#57C289]';
    if (progress >= 75) return 'text-[#57C289]';
    if (progress >= 50) return 'text-[#0F73FF]';
    if (progress >= 25) return 'text-yellow-500';
    return 'text-[#F05959]';
  };

  const getProgressBg = (progress: number, completed: boolean) => {
    if (completed) return 'bg-[#57C289]';
    if (progress >= 75) return 'bg-[#57C289]';
    if (progress >= 50) return 'bg-[#0F73FF]';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-[#F05959]';
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !lineItems.find(item => item.dueDate === dueDate)?.completed;
  };

  // Calculate project hub stats
  const totalItems = lineItems.length;
  const completedItems = lineItems.filter(item => item.completed).length;
  const overdueItems = lineItems.filter(item => isOverdue(item.dueDate) && !item.completed).length;
  const totalProjectCost = lineItems.reduce((sum, item) => sum + item.estimatedCost, 0);
  const completedProjectCost = lineItems.filter(item => item.completed).reduce((sum, item) => sum + item.estimatedCost, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#57C289]" />
            </div>
            <div>
              <h1 className="text-2xl font-medium text-gray-900">Smart Budget Tracker</h1>
              <p className="text-gray-600">AI-powered spending insights & alerts</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-medium text-gray-900">${totalSpent.toLocaleString()}</div>
              <div className="text-sm text-gray-600">of ${totalBudgeted.toLocaleString()} spent</div>
            </div>
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - spentPercentage / 100)}`}
                  className={spentPercentage > 80 ? 'text-[#F05959]' : 'text-[#57C289]'}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium">{Math.round(spentPercentage)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Header Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-medium text-gray-900">${totalSpent.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-gray-900">${totalRemaining.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-[#F05959]">${totalPredicted.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Predicted Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-[#57C289]">${potentialSavings}</div>
            <div className="text-sm text-gray-600">Potential Savings</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex space-x-8">
            {[
              { id: 'project-hub', label: 'Project Hub', icon: List },
              { id: 'overview', label: 'Overview', icon: DollarSign },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'optimizer', label: 'AI Optimizer', icon: Zap },
              { id: 'categories', label: 'Categories', icon: Target },
              { id: 'insights', label: 'Insights', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#57C289] text-[#57C289]'
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
        {activeTab === 'project-hub' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-900 flex items-center gap-2">
                <List className="w-6 h-6 text-[#0F73FF]" />
                Project Management Hub
              </h2>
              <div className="flex items-center gap-4">
                <Button className="bg-[#57C289] hover:bg-green-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#0F73FF]" />
                  </div>
                  <div>
                    <div className="text-2xl font-medium text-gray-900">{completedItems}/{totalItems}</div>
                    <div className="text-sm text-gray-600">Items Complete</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#F05959]" />
                  </div>
                  <div>
                    <div className="text-2xl font-medium text-[#F05959]">{overdueItems}</div>
                    <div className="text-sm text-gray-600">Overdue Items</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-[#57C289]" />
                  </div>
                  <div>
                    <div className="text-2xl font-medium text-gray-900">${completedProjectCost}</div>
                    <div className="text-sm text-gray-600">Completed Value</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-medium text-gray-900">${totalProjectCost}</div>
                    <div className="text-sm text-gray-600">Total Budget</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Project Items Table */}
            <Card className="overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">All Project Items</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Item
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Due Date
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Cost
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lineItems.map((item) => (
                      <tr key={item.id} className={`hover:bg-gray-50 ${item.completed ? 'opacity-75' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleItemCompletion(item.id)}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                item.completed
                                  ? 'bg-[#57C289] border-[#57C289] text-white'
                                  : 'border-gray-300 hover:border-[#57C289]'
                              }`}
                            >
                              {item.completed && <CheckCircle className="w-3 h-3" />}
                            </button>
                            <div>
                              <div className={`font-medium ${
                                item.completed ? 'line-through text-gray-500' : 'text-gray-900'
                              }`}>
                                {item.item}
                              </div>
                              {item.notes && (
                                <div className="text-sm text-gray-500 mt-1">{item.notes}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: item.categoryColor }}
                          >
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm ${
                              isOverdue(item.dueDate) && !item.completed
                                ? 'text-[#F05959] font-medium'
                                : 'text-gray-900'
                            }`}>
                              {new Date(item.dueDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                            {isOverdue(item.dueDate) && !item.completed && (
                              <AlertCircle className="w-4 h-4 text-[#F05959]" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">
                            ${item.estimatedCost}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[80px]">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  getProgressBg(item.progress, item.completed)
                                }`}
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                            <span className={`text-sm font-medium ${
                              getProgressColor(item.progress, item.completed)
                            }`}>
                              {item.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {item.hasShopLink && (
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(item.shopUrl, '_blank')}
                                className="border-[#0F73FF] text-[#0F73FF] hover:bg-[#0F73FF] hover:text-white"
                              >
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Shop
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Enhanced Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {budgetCategories.map((category, index) => (
                <Card key={category.name} className="p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 ${category.lightColor} rounded-full flex items-center justify-center`}>
                      <DollarSign className={`w-5 h-5 ${category.textColor}`} />
                    </div>
                    <div className="flex items-center gap-2">
                      {category.trend === 'up' && <TrendingUp className="w-4 h-4 text-[#F05959]" />}
                      {category.trend === 'down' && <TrendingDown className="w-4 h-4 text-[#57C289]" />}
                      {category.trend === 'stable' && <Target className="w-4 h-4 text-gray-500" />}
                      <span className={`text-sm ${category.textColor} font-medium`}>
                        {Math.round((category.spent / category.budgeted) * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mb-2">{category.name}</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Spent</span>
                      <span className="font-medium">${category.spent}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Predicted</span>
                      <span className={`font-medium ${category.predictedTotal > category.budgeted ? 'text-[#F05959]' : 'text-gray-900'}`}>
                        ${category.predictedTotal}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Remaining</span>
                      <span className={`font-medium ${category.remaining < 50 ? 'text-[#F05959]' : 'text-[#57C289]'}`}>
                        ${category.remaining}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-3 relative">
                      <div
                        className="h-3 rounded-full"
                        style={{ 
                          width: `${(category.spent / category.budgeted) * 100}%`,
                          background: category.color
                        }}
                      />
                      {/* Predicted spending overlay */}
                      <div
                        className="absolute top-0 h-3 rounded-full opacity-50 border-2 border-gray-400"
                        style={{ 
                          width: `${Math.min((category.predictedTotal / category.budgeted) * 100, 100)}%`,
                          background: 'transparent'
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Solid: Current • Outline: Predicted
                    </div>
                  </div>
                  
                  {/* Smart badge */}
                  {category.predictedTotal > category.budgeted && (
                    <Badge variant="destructive" className="absolute top-2 right-2 text-xs">
                      Over Budget
                    </Badge>
                  )}
                  {category.predictedTotal < category.budgeted * 0.9 && (
                    <Badge variant="secondary" className="absolute top-2 right-2 text-xs bg-[#57C289] text-white">
                      Under Budget
                    </Badge>
                  )}
                </Card>
              ))}
            </div>

            {/* Quick Smart Suggestions */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-[#0F73FF]" />
                <h3 className="font-medium text-gray-900">Smart Recommendations</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <AlertCircle className="w-5 h-5 text-[#F05959]" />
                  <div>
                    <div className="font-medium text-sm">Gift Budget Alert</div>
                    <div className="text-xs text-gray-600">Consider rebalancing from Entertainment</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#57C289]" />
                  <div>
                    <div className="font-medium text-sm">Great Progress!</div>
                    <div className="text-xs text-gray-600">Decorations perfectly on track</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-medium text-gray-900">Visual Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <Card className="p-6">
                <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#0F73FF]" />
                  Spending Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {pieChartData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Weekly Trends */}
              <Card className="p-6">
                <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#57C289]" />
                  Weekly Spending Trends
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={spendingTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="gifts" fill="#F05959" />
                      <Bar dataKey="food" fill="#0F73FF" />
                      <Bar dataKey="decorations" fill="#57C289" />
                      <Bar dataKey="entertainment" fill="#9333EA" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Prediction Chart */}
            <Card className="p-6">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#F05959]" />
                Budget vs Predicted Spending
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetCategories.map(cat => ({
                    category: cat.name,
                    budgeted: cat.budgeted,
                    spent: cat.spent,
                    predicted: cat.predictedTotal
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="budgeted" fill="#E5E7EB" name="Budgeted" />
                    <Bar dataKey="spent" fill="#6B7280" name="Spent" />
                    <Bar dataKey="predicted" fill="#F05959" name="Predicted" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'optimizer' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-900 flex items-center gap-2">
                <Zap className="w-6 h-6 text-[#0F73FF]" />
                AI Budget Optimizer
              </h2>
              <Badge className="bg-[#0F73FF] text-white">
                {optimizationSuggestions.length} Suggestions
              </Badge>
            </div>

            {/* Interactive Budget Adjusters */}
            <Card className="p-6">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#57C289]" />
                Smart Budget Adjustments
              </h3>
              <div className="space-y-6">
                {budgetCategories.map((category) => (
                  <div key={category.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{category.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          ${optimizedBudgets[category.id] || category.budgeted}
                        </span>
                        <Badge variant={category.predictedTotal > category.budgeted ? "destructive" : "secondary"}>
                          {category.predictedTotal > category.budgeted ? "Over" : "On Track"}
                        </Badge>
                      </div>
                    </div>
                    <Slider
                      value={[optimizedBudgets[category.id] || category.budgeted]}
                      onValueChange={(value) => handleBudgetAdjustment(category.id, value[0])}
                      min={0}
                      max={1200}
                      step={25}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>$0</span>
                      <span>Current: ${category.spent} spent</span>
                      <span>$1200</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Optimization Suggestions */}
            <div className="space-y-4">
              {optimizationSuggestions.map((suggestion) => (
                <Card key={suggestion.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        suggestion.priority === 'high' ? 'bg-red-100' :
                        suggestion.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                      }`}>
                        {suggestion.type === 'rebalance' && <Target className="w-5 h-5 text-[#F05959]" />}
                        {suggestion.type === 'prediction' && <TrendingUp className="w-5 h-5 text-[#F05959]" />}
                        {suggestion.type === 'opportunity' && <Lightbulb className="w-5 h-5 text-[#0F73FF]" />}
                        {suggestion.type === 'efficiency' && <CheckCircle className="w-5 h-5 text-[#57C289]" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-gray-900">{suggestion.title}</h3>
                          <Badge variant={suggestion.priority === 'high' ? "destructive" : 
                                         suggestion.priority === 'medium' ? "default" : "secondary"}>
                            {suggestion.priority} priority
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{suggestion.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-[#57C289] font-medium">{suggestion.impact}</span>
                          <span className="text-[#0F73FF] font-medium">Save ${suggestion.savings}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => applyOptimization(suggestion)}
                      className="bg-[#0F73FF] hover:bg-[#0D5FD9] text-white"
                      size="sm"
                    >
                      Apply
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Optimization Summary */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-[#57C289]">
              <div className="text-center">
                <h3 className="font-medium text-gray-900 mb-2">Total Optimization Potential</h3>
                <div className="text-3xl font-medium text-[#57C289] mb-2">${potentialSavings}</div>
                <p className="text-gray-600">Apply all suggestions to optimize your budget</p>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'insights' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-medium text-gray-900 mb-6">AI-Powered Insights</h2>
            
            {smartAlerts.map((alert, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 ${alert.bg} rounded-full flex items-center justify-center`}>
                    <alert.icon className={`w-5 h-5 ${alert.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{alert.title}</h3>
                    <p className="text-gray-600">{alert.message}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </motion.div>
        )}

        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-900">Budget Categories</h2>
              <Button className="bg-[#57C289] hover:bg-green-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
            
            <div className="grid gap-4">
              {budgetCategories.map((category, index) => (
                <Card key={category.name} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${category.lightColor} rounded-full flex items-center justify-center`}>
                        <CreditCard className={`w-6 h-6 ${category.textColor}`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-600">
                          ${category.spent} of ${category.budgeted} spent
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="font-medium text-gray-900">
                          ${category.remaining}
                        </div>
                        <div className="text-xs text-gray-600">Remaining</div>
                      </div>
                      
                      <div className="w-24">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${category.color}`}
                            style={{ width: `${Math.min((category.spent / category.budgeted) * 100, 100)}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-600 mt-1 text-center">
                          {Math.round((category.spent / category.budgeted) * 100)}%
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}