import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, DollarSign, TrendingUp, AlertCircle, Plus, Target, Calendar, CreditCard, Zap, BarChart3, PieChart, Settings, Lightbulb, TrendingDown, ExternalLink, Clock, ShoppingCart, Gift, TreePine, Utensils, Music, Filter, ArrowUpDown, Search, CheckCircle2, User, Users, ChevronDown } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
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
    item: 'Luxury Skincare Set',
    personName: 'Sarah Johnson',
    relationship: 'Family',
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
    item: 'Golf Accessories',
    personName: 'Robert Johnson',
    relationship: 'Family',
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
    item: 'Designer Handbag',
    personName: 'Emily Johnson',
    relationship: 'Family',
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
    item: 'Educational Toys Bundle',
    personName: 'Alex & Maya',
    relationship: 'Family',
    dueDate: '2024-12-15',
    estimatedCost: 150,
    progress: 75,
    completed: false,
    hasShopLink: true,
    shopUrl: 'https://target.com',
    notes: 'Ordered online, delivery pending'
  },
  {
    id: 'gift-friend-1',
    category: 'Holiday Gifts',
    categoryColor: '#F05959',
    item: 'Wine & Cheese Gift Set',
    personName: 'Jessica Miller',
    relationship: 'Friends',
    dueDate: '2024-12-21',
    estimatedCost: 75,
    progress: 0,
    completed: false,
    hasShopLink: true,
    shopUrl: 'https://williams-sonoma.com',
    notes: 'Anniversary of friendship gift'
  },
  {
    id: 'gift-neighbor-1',
    category: 'Holiday Gifts',
    categoryColor: '#F05959',
    item: 'Holiday Candle Set',
    personName: 'Mrs. Thompson',
    relationship: 'Neighbours',
    dueDate: '2024-12-20',
    estimatedCost: 35,
    progress: 100,
    completed: true,
    hasShopLink: false,
    notes: 'Sweet elderly neighbor upstairs'
  },
  {
    id: 'gift-neighbor-2',
    category: 'Holiday Gifts',
    categoryColor: '#F05959',
    item: 'Gourmet Cookie Tin',
    personName: 'The Martins',
    relationship: 'Neighbours',
    dueDate: '2024-12-22',
    estimatedCost: 40,
    progress: 0,
    completed: false,
    hasShopLink: true,
    shopUrl: 'https://costco.com',
    notes: 'Family next door with kids'
  },
  {
    id: 'gift-coworkers',
    category: 'Holiday Gifts',
    categoryColor: '#F05959',
    item: 'Coffee Gift Cards',
    personName: 'Team Members',
    relationship: 'Co-workers',
    dueDate: '2024-12-19',
    estimatedCost: 100,
    progress: 0,
    completed: false,
    hasShopLink: true,
    shopUrl: 'https://starbucks.com',
    notes: '5x $20 Starbucks gift cards'
  },
  {
    id: 'gift-boss',
    category: 'Holiday Gifts',
    categoryColor: '#F05959',
    item: 'Executive Desk Set',
    personName: 'Michael Chen',
    relationship: 'Co-workers',
    dueDate: '2024-12-18',
    estimatedCost: 60,
    progress: 25,
    completed: false,
    hasShopLink: true,
    shopUrl: 'https://staples.com',
    notes: 'Professional and thoughtful'
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

// Retailer mapping for different gift categories
const giftRetailers = {
  skincare: [
    { name: 'Sephora', url: 'https://sephora.com?ref=wonderlist', icon: '💄' },
    { name: 'Ulta Beauty', url: 'https://ulta.com?ref=wonderlist', icon: '✨' },
    { name: 'Nordstrom', url: 'https://nordstrom.com?ref=wonderlist', icon: '🛍️' },
    { name: 'Amazon Beauty', url: 'https://amazon.com/beauty?ref=wonderlist', icon: '📦' }
  ],
  golf: [
    { name: "Dick's Sporting Goods", url: 'https://dickssportinggoods.com?ref=wonderlist', icon: '⛳' },
    { name: 'Golf Galaxy', url: 'https://golfgalaxy.com?ref=wonderlist', icon: '🏌️' },
    { name: 'PGA Tour Shop', url: 'https://pgatourshop.com?ref=wonderlist', icon: '🏆' },
    { name: 'Amazon Sports', url: 'https://amazon.com/sports?ref=wonderlist', icon: '📦' }
  ],
  handbag: [
    { name: 'Nordstrom', url: 'https://nordstrom.com?ref=wonderlist', icon: '👜' },
    { name: 'Coach', url: 'https://coach.com?ref=wonderlist', icon: '🎒' },
    { name: 'Kate Spade', url: 'https://katespade.com?ref=wonderlist', icon: '💼' },
    { name: 'Amazon Fashion', url: 'https://amazon.com/fashion?ref=wonderlist', icon: '📦' }
  ],
  toys: [
    { name: 'Target', url: 'https://target.com?ref=wonderlist', icon: '🎯' },
    { name: 'Toys"R"Us', url: 'https://toysrus.com?ref=wonderlist', icon: '🧸' },
    { name: 'Amazon Toys', url: 'https://amazon.com/toys?ref=wonderlist', icon: '📦' },
    { name: 'Walmart', url: 'https://walmart.com?ref=wonderlist', icon: '🛒' }
  ],
  wine: [
    { name: 'Williams Sonoma', url: 'https://williams-sonoma.com?ref=wonderlist', icon: '🍷' },
    { name: 'Wine.com', url: 'https://wine.com?ref=wonderlist', icon: '🍾' },
    { name: 'Total Wine', url: 'https://totalwine.com?ref=wonderlist', icon: '🥂' },
    { name: 'Amazon Wine', url: 'https://amazon.com/wine?ref=wonderlist', icon: '📦' }
  ],
  candles: [
    { name: 'Bath & Body Works', url: 'https://bathandbodyworks.com?ref=wonderlist', icon: '🕯️' },
    { name: 'Yankee Candle', url: 'https://yankeecandle.com?ref=wonderlist', icon: '🪔' },
    { name: 'Anthropologie', url: 'https://anthropologie.com?ref=wonderlist', icon: '✨' },
    { name: 'Target Home', url: 'https://target.com/home?ref=wonderlist', icon: '🎯' }
  ],
  cookies: [
    { name: 'Costco', url: 'https://costco.com?ref=wonderlist', icon: '🍪' },
    { name: 'Harry & David', url: 'https://harryanddavid.com?ref=wonderlist', icon: '🎁' },
    { name: 'Mrs. Fields', url: 'https://mrsfields.com?ref=wonderlist', icon: '🥧' },
    { name: 'Amazon Fresh', url: 'https://amazon.com/fresh?ref=wonderlist', icon: '📦' }
  ],
  giftcards: [
    { name: 'Starbucks', url: 'https://starbucks.com/gift?ref=wonderlist', icon: '☕' },
    { name: 'Amazon Gift Cards', url: 'https://amazon.com/giftcards?ref=wonderlist', icon: '🎁' },
    { name: 'Visa Gift Cards', url: 'https://visa.com/gift?ref=wonderlist', icon: '💳' },
    { name: 'Target Gift Cards', url: 'https://target.com/gift-cards?ref=wonderlist', icon: '🎯' }
  ],
  office: [
    { name: 'Staples', url: 'https://staples.com?ref=wonderlist', icon: '📋' },
    { name: 'Office Depot', url: 'https://officedepot.com?ref=wonderlist', icon: '🖋️' },
    { name: 'Amazon Business', url: 'https://amazon.com/business?ref=wonderlist', icon: '📦' },
    { name: 'Best Buy', url: 'https://bestbuy.com?ref=wonderlist', icon: '💻' }
  ]
};

// Helper function to determine relevant retailers based on gift item
const getRelevantRetailers = (giftItem: string) => {
  const item = giftItem.toLowerCase();
  
  if (item.includes('skincare') || item.includes('beauty')) return giftRetailers.skincare;
  if (item.includes('golf')) return giftRetailers.golf;
  if (item.includes('handbag') || item.includes('bag')) return giftRetailers.handbag;
  if (item.includes('toys') || item.includes('educational')) return giftRetailers.toys;
  if (item.includes('wine') || item.includes('cheese')) return giftRetailers.wine;
  if (item.includes('candle')) return giftRetailers.candles;
  if (item.includes('cookie') || item.includes('tin')) return giftRetailers.cookies;
  if (item.includes('gift card') || item.includes('coffee')) return giftRetailers.giftcards;
  if (item.includes('desk') || item.includes('executive')) return giftRetailers.office;
  
  // Default to general retailers
  return [
    { name: 'Amazon', url: 'https://amazon.com?ref=wonderlist', icon: '📦' },
    { name: 'Target', url: 'https://target.com?ref=wonderlist', icon: '🎯' },
    { name: 'Walmart', url: 'https://walmart.com?ref=wonderlist', icon: '🛒' },
    { name: 'Best Buy', url: 'https://bestbuy.com?ref=wonderlist', icon: '💻' }
  ];
};

export function SmartBudgetTracker({ onNavigate }: SmartBudgetTrackerProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [budgetCategories, setBudgetCategories] = useState(initialBudgetCategories);
  const [optimizedBudgets, setOptimizedBudgets] = useState<{[key: string]: number}>({});
  const [lineItems, setLineItems] = useState(projectLineItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'dueDate' | 'progress' | 'cost' | 'name' | 'relationship' | 'personName'>('dueDate');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'overdue'>('all');
  const [filterRelationship, setFilterRelationship] = useState<'all' | 'Family' | 'Friends' | 'Neighbours' | 'Co-workers'>('all');
  
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

  const getProgressColor = (progress: number, completed: boolean, category?: string) => {
    const isEntertainment = category === 'Entertainment';
    const primaryColor = isEntertainment ? 'text-[#F05959]' : 'text-[#57C289]';
    
    if (completed) return primaryColor;
    if (progress >= 75) return primaryColor;
    if (progress >= 50) return 'text-[#0F73FF]';
    if (progress >= 25) return 'text-yellow-500';
    return 'text-[#F05959]';
  };

  const getProgressBg = (progress: number, completed: boolean, category?: string) => {
    const isEntertainment = category === 'Entertainment';
    const primaryColor = isEntertainment ? 'bg-[#F05959]' : 'bg-[#57C289]';
    
    if (completed) return primaryColor;
    if (progress >= 75) return primaryColor;
    if (progress >= 50) return 'bg-[#0F73FF]';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-[#F05959]';
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !lineItems.find(item => item.dueDate === dueDate)?.completed;
  };

  const formatCompactDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
  };

  // Helper function to get filtered and sorted items for a category
  const getFilteredItems = (categoryName: string) => {
    let filteredItems = lineItems.filter(item => 
      item.category === categoryName &&
      (item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.personName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.relationship?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Apply status filter
    if (filterStatus === 'completed') {
      filteredItems = filteredItems.filter(item => item.completed);
    } else if (filterStatus === 'pending') {
      filteredItems = filteredItems.filter(item => !item.completed && !isOverdue(item.dueDate));
    } else if (filterStatus === 'overdue') {
      filteredItems = filteredItems.filter(item => !item.completed && isOverdue(item.dueDate));
    }

    // Apply relationship filter (only for Holiday Gifts)
    if (categoryName === 'Holiday Gifts' && filterRelationship !== 'all') {
      filteredItems = filteredItems.filter(item => item.relationship === filterRelationship);
    }

    // Apply sorting
    filteredItems.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'progress':
          return b.progress - a.progress;
        case 'cost':
          return b.estimatedCost - a.estimatedCost;
        case 'name':
          return a.item.localeCompare(b.item);
        case 'relationship':
          return (a.relationship || '').localeCompare(b.relationship || '');
        case 'personName':
          return (a.personName || '').localeCompare(b.personName || '');
        default:
          return 0;
      }
    });

    return filteredItems;
  };

  // Get category mapping for line items
  const getCategoryDisplayName = (tabId: string) => {
    switch (tabId) {
      case 'holiday-gifts': return 'Holiday Gifts';
      case 'decorations-crafts': return 'Decorations';
      case 'groceries': return 'Food & Catering';
      case 'entertainment': return 'Entertainment';
      default: return '';
    }
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


      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-[#57C289] text-[#57C289]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('holiday-gifts')}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === 'holiday-gifts'
                  ? 'border-[#57C289] text-[#57C289]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Gift className="w-4 h-4" />
              Holiday Gifts Lens
            </button>
            <button
              onClick={() => setActiveTab('decorations-crafts')}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === 'decorations-crafts'
                  ? 'border-[#57C289] text-[#57C289]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <TreePine className="w-4 h-4" />
              Decorations/Crafts
            </button>
            <button
              onClick={() => setActiveTab('groceries')}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === 'groceries'
                  ? 'border-[#57C289] text-[#57C289]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Utensils className="w-4 h-4" />
              Groceries
            </button>
            <button
              onClick={() => setActiveTab('entertainment')}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === 'entertainment'
                  ? 'border-[#F05959] text-[#F05959]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Music className="w-4 h-4" />
              Entertainment
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
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

        {activeTab === 'holiday-gifts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header with controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Gift className="w-6 h-6 text-[#F05959]" />
                <h2 className="text-xl font-medium text-gray-900">Holiday Gifts</h2>
                <Badge variant="secondary" className="ml-2">
                  {getFilteredItems('Holiday Gifts').length} items
                </Badge>
              </div>
              <Button className="bg-[#57C289] hover:bg-green-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Gift Item
              </Button>
            </div>

            {/* Filters and Search */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Filters & Sort</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search gifts, names..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white"
                  />
                </div>
                <Select value={filterRelationship} onValueChange={(value: any) => setFilterRelationship(value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Filter by relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Relationships</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Friends">Friends</SelectItem>
                    <SelectItem value="Neighbours">Neighbours</SelectItem>
                    <SelectItem value="Co-workers">Co-workers</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dueDate">Due Date</SelectItem>
                    <SelectItem value="personName">Person Name</SelectItem>
                    <SelectItem value="relationship">Relationship</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                    <SelectItem value="cost">Cost</SelectItem>
                    <SelectItem value="name">Gift Item</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Compact Line Items */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {(() => {
                  const filteredItems = getFilteredItems('Holiday Gifts');
                  
                  // Group items by person name
                  const groupedByPerson = filteredItems.reduce((acc, item) => {
                    const personName = item.personName || 'Unknown';
                    if (!acc[personName]) {
                      acc[personName] = [];
                    }
                    acc[personName].push(item);
                    return acc;
                  }, {} as Record<string, typeof filteredItems>);

                  return Object.entries(groupedByPerson).map(([personName, personItems]) => {
                    // If person has only one gift, render as single line item
                    if (personItems.length === 1) {
                      const item = personItems[0];
                      return (
                        <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            {/* Checkbox */}
                            <button
                              onClick={() => toggleItemCompletion(item.id)}
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                                item.completed
                                  ? 'bg-[#57C289] border-[#57C289] text-white'
                                  : 'border-gray-300 hover:border-[#57C289]'
                              }`}
                            >
                              {item.completed && <CheckCircle2 className="w-3 h-3" />}
                            </button>
                            
                            {/* Person Name */}
                            <div className="w-32 flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                              <User className="w-4 h-4" />
                              <span className="truncate">{item.personName}</span>
                            </div>
                            
                            {/* Relationship */}
                            <div className="w-24 flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                              <Users className="w-4 h-4" />
                              <span className="truncate">{item.relationship}</span>
                            </div>
                            
                            {/* Gift Item */}
                            <div className="flex-1 min-w-0">
                              <span className="truncate block">{item.item}</span>
                            </div>
                            
                            {/* Status */}
                            <div className="w-20 flex-shrink-0">
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant={item.completed ? "default" : isOverdue(item.dueDate) ? "destructive" : "secondary"}
                                  className="text-xs"
                                >
                                  {item.completed ? 'Complete' : isOverdue(item.dueDate) ? 'Overdue' : 'Pending'}
                                </Badge>
                              </div>
                            </div>
                            
                            {/* Date */}
                            <div className="w-16 flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                              <Calendar className="w-4 h-4" />
                              <span>{formatCompactDate(item.dueDate)}</span>
                            </div>
                            
                            {/* Cost */}
                            <div className="w-16 flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                              <DollarSign className="w-4 h-4" />
                              <span>${item.estimatedCost}</span>
                            </div>
                            
                            {/* Progress */}
                            <div className="flex items-center gap-2 flex-shrink-0 w-20">
                              <div className="w-12 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${getProgressBg(item.progress, item.completed)}`}
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                              <span className={`text-xs w-8 ${getProgressColor(item.progress, item.completed)}`}>
                                {item.progress}%
                              </span>
                            </div>
                            
                            {/* Shop Now Dropdown */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 gap-1 flex-shrink-0 bg-[#57C289] text-white border-[#57C289] hover:bg-green-600">
                                  <ShoppingCart className="w-3 h-3" />
                                  <span className="text-xs">Shop</span>
                                  <ChevronDown className="w-3 h-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                {getRelevantRetailers(item.item).map((retailer, index) => (
                                  <DropdownMenuItem key={index} asChild>
                                    <a
                                      href={retailer.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 cursor-pointer"
                                    >
                                      <span className="text-base">{retailer.icon}</span>
                                      <span>{retailer.name}</span>
                                      <ExternalLink className="w-3 h-3 ml-auto text-gray-400" />
                                    </a>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          {/* Notes on separate line but compact */}
                          {item.notes && (
                            <div className="ml-9 mt-1">
                              <p className="text-xs text-gray-500">{item.notes}</p>
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      // Multiple gifts for this person - render as accordion
                      const totalCost = personItems.reduce((sum, item) => sum + item.estimatedCost, 0);
                      const completedCount = personItems.filter(item => item.completed).length;
                      const overallProgress = Math.round((completedCount / personItems.length) * 100);
                      
                      return (
                        <Accordion key={personName} type="single" collapsible className="border-0">
                          <AccordionItem value={personName} className="border-0">
                            <AccordionTrigger className="p-4 hover:bg-gray-50 hover:no-underline">
                              <div className="flex items-center gap-3 flex-1">
                                {/* Person Info */}
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-gray-600" />
                                  <span className="font-medium">{personName}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {personItems.length} gifts
                                  </Badge>
                                </div>
                                
                                {/* Summary Stats */}
                                <div className="flex items-center gap-4 ml-auto mr-4">
                                  <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span>{personItems[0].relationship}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <DollarSign className="w-4 h-4" />
                                    <span>${totalCost}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-12 bg-gray-200 rounded-full h-2">
                                      <div
                                        className="h-2 rounded-full bg-[#57C289]"
                                        style={{ width: `${overallProgress}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-gray-600 w-8">
                                      {overallProgress}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-0">
                              <div className="bg-gray-50">
                                {personItems.map((item, index) => (
                                  <div key={item.id} className={`p-4 pl-12 ${index < personItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                                    <div className="flex items-center gap-3">
                                      {/* Checkbox */}
                                      <button
                                        onClick={() => toggleItemCompletion(item.id)}
                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                                          item.completed
                                            ? 'bg-[#57C289] border-[#57C289] text-white'
                                            : 'border-gray-300 hover:border-[#57C289]'
                                        }`}
                                      >
                                        {item.completed && <CheckCircle2 className="w-3 h-3" />}
                                      </button>
                                      
                                      {/* Gift Item */}
                                      <div className="flex-1 min-w-0">
                                        <span className="truncate block">{item.item}</span>
                                      </div>
                                      
                                      {/* Status */}
                                      <div className="w-20 flex-shrink-0">
                                        <Badge 
                                          variant={item.completed ? "default" : isOverdue(item.dueDate) ? "destructive" : "secondary"}
                                          className="text-xs"
                                        >
                                          {item.completed ? 'Complete' : isOverdue(item.dueDate) ? 'Overdue' : 'Pending'}
                                        </Badge>
                                      </div>
                                      
                                      {/* Date */}
                                      <div className="w-16 flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                                        <Calendar className="w-4 h-4" />
                                        <span>{formatCompactDate(item.dueDate)}</span>
                                      </div>
                                      
                                      {/* Cost */}
                                      <div className="w-16 flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                                        <DollarSign className="w-4 h-4" />
                                        <span>${item.estimatedCost}</span>
                                      </div>
                                      
                                      {/* Progress */}
                                      <div className="flex items-center gap-2 flex-shrink-0 w-20">
                                        <div className="w-12 bg-gray-200 rounded-full h-2">
                                          <div
                                            className={`h-2 rounded-full ${getProgressBg(item.progress, item.completed)}`}
                                            style={{ width: `${item.progress}%` }}
                                          />
                                        </div>
                                        <span className={`text-xs w-8 ${getProgressColor(item.progress, item.completed)}`}>
                                          {item.progress}%
                                        </span>
                                      </div>
                                      
                                      {/* Shop Now Dropdown */}
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="outline" size="sm" className="h-8 gap-1 flex-shrink-0 bg-[#57C289] text-white border-[#57C289] hover:bg-green-600">
                                            <ShoppingCart className="w-3 h-3" />
                                            <span className="text-xs">Shop</span>
                                            <ChevronDown className="w-3 h-3" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                          {getRelevantRetailers(item.item).map((retailer, index) => (
                                            <DropdownMenuItem key={index} asChild>
                                              <a
                                                href={retailer.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 cursor-pointer"
                                              >
                                                <span className="text-base">{retailer.icon}</span>
                                                <span>{retailer.name}</span>
                                                <ExternalLink className="w-3 h-3 ml-auto text-gray-400" />
                                              </a>
                                            </DropdownMenuItem>
                                          ))}
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                    
                                    {/* Notes on separate line but compact */}
                                    {item.notes && (
                                      <div className="ml-9 mt-1">
                                        <p className="text-xs text-gray-500">{item.notes}</p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      );
                    }
                  });
                })()}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'decorations-crafts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header with controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <TreePine className="w-6 h-6 text-[#57C289]" />
                <h2 className="text-xl font-medium text-gray-900">Decorations & Crafts</h2>
                <Badge variant="secondary" className="ml-2">
                  {getFilteredItems('Decorations').length} items
                </Badge>
              </div>
              <Button className="bg-[#57C289] hover:bg-green-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Decoration Item
              </Button>
            </div>

            {/* Filters and Search */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Filters & Sort</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white"
                  />
                </div>
                <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dueDate">Due Date</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                    <SelectItem value="cost">Cost</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Compact Line Items */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {getFilteredItems('Decorations').map((item) => (
                  <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleItemCompletion(item.id)}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                          item.completed
                            ? 'bg-[#57C289] border-[#57C289] text-white'
                            : 'border-gray-300 hover:border-[#57C289]'
                        }`}
                      >
                        {item.completed && <CheckCircle2 className="w-3 h-3" />}
                      </button>
                      
                      {/* Item Name & Status */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium truncate ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {item.item}
                          </span>
                          <Badge 
                            variant={item.completed ? "secondary" : isOverdue(item.dueDate) ? "destructive" : "outline"}
                            className="text-xs flex-shrink-0"
                          >
                            {item.completed ? 'Complete' : isOverdue(item.dueDate) ? 'Overdue' : 'Pending'}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Date */}
                      <div className="flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                        <Calendar className="w-4 h-4" />
                        <span>{formatCompactDate(item.dueDate)}</span>
                      </div>
                      
                      {/* Cost */}
                      <div className="flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                        <DollarSign className="w-4 h-4" />
                        <span>${item.estimatedCost}</span>
                      </div>
                      
                      {/* Progress */}
                      <div className="flex items-center gap-2 flex-shrink-0 w-24">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressBg(item.progress, item.completed)}`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className={`text-xs w-8 ${getProgressColor(item.progress, item.completed)}`}>
                          {item.progress}%
                        </span>
                      </div>
                      
                      {/* Action */}
                      {item.hasShopLink && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    {/* Notes on separate line but compact */}
                    {item.notes && (
                      <div className="ml-9 mt-1">
                        <p className="text-xs text-gray-500">{item.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'groceries' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header with controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Utensils className="w-6 h-6 text-[#0F73FF]" />
                <h2 className="text-xl font-medium text-gray-900">Food & Catering</h2>
                <Badge variant="secondary" className="ml-2">
                  {getFilteredItems('Food & Catering').length} items
                </Badge>
              </div>
              <Button className="bg-[#57C289] hover:bg-green-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Food Item
              </Button>
            </div>

            {/* Filters and Search */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Filters & Sort</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white"
                  />
                </div>
                <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dueDate">Due Date</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                    <SelectItem value="cost">Cost</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Compact Line Items */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {getFilteredItems('Food & Catering').map((item) => (
                  <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleItemCompletion(item.id)}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                          item.completed
                            ? 'bg-[#57C289] border-[#57C289] text-white'
                            : 'border-gray-300 hover:border-[#57C289]'
                        }`}
                      >
                        {item.completed && <CheckCircle2 className="w-3 h-3" />}
                      </button>
                      
                      {/* Item Name & Status */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium truncate ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {item.item}
                          </span>
                          <Badge 
                            variant={item.completed ? "secondary" : isOverdue(item.dueDate) ? "destructive" : "outline"}
                            className="text-xs flex-shrink-0"
                          >
                            {item.completed ? 'Complete' : isOverdue(item.dueDate) ? 'Overdue' : 'Pending'}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Date */}
                      <div className="flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                        <Calendar className="w-4 h-4" />
                        <span>{formatCompactDate(item.dueDate)}</span>
                      </div>
                      
                      {/* Cost */}
                      <div className="flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                        <DollarSign className="w-4 h-4" />
                        <span>${item.estimatedCost}</span>
                      </div>
                      
                      {/* Progress */}
                      <div className="flex items-center gap-2 flex-shrink-0 w-24">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressBg(item.progress, item.completed)}`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className={`text-xs w-8 ${getProgressColor(item.progress, item.completed)}`}>
                          {item.progress}%
                        </span>
                      </div>
                      
                      {/* Action */}
                      {item.hasShopLink && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    {/* Notes on separate line but compact */}
                    {item.notes && (
                      <div className="ml-9 mt-1">
                        <p className="text-xs text-gray-500">{item.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'entertainment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header with controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Music className="w-6 h-6 text-[#F05959]" />
                <h2 className="text-xl font-medium text-gray-900">Entertainment</h2>
                <Badge variant="secondary" className="ml-2">
                  {getFilteredItems('Entertainment').length} items
                </Badge>
              </div>
              <Button className="bg-[#F05959] hover:bg-red-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Entertainment Item
              </Button>
            </div>

            {/* Filters and Search */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Filters & Sort</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white"
                  />
                </div>
                <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dueDate">Due Date</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                    <SelectItem value="cost">Cost</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Compact Line Items */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {getFilteredItems('Entertainment').map((item) => (
                  <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleItemCompletion(item.id)}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                          item.completed
                            ? 'bg-[#F05959] border-[#F05959] text-white'
                            : 'border-gray-300 hover:border-[#F05959]'
                        }`}
                      >
                        {item.completed && <CheckCircle2 className="w-3 h-3" />}
                      </button>
                      
                      {/* Item Name & Status */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium truncate ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {item.item}
                          </span>
                          <Badge 
                            variant={item.completed ? "secondary" : isOverdue(item.dueDate) ? "destructive" : "outline"}
                            className="text-xs flex-shrink-0"
                          >
                            {item.completed ? 'Complete' : isOverdue(item.dueDate) ? 'Overdue' : 'Pending'}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Date */}
                      <div className="flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                        <Calendar className="w-4 h-4" />
                        <span>{formatCompactDate(item.dueDate)}</span>
                      </div>
                      
                      {/* Cost */}
                      <div className="flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                        <DollarSign className="w-4 h-4" />
                        <span>${item.estimatedCost}</span>
                      </div>
                      
                      {/* Progress */}
                      <div className="flex items-center gap-2 flex-shrink-0 w-24">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressBg(item.progress, item.completed, 'Entertainment')}`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className={`text-xs w-8 ${getProgressColor(item.progress, item.completed, 'Entertainment')}`}>
                          {item.progress}%
                        </span>
                      </div>
                      
                      {/* Action */}
                      {item.hasShopLink && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    {/* Notes on separate line but compact */}
                    {item.notes && (
                      <div className="ml-9 mt-1">
                        <p className="text-xs text-gray-500">{item.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}