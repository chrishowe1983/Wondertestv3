import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Home, FileText, Calendar, ChefHat, Gift } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';


interface ChristmasShapePageProps {
  onNavigate: (page: string) => void;
}

const planningCards = [
  {
    id: 'todo',
    title: 'Schedule your to do list',
    description: 'Organize all your holiday tasks with smart scheduling',
    icon: Calendar,
    iconBg: 'bg-[#F05959]',
    features: [
      'Task prioritization',
      'Deadline reminders', 
      'Progress tracking',
      'Family assignments'
    ],
    buttonText: 'Explore Schedule your to do list'
  },
  {
    id: 'food',
    title: 'Christmas food list',
    description: 'Plan your holiday meals and coordinate potluck contributions',
    icon: ChefHat,
    iconBg: 'bg-[#F05959]',
    features: [
      'Menu planning',
      'Shopping lists',
      'Dietary restrictions', 
      'Cooking timelines'
    ],
    buttonText: 'Explore Christmas food list'
  },
  {
    id: 'gifts',
    title: 'Generate your christmas gift list',
    description: 'Create personalized gift lists with budget tracking',
    icon: Gift,
    iconBg: 'bg-[#F05959]',
    features: [
      'Recipient profiles',
      'Budget allocation',
      'Gift tracking',
      'Purchase status'
    ],
    buttonText: 'Explore Generate your christmas gift list'
  }
];

export function ChristmasShapePage({ onNavigate }: ChristmasShapePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F05959] rounded-full"></div>
          <span className="text-xl font-semibold text-[#F05959]">ChristmasList</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-900">Shape</span>
          <span className="text-xl font-normal text-gray-600">Festive Plans</span>
          <FileText className="w-6 h-6 text-gray-900 ml-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-3 gap-8">
          {planningCards.map((card, index) => (
            <Card key={card.id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              {/* Christmas Tree Image */}
              <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1531627690838-8865c1468d62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjB0cmVlJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1ODMxNzIzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Christmas tree decoration"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Icon and Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 ${card.iconBg} rounded-full flex items-center justify-center`}>
                    <card.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{card.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {card.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#F05959] rounded-full"></div>
                      <span className="text-sm text-[#F05959] font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full bg-[#F05959] hover:bg-[#E04848] text-white py-2"
                  onClick={() => onNavigate(card.id === 'todo' ? 'todo-schedule' : card.id === 'food' ? 'christmas-food' : 'gift-list')}
                >
                  {card.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            variant="outline"
            className="text-gray-600 border-gray-300"
            onClick={() => onNavigate('christmas')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Christmas
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