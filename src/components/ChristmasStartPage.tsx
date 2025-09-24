import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Home, ShoppingCart, DollarSign, Heart } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';


interface ChristmasStartPageProps {
  onNavigate: (page: string) => void;
}

const shoppingCards = [
  {
    id: 'shopping',
    title: 'Start festive shopping',
    description: 'Begin your holiday shopping with guided lists and deal alerts',
    icon: ShoppingCart,
    iconBg: 'bg-[#F05959]',
    features: [
      'Smart shopping lists',
      'Price comparisons',
      'Deal notifications', 
      'Store locators'
    ],
    buttonText: 'Explore Start festive shopping'
  },
  {
    id: 'budget',
    title: 'Festive budget',
    description: 'Track your holiday spending and stay within budget',
    icon: DollarSign,
    iconBg: 'bg-[#F05959]',
    features: [
      'Budget planning',
      'Expense tracking',
      'Category limits',
      'Savings goals'
    ],
    buttonText: 'Explore Festive budget'
  },
  {
    id: 'thanks',
    title: 'Thank you notes',
    description: 'Create personalized thank you messages and track sent notes',
    icon: Heart,
    iconBg: 'bg-[#F05959]',
    features: [
      'Template library',
      'Personal touches',
      'Delivery tracking',
      'Reminder system'
    ],
    buttonText: 'Explore Thank you notes'
  }
];

export function ChristmasStartPage({ onNavigate }: ChristmasStartPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F05959] rounded-full"></div>
          <span className="text-xl font-semibold text-[#F05959]">ChristmasList</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-900">Start</span>
          <span className="text-xl font-normal text-gray-600">Christmas Shopping</span>
          <ShoppingCart className="w-6 h-6 text-gray-900 ml-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-3 gap-8">
          {shoppingCards.map((card, index) => (
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
                  onClick={() => onNavigate(card.id === 'shopping' ? 'festive-shopping' : card.id === 'budget' ? 'festive-budget' : 'thank-you-notes')}
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