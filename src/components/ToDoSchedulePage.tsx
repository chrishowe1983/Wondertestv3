import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Home, Calendar, Clock, CheckCircle, Flag, Users, Bell } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';


interface ToDoSchedulePageProps {
  onNavigate: (page: string) => void;
}

const planningFeatures = [
  {
    id: 'prioritization',
    title: 'Task Prioritization',
    description: 'Organize tasks by importance and urgency',
    icon: Flag,
    image: 'https://images.unsplash.com/photo-1606327054476-256fc9690fe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xpZGF5JTIwcGxhbm5pbmclMjBjaGVja2xpc3R8ZW58MXx8fHwxNzU4MzE3NTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'High/medium/low priority',
      'Must-do vs nice-to-have',
      'Time-sensitive flags',
      'Critical path planning'
    ]
  },
  {
    id: 'reminders',
    title: 'Deadline Reminders',
    description: 'Never miss important holiday deadlines',
    icon: Bell,
    image: 'https://images.unsplash.com/photo-1606327054476-256fc9690fe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xpZGF5JTIwcGxhbm5pbmclMjBjaGVja2xpc3R8ZW58MXx8fHwxNzU4MzE3NTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Custom notification timing',
      'Multiple reminder alerts',
      'Calendar integration',
      'Mobile notifications'
    ]
  },
  {
    id: 'tracking',
    title: 'Progress Tracking',
    description: 'Visual progress to stay motivated',
    icon: CheckCircle,
    image: 'https://images.unsplash.com/photo-1606327054476-256fc9690fe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xpZGF5JTIwcGxhbm5pbmclMjBjaGVja2xpc3R8ZW58MXx8fHwxNzU4MzE3NTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Completion percentages',
      'Daily progress charts',
      'Milestone celebrations',
      'Achievement badges'
    ]
  },
  {
    id: 'family',
    title: 'Family Assignments',
    description: 'Delegate tasks to family members',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1606327054476-256fc9690fe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xpZGF5JTIwcGxhbm5pbmclMjBjaGVja2xpc3R8ZW58MXx8fHwxNzU4MzE3NTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Task assignment system',
      'Family member profiles',
      'Shared calendars',
      'Responsibility tracking'
    ]
  },
  {
    id: 'scheduling',
    title: 'Smart Scheduling',
    description: 'Optimal timing for maximum efficiency',
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1606327054476-256fc9690fe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xpZGF5JTIwcGxhbm5pbmclMjBjaGVja2xpc3R8ZW58MXx8fHwxNzU4MzE3NTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Time estimation tools',
      'Buffer time planning',
      'Optimal task sequencing',
      'Calendar blocking'
    ]
  },
  {
    id: 'templates',
    title: 'Holiday Templates',
    description: 'Pre-built lists for common holiday tasks',
    icon: Clock,
    image: 'https://images.unsplash.com/photo-1606327054476-256fc9690fe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xpZGF5JTIwcGxhbm5pbmclMjBjaGVja2xpc3R8ZW58MXx8fHwxNzU4MzE3NTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Party planning templates',
      'Gift shopping checklists',
      'Decoration schedules',
      'Travel planning guides'
    ]
  }
];

export function ToDoSchedulePage({ onNavigate }: ToDoSchedulePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F05959] rounded-full"></div>
          <span className="text-xl font-semibold text-[#F05959]">ChristmasList</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-900">Schedule Your</span>
          <span className="text-xl font-normal text-gray-600">To Do List</span>
          <Calendar className="w-6 h-6 text-gray-900 ml-2" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Schedule Your To Do List</h1>
          <p className="text-xl text-gray-600 mb-6">Transform holiday chaos into organized success</p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Smart Prioritization</span>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span>Automated Reminders</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Family Coordination</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-3 gap-8">
          {planningFeatures.map((feature, index) => (
            <Card key={feature.id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              {/* Image */}
              <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                <ImageWithFallback
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Icon and Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#F05959] rounded-full flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {feature.features.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#F05959] rounded-full"></div>
                      <span className="text-sm text-[#F05959] font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button className="w-full bg-[#F05959] hover:bg-[#E04848] text-white py-2">
                  Setup {feature.title}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Start Section */}
        <div className="mt-12 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Start Templates</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-[#F05959] rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Holiday Party</h3>
              <p className="text-xs text-gray-600">Complete party planning checklist</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-[#F05959] rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Gift Shopping</h3>
              <p className="text-xs text-gray-600">Organized gift buying schedule</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-[#F05959] rounded-full flex items-center justify-center mx-auto mb-3">
                <Flag className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Decorations</h3>
              <p className="text-xs text-gray-600">Home decoration timeline</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-[#F05959] rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Travel Plans</h3>
              <p className="text-xs text-gray-600">Holiday travel coordination</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            variant="outline"
            className="text-gray-600 border-gray-300"
            onClick={() => onNavigate('christmas-shape')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shape
          </Button>
          <Button 
            variant="outline"
            className="text-gray-600 border-gray-300"
            onClick={() => onNavigate('home')}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}