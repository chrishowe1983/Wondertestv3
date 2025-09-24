import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Gift, House, TrendingUp, ArrowRight } from 'lucide-react';

interface AllEmotionsProps {
  emotions: any[];
  onNavigate: (page: string) => void;
}

export function AllEmotions({ emotions, onNavigate }: AllEmotionsProps) {
  const emotionConfig = [
    {
      id: 'excited',
      name: 'Excited',
      icon: Gift,
      color: '#F05959',
      description: 'Creativity & Celebration',
      subtitle: 'When you\'re energized and ready to create something special',
      modules: [
        { name: 'Christmas Planning', description: 'Complete holiday organization', page: 'christmas' },
        { name: 'Wedding Planning', description: 'Dream wedding coordination', page: 'weddings' },
        { name: 'Baby Planning', description: 'Nursery setup and preparation', page: 'babies' }
      ]
    },
    {
      id: 'ready',
      name: 'Ready',
      icon: House,
      color: '#57C289',
      description: 'Organization & Preparation',
      subtitle: 'When you\'re focused and want to get organized',
      modules: [
        { name: 'Home Organization', description: 'Household systems and lists', page: 'home-org' },
        { name: 'Meal Planning', description: 'KitchenSync menu planning', page: 'meals' },
        { name: 'School Planning', description: 'Academic and schedule management', page: 'school' }
      ]
    },
    {
      id: 'confident',
      name: 'Confident',
      icon: TrendingUp,
      color: '#0F73FF',
      description: 'Growth & Achievement',
      subtitle: 'When you\'re ambitious and ready to grow',
      modules: [
        { name: 'Finance Planning', description: 'Budget and financial goals', page: 'finance' },
        { name: 'Career Growth', description: 'Professional development', page: 'careers' },
        { name: 'Life Changes', description: 'Transition management', page: 'life-change' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#030F38] to-[#0F1C4C] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              All Emotions
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Choose the emotion that matches your current state of mind. 
              Each emotion offers specialized planning tools designed for that mindset.
            </p>
          </div>
        </div>
      </div>

      {/* Emotions Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {emotionConfig.map((emotion) => {
            const Icon = emotion.icon;
            return (
              <Card key={emotion.id} className="overflow-hidden border-2 hover:border-gray-200 transition-all">
                <div className="grid md:grid-cols-3 gap-0">
                  {/* Emotion Info */}
                  <div 
                    className="p-8 text-white flex flex-col justify-center"
                    style={{ backgroundColor: emotion.color }}
                  >
                    <div className="text-center">
                      <Icon className="h-16 w-16 mx-auto mb-4" />
                      <h2 className="text-3xl font-bold mb-2">{emotion.name}</h2>
                      <p className="text-lg opacity-90 mb-4">{emotion.description}</p>
                      <p className="text-sm opacity-75">{emotion.subtitle}</p>
                    </div>
                  </div>

                  {/* Modules */}
                  <div className="md:col-span-2 p-8">
                    <h3 className="text-xl font-semibold mb-6 text-gray-900">
                      Available Modules
                    </h3>
                    <div className="space-y-4">
                      {emotion.modules.map((module, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div>
                            <h4 className="font-medium text-gray-900">{module.name}</h4>
                            <p className="text-gray-600 text-sm">{module.description}</p>
                          </div>
                          <Button
                            onClick={() => onNavigate(module.page)}
                            variant="outline"
                            size="sm"
                            className="ml-4"
                          >
                            Explore
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <Button 
                        onClick={() => onNavigate(emotion.id)}
                        className="w-full"
                        style={{ backgroundColor: emotion.color }}
                      >
                        View {emotion.name} Hub
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Not sure where to start?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Try our most popular module - Christmas Planning - to see how emotion-driven planning works.
          </p>
          <Button 
            onClick={() => onNavigate('christmas')}
            className="bg-[#F05959] hover:bg-[#E04848] text-white px-8 py-4 text-lg"
          >
            Start with Christmas Planning
            <Gift className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}