import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Clock, DollarSign, Gift, Users, Sparkles, Target, Play } from 'lucide-react';

interface ChristmasPageProps {
  onNavigate: (page: string) => void;
}

export function ChristmasPage({ onNavigate }: ChristmasPageProps) {
  const [activePhase, setActivePhase] = useState<'spark' | 'shape' | 'start'>('spark');

  const phases = {
    spark: {
      title: 'Spark',
      subtitle: 'Get inspired with creative ideas',
      color: '#F05959',
      icon: Sparkles,
      content: [
        {
          icon: Gift,
          title: 'Help me with gift ideas',
          subtitle: 'AI gift inspiration',
          action: () => onNavigate('christmas-gifts')
        },
        {
          icon: '⭐',
          title: 'Start a new family tradition',
          subtitle: 'International traditions portal',
          action: () => onNavigate('christmas-traditions')
        },
        {
          icon: 'H',
          title: 'Inspire new festive food',
          subtitle: 'AI recipe folder',
          action: () => onNavigate('christmas-food-list')
        },
        {
          icon: 'K',
          title: 'Get Crafty',
          subtitle: 'Christmas craft inspiration',
          action: () => onNavigate('christmas-gift-wrap')
        }
      ]
    },
    shape: {
      title: 'Shape',
      subtitle: 'Organize and structure your plans',
      color: '#6B7280',
      icon: Target,
      content: [
        {
          icon: DollarSign,
          title: 'Budget your Christmas',
          subtitle: 'Smart spending tracker',
          action: () => onNavigate('christmas-budget')
        },
        {
          icon: Users,
          title: 'Organize your guest list',
          subtitle: 'Guest management system',
          action: () => onNavigate('christmas-guests')
        },
        {
          icon: Clock,
          title: 'Create your timeline',
          subtitle: 'Holiday schedule planner',
          action: () => onNavigate('christmas-timeline')
        },
        {
          icon: '🛍️',
          title: 'Plan your shopping',
          subtitle: 'Coordinated shopping trips',
          action: () => onNavigate('christmas-shopping')
        }
      ]
    },
    start: {
      title: 'Start',
      subtitle: 'Execute your Christmas plans',
      color: '#000000',
      icon: Play,
      content: [
        {
          icon: '📞',
          title: 'Make reservations',
          subtitle: 'Restaurant & venue bookings',
          action: () => onNavigate('christmas-reservations')
        },
        {
          icon: '💌',
          title: 'Send invitations',
          subtitle: 'Beautiful invitation management',
          action: () => onNavigate('christmas-invitations')
        },
        {
          icon: '🎀',
          title: 'Schedule gift wrapping',
          subtitle: 'Organized wrapping timeline',
          action: () => onNavigate('christmas-gift-wrap')
        },
        {
          icon: '💝',
          title: 'Prepare thank you notes',
          subtitle: 'Gratitude management',
          action: () => onNavigate('christmas-thank-you')
        }
      ]
    }
  };

  const currentPhase = phases[activePhase];
  const PhaseIcon = currentPhase.icon;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-[#F05959] text-white py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#F05959] font-bold">L</span>
              </div>
              <span className="text-xl font-semibold">Listmas</span>
            </div>
            
            <div className="flex items-center gap-8 text-sm">
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Days Until Christmas</span>
                </div>
                <div className="text-2xl font-bold">45</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>Budget Used</span>
                </div>
                <div className="text-2xl font-bold">67%</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Gift className="h-4 w-4" />
                  <span>Gifts Planned</span>
                </div>
                <div className="text-2xl font-bold">12</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Tasks Complete</span>
                </div>
                <div className="text-2xl font-bold">23</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Mobile Mockup & Phase Selector */}
          <div className="col-span-1">
            {/* Phase Selector */}
            <div className="mb-6">
              <div className="flex gap-2 p-1 bg-white rounded-lg">
                {Object.entries(phases).map(([key, phase]) => {
                  const Icon = phase.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setActivePhase(key as 'spark' | 'shape' | 'start')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all ${
                        activePhase === key
                          ? 'text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      style={{
                        backgroundColor: activePhase === key ? phase.color : 'transparent'
                      }}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{phase.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Phone Frame */}
            <div className="relative">
              <div className="relative w-64 h-[500px] mx-auto">
                <div className="absolute inset-0 bg-black rounded-3xl p-2">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                    {/* Phone Header */}
                    <div className="bg-white px-4 py-3 flex items-center justify-between">
                      <span className="text-sm font-medium">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                          <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                          <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* App Content */}
                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-2">wonderlist.app</div>
                      
                      <h3 className="font-bold text-gray-900 mb-2">Listmas</h3>
                      <p className="text-xs text-gray-600 mb-4">Transform holiday chaos into cherished memories</p>
                      
                      {/* Phase Section */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: currentPhase.color }}
                          >
                            <PhaseIcon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{currentPhase.title}</h4>
                            <p className="text-xs text-gray-500">{currentPhase.subtitle}</p>
                          </div>
                        </div>
                        
                        {/* Christmas Image */}
                        <div className="rounded-lg overflow-hidden mb-3">
                          <div 
                            className="w-full h-32 relative flex items-center justify-center text-white font-medium"
                            style={{ 
                              background: `linear-gradient(135deg, ${currentPhase.color} 0%, rgba(0,0,0,0.3) 100%), linear-gradient(to right, #dc2626, #059669)`
                            }}
                          >
                            <span className="text-xs">Christmas {currentPhase.title}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="space-y-2">
                        <h5 className="text-xs font-medium text-gray-900">Quick Actions</h5>
                        <div className="space-y-2">
                          {currentPhase.content.slice(0, 2).map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-xs">{item.title}</span>
                              <div 
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: currentPhase.color }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Phase Indicator */}
              <div className="flex justify-center gap-1 mt-4">
                {Object.keys(phases).map((phase, index) => (
                  <div 
                    key={phase}
                    className="w-2 h-2 rounded-full transition-colors"
                    style={{ 
                      backgroundColor: phase === activePhase ? currentPhase.color : '#D1D5DB' 
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Current Phase Content */}
          <div className="col-span-2">
            <Card className="p-6 bg-white rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${currentPhase.color}20` }}
                >
                  <PhaseIcon className="h-5 w-5" style={{ color: currentPhase.color }} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{currentPhase.title} Phase</h2>
                  <p className="text-sm text-gray-600">{currentPhase.subtitle}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {currentPhase.content.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={item.action}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: currentPhase.color }}
                      >
                        {typeof item.icon === 'string' ? (
                          <span className="text-white">{item.icon}</span>
                        ) : (
                          <item.icon className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.subtitle}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="text-white rounded-full"
                      style={{ backgroundColor: currentPhase.color }}
                    >
                      Go <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-8">
          <p className="text-gray-600">Transform planning into a celebration</p>
        </div>
      </div>
    </div>
  );
}