import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Calendar, CheckCircle2, ArrowLeft, Target, Clock, Gift, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface ProgressTrackerDashboardProps {
  onNavigate: (page: string) => void;
}

interface ProgressCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  progress: number;
  total: number;
  completed: number;
  color: string;
  tasks: string[];
}

export function ProgressTrackerDashboard({ onNavigate }: ProgressTrackerDashboardProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

  const categories: ProgressCategory[] = [
    {
      id: 'gifts',
      name: 'Gift Planning',
      icon: Gift,
      progress: 75,
      total: 12,
      completed: 9,
      color: '#F05959',
      tasks: ['Buy gifts for parents', 'Wrap children\'s presents', 'Order online gifts']
    },
    {
      id: 'cooking',
      name: 'Food Preparation',
      icon: Target,
      progress: 60,
      total: 8,
      completed: 5,
      color: '#57C289',
      tasks: ['Plan Christmas menu', 'Buy ingredients', 'Prep cookie dough']
    },
    {
      id: 'guests',
      name: 'Guest Management',
      icon: Users,
      progress: 90,
      total: 6,
      completed: 5,
      color: '#0F73FF',
      tasks: ['Send invitations', 'Confirm RSVPs', 'Plan seating']
    },
    {
      id: 'decorations',
      name: 'Decorations',
      icon: CheckCircle2,
      progress: 45,
      total: 10,
      completed: 4,
      color: '#9333EA',
      tasks: ['Set up Christmas tree', 'Hang lights', 'Place ornaments']
    }
  ];

  const weeklyProgress = [
    { day: 'Mon', completed: 3, planned: 5 },
    { day: 'Tue', completed: 4, planned: 6 },
    { day: 'Wed', completed: 2, planned: 4 },
    { day: 'Thu', completed: 6, planned: 7 },
    { day: 'Fri', completed: 5, planned: 8 },
    { day: 'Sat', completed: 7, planned: 9 },
    { day: 'Sun', completed: 4, planned: 6 }
  ];

  const totalCompleted = categories.reduce((sum, cat) => sum + cat.completed, 0);
  const totalTasks = categories.reduce((sum, cat) => sum + cat.total, 0);
  const overallProgress = Math.round((totalCompleted / totalTasks) * 100);

  const completionRate = weeklyProgress.reduce((sum, day) => sum + (day.completed / day.planned), 0) / weeklyProgress.length * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('christmas')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Christmas
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#0F73FF] to-[#9333EA] rounded-full flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Progress Tracker Dashboard</h1>
                  <p className="text-gray-600 text-sm">Real-time completion insights for your holiday planning</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'all')}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-[#F05959]" />
              <Badge variant="outline" className="text-[#F05959] border-[#F05959]">
                Overall
              </Badge>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{overallProgress}%</div>
            <p className="text-gray-600 text-sm">Total Progress</p>
            <Progress value={overallProgress} className="mt-3 h-2" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="w-8 h-8 text-[#57C289]" />
              <Badge variant="outline" className="text-[#57C289] border-[#57C289]">
                Completed
              </Badge>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{totalCompleted}</div>
            <p className="text-gray-600 text-sm">Tasks Done</p>
            <div className="mt-3 text-sm text-gray-500">
              {totalTasks - totalCompleted} remaining
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-[#0F73FF]" />
              <Badge variant="outline" className="text-[#0F73FF] border-[#0F73FF]">
                Rate
              </Badge>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{Math.round(completionRate)}%</div>
            <p className="text-gray-600 text-sm">Completion Rate</p>
            <div className="mt-3 text-sm text-green-600">
              +12% from last week
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-[#9333EA]" />
              <Badge variant="outline" className="text-[#9333EA] border-[#9333EA]">
                Days Left
              </Badge>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
            <p className="text-gray-600 text-sm">Until Christmas</p>
            <div className="mt-3 text-sm text-orange-600">
              Plan accordingly
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Category Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Category Progress</h2>
            
            <div className="space-y-6">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${category.color}20` }}
                        >
                          <IconComponent 
                            className="w-5 h-5" 
                            style={{ color: category.color }}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-600">
                            {category.completed} of {category.total} tasks
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold" style={{ color: category.color }}>
                          {category.progress}%
                        </div>
                      </div>
                    </div>
                    <Progress 
                      value={category.progress} 
                      className="h-2"
                      style={{
                        '--progress-color': category.color
                      } as React.CSSProperties}
                    />
                    <div className="mt-2 text-xs text-gray-500">
                      Next: {category.tasks[0]}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Weekly Activity Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Weekly Activity</h2>
            
            <div className="space-y-4">
              {weeklyProgress.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 text-sm font-medium text-gray-600">
                    {day.day}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-900">
                        {day.completed}/{day.planned} tasks
                      </span>
                      <span className="text-xs text-gray-500">
                        ({Math.round((day.completed / day.planned) * 100)}%)
                      </span>
                    </div>
                    <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(day.completed / day.planned) * 100}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-[#F05959] to-[#57C289] rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-[#0F73FF]" />
                <h3 className="font-medium text-gray-900">Insights</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                You're most productive on weekends! Consider scheduling important tasks on Saturdays.
              </p>
              <p className="text-sm text-gray-600">
                Your completion rate has improved by 12% this week compared to last week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}