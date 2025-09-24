import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Gift, House, TrendingUp } from 'lucide-react';

interface EmotionPageProps {
  emotion: 'ready' | 'excited' | 'confident';
  onNavigate: (page: string) => void;
}

export function EmotionPage({ emotion, onNavigate }: EmotionPageProps) {
  const emotionConfig = {
    excited: {
      name: 'Excited',
      icon: Gift,
      color: '#F05959',
      bgColor: 'bg-[#F05959]',
      lightBg: 'bg-[#FEF2F2]',
      description: 'Creativity & Celebration',
      subtitle: 'Channel your excitement into creating memorable experiences',
      phase: 'SPARK → SHAPE → START',
      modules: [
        {
          id: 'christmas',
          name: 'Christmas Planning',
          subtitle: 'Listmas',
          description: 'Complete holiday organization from gifts to dinner',
          phase: 'SPARK',
          status: 'Available',
          features: ['Gift Planning', 'Menu Coordination', 'Budget Tracking', 'Timeline Management']
        },
        {
          id: 'weddings',
          name: 'Wedding Planning',
          subtitle: 'Wedding Coordination',
          description: 'Dream wedding planning and coordination',
          phase: 'SHAPE',
          status: 'Coming Soon',
          features: ['Venue Planning', 'Guest Management', 'Vendor Coordination', 'Timeline']
        },
        {
          id: 'babies',
          name: 'Baby Planning',
          subtitle: 'BabyPrep',
          description: 'Nursery setup and baby preparation',
          phase: 'START',
          status: 'Coming Soon',
          features: ['Nursery Design', 'Baby Registry', 'Care Planning', 'Preparation Lists']
        }
      ]
    },
    ready: {
      name: 'Ready',
      icon: House,
      color: '#57C289',
      bgColor: 'bg-[#57C289]',
      lightBg: 'bg-[#F0F9F4]',
      description: 'Organization & Preparation',
      subtitle: 'Transform your readiness into organized action',
      phase: 'SPARK → SHAPE → START',
      modules: [
        {
          id: 'home-org',
          name: 'Home Organization',
          subtitle: 'Household Lists',
          description: 'Organize your home with systematic approaches',
          phase: 'SPARK',
          status: 'Coming Soon',
          features: ['Room Organization', 'Cleaning Systems', 'Storage Solutions', 'Maintenance']
        },
        {
          id: 'meals',
          name: 'Meal Planning',
          subtitle: 'KitchenSync',
          description: 'Menu planning and grocery coordination',
          phase: 'SHAPE',
          status: 'Coming Soon',
          features: ['Menu Planning', 'Grocery Lists', 'Prep Scheduling', 'Recipe Management']
        },
        {
          id: 'school',
          name: 'School Planning',
          subtitle: 'SchoolSync',
          description: 'Academic and schedule management',
          phase: 'START',
          status: 'Coming Soon',
          features: ['Academic Planning', 'Schedule Management', 'Supply Lists', 'Activities']
        }
      ]
    },
    confident: {
      name: 'Confident',
      icon: TrendingUp,
      color: '#0F73FF',
      bgColor: 'bg-[#0F73FF]',
      lightBg: 'bg-[#EFF6FF]',
      description: 'Growth & Achievement',
      subtitle: 'Channel your confidence into meaningful growth',
      phase: 'SPARK → SHAPE → START',
      modules: [
        {
          id: 'finance',
          name: 'Finance Planning',
          subtitle: 'FinanceSync',
          description: 'Budget planning and financial goals',
          phase: 'SPARK',
          status: 'Coming Soon',
          features: ['Budget Planning', 'Goal Setting', 'Expense Tracking', 'Investment Planning']
        },
        {
          id: 'careers',
          name: 'Career Growth',
          subtitle: 'Ascent',
          description: 'Professional development and career planning',
          phase: 'SHAPE',
          status: 'Coming Soon',
          features: ['Skill Development', 'Goal Setting', 'Network Building', 'Career Planning']
        },
        {
          id: 'life-change',
          name: 'Life Changes',
          subtitle: 'Transitions',
          description: 'Navigate major life transitions',
          phase: 'START',
          status: 'Coming Soon',
          features: ['Change Planning', 'Goal Setting', 'Support Systems', 'Progress Tracking']
        }
      ]
    }
  };

  const config = emotionConfig[emotion];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className={`${config.bgColor} text-white py-16`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Icon className="h-12 w-12" />
                <div>
                  <h1 className="text-4xl font-bold">{config.name}</h1>
                  <p className="text-xl opacity-90">{config.description}</p>
                </div>
              </div>
              <p className="text-lg mb-8 opacity-90">{config.subtitle}</p>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-sm px-4 py-2 bg-white/20 text-white border-white/30">
                  {config.phase}
                </Badge>
                <span className="text-sm opacity-75">3 modules available</span>
              </div>
            </div>
            
            <div className={`${config.lightBg} rounded-2xl p-8 text-center`}>
              <Icon className="h-16 w-16 mx-auto mb-4" style={{ color: config.color }} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to {config.name.toLowerCase()}?
              </h3>
              <p className="text-gray-600">
                Choose a module that matches your current focus and energy level
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {config.name} Modules
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each module is designed to match your {config.name.toLowerCase()} energy. 
            Follow the Spark → Shape → Start framework for best results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {config.modules.map((module, index) => (
            <Card 
              key={module.id}
              className={`group hover:shadow-xl transition-all duration-300 ${
                module.status === 'Available' ? 'cursor-pointer border-2 hover:border-gray-200' : 'opacity-75'
              }`}
              onClick={() => module.status === 'Available' && onNavigate(module.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant="outline" 
                    className="text-xs"
                    style={{ borderColor: config.color, color: config.color }}
                  >
                    {module.phase}
                  </Badge>
                  <Badge 
                    variant={module.status === 'Available' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {module.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{module.name}</CardTitle>
                <CardDescription className="text-sm font-medium text-gray-500">
                  {module.subtitle}
                </CardDescription>
                <CardDescription className="text-gray-600">
                  {module.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2 mb-6">
                  {module.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.color }}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full ${
                    module.status === 'Available' 
                      ? 'group-hover:bg-gray-900 transition-colors' 
                      : 'cursor-not-allowed opacity-50'
                  }`}
                  style={{ 
                    backgroundColor: module.status === 'Available' ? config.color : undefined 
                  }}
                  disabled={module.status !== 'Available'}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (module.status === 'Available') {
                      onNavigate(module.id);
                    }
                  }}
                >
                  {module.status === 'Available' ? 'Start Planning' : 'Coming Soon'}
                  {module.status === 'Available' && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Framework Explanation */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            The Spark → Shape → Start Framework
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: config.color }}
              >
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">SPARK</h3>
              <p className="text-gray-600">
                Ignite your energy with inspiring planning that gets you excited about the journey ahead.
              </p>
            </div>
            
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: config.color }}
              >
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">SHAPE</h3>
              <p className="text-gray-600">
                Mold your ideas into concrete plans with structured tools and systematic approaches.
              </p>
            </div>
            
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: config.color }}
              >
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">START</h3>
              <p className="text-gray-600">
                Launch into action with confidence, knowing you have everything organized and ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}