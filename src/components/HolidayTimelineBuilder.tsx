import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, CheckCircle, Plus, AlertCircle, Users, Gift, ChefHat } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface HolidayTimelineBuilderProps {
  onNavigate: (page: string) => void;
}

const timelineEvents = [
  {
    id: 1,
    title: 'Send Holiday Invitations',
    description: 'Email invites to 12 family members',
    date: '2024-12-01',
    time: '10:00 AM',
    category: 'Planning',
    status: 'completed',
    color: 'bg-green-500',
    icon: Users,
    duration: '30 min'
  },
  {
    id: 2,
    title: 'Order Christmas Decorations',
    description: 'Online order for outdoor lights and wreaths',
    date: '2024-12-03',
    time: '2:00 PM',
    category: 'Shopping',
    status: 'completed',
    color: 'bg-blue-500',
    icon: Gift,
    duration: '1 hour'
  },
  {
    id: 3,
    title: 'Grocery Shopping for Christmas Dinner',
    description: 'Turkey, vegetables, and dessert ingredients',
    date: '2024-12-15',
    time: '9:00 AM',
    category: 'Food Prep',
    status: 'upcoming',
    color: 'bg-orange-500',
    icon: ChefHat,
    duration: '2 hours'
  },
  {
    id: 4,
    title: 'Christmas Tree Setup',
    description: 'Pick up tree and decorate with family',
    date: '2024-12-18',
    time: '11:00 AM',
    category: 'Decorating',
    status: 'upcoming',
    color: 'bg-green-600',
    icon: Gift,
    duration: '3 hours'
  },
  {
    id: 5,
    title: 'Christmas Dinner Prep',
    description: 'Start cooking turkey and side dishes',
    date: '2024-12-24',
    time: '8:00 AM',
    category: 'Food Prep',
    status: 'scheduled',
    color: 'bg-red-500',
    icon: ChefHat,
    duration: '6 hours'
  },
  {
    id: 6,
    title: 'Christmas Day Celebration',
    description: 'Family gathering and gift exchange',
    date: '2024-12-25',
    time: '12:00 PM',
    category: 'Celebration',
    status: 'scheduled',
    color: 'bg-red-600',
    icon: Gift,
    duration: 'All day'
  }
];

const smartSuggestions = [
  {
    icon: AlertCircle,
    title: 'Schedule Buffer Time',
    message: 'Add 30 minutes between grocery shopping and tree setup',
    type: 'optimization',
    color: 'text-blue-500',
    bg: 'bg-blue-100'
  },
  {
    icon: Clock,
    title: 'Early Start Recommended',
    message: 'Start Christmas dinner prep 1 hour earlier for stress-free cooking',
    type: 'timing',
    color: 'text-orange-500',
    bg: 'bg-orange-100'
  },
  {
    icon: CheckCircle,
    title: 'Perfect Timeline',
    message: 'Your current schedule allows for optimal preparation time',
    type: 'success',
    color: 'text-green-500',
    bg: 'bg-green-100'
  }
];

const milestones = [
  { date: '2024-12-01', label: 'Planning Phase', completed: true },
  { date: '2024-12-15', label: 'Shopping Phase', completed: false },
  { date: '2024-12-20', label: 'Preparation Phase', completed: false },
  { date: '2024-12-25', label: 'Celebration Day', completed: false }
];

export function HolidayTimelineBuilder({ onNavigate }: HolidayTimelineBuilderProps) {
  const [activeView, setActiveView] = useState('timeline');
  const [selectedDate, setSelectedDate] = useState('2024-12-15');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'upcoming': return 'bg-blue-500';
      case 'scheduled': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'upcoming': return 'This Week';
      case 'scheduled': return 'Scheduled';
      default: return 'Pending';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#0F73FF]" />
            </div>
            <div>
              <h1 className="text-2xl font-medium text-gray-900">Holiday Timeline Builder</h1>
              <p className="text-gray-600">Automated scheduling & smart planning assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-medium text-gray-900">12 Days</div>
              <div className="text-sm text-gray-600">Until Christmas</div>
            </div>
            <Button className="bg-[#0F73FF] hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex space-x-8">
            {[
              { id: 'timeline', label: 'Timeline View', icon: Calendar },
              { id: 'suggestions', label: 'AI Suggestions', icon: AlertCircle },
              { id: 'milestones', label: 'Milestones', icon: CheckCircle },
              { id: 'calendar', label: 'Calendar', icon: Clock }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                  activeView === tab.id
                    ? 'border-[#0F73FF] text-[#0F73FF]'
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
        {activeView === 'timeline' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="relative flex items-start gap-6 pb-8">
                  {/* Timeline Dot */}
                  <div className={`relative z-10 w-16 h-16 ${event.color} rounded-full flex items-center justify-center`}>
                    <event.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Event Card */}
                  <Card className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(event.status)}`}>
                            {getStatusText(event.status)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <span>Duration: {event.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        {event.status === 'upcoming' && (
                          <Button size="sm" className="bg-[#0F73FF] hover:bg-blue-600">
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeView === 'suggestions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-medium text-gray-900 mb-6">AI-Powered Timeline Optimization</h2>
            
            {smartSuggestions.map((suggestion, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 ${suggestion.bg} rounded-full flex items-center justify-center`}>
                    <suggestion.icon className={`w-5 h-5 ${suggestion.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{suggestion.title}</h3>
                    <p className="text-gray-600">{suggestion.message}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Dismiss</Button>
                    <Button size="sm" className="bg-[#0F73FF] hover:bg-blue-600">
                      Apply
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        )}

        {activeView === 'milestones' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-medium text-gray-900 mb-6">Holiday Planning Milestones</h2>
            
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200 rounded-full"></div>
              <div className="absolute left-6 top-0 w-1 bg-[#0F73FF] rounded-full h-20"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-center gap-6 pb-8">
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white ${
                    milestone.completed ? 'bg-[#0F73FF]' : 'bg-gray-300'
                  }`}>
                    {milestone.completed ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    )}
                  </div>
                  
                  <Card className="flex-1 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{milestone.label}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(milestone.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        milestone.completed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {milestone.completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeView === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-900">December 2024</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
            
            <Card className="p-6">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-medium text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const hasEvent = timelineEvents.some(event => 
                    new Date(event.date).getDate() === day
                  );
                  return (
                    <div
                      key={day}
                      className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-colors ${
                        hasEvent 
                          ? 'bg-[#0F73FF] text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}