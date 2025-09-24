import React, { useState } from 'react';
import { Button } from './ui/button';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [hoveredEmotion, setHoveredEmotion] = useState<string | null>(null);

  const emotions = [
    {
      id: 'excited',
      name: 'Feel Excited',
      description: 'Creative & Energetic',
      color: '#F05959',
      content: {
        title: 'Ideas & Inspiration',
        subtitle: 'Discover new possibilities, get creative inspiration, and spark fresh ideas for your planning journey.',
        mockup: 'listmas'
      }
    },
    {
      id: 'ready',
      name: 'Feel Ready',
      description: 'Organized & Prepared',
      color: '#57C289',
      content: {
        title: 'Plans & Structure',
        subtitle: 'Organize your thoughts, structure your goals, and shape comprehensive plans that work.',
        mockup: 'organization'
      }
    },
    {
      id: 'confident',
      name: 'Feel Confident',
      description: 'Professional & Stable',
      color: '#0F73FF',
      content: {
        title: 'Growth & Achievement',
        subtitle: 'Build confidence through structured progress and achieve your professional and personal goals.',
        mockup: 'finance'
      }
    }
  ];

  const currentEmotion = emotions.find(e => e.id === hoveredEmotion) || emotions[1]; // Default to Ready
  const leftBgColor = hoveredEmotion ? currentEmotion.color : '#030F38';

  return (
    <div className="h-screen flex">
      {/* Left Side - Dynamic Color */}
      <div 
        className="w-1/2 text-white flex flex-col justify-center px-12 transition-colors duration-300"
        style={{ backgroundColor: leftBgColor }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="font-bold" style={{ color: leftBgColor }}>W</span>
          </div>
          <span className="text-2xl font-semibold">WonderList</span>
        </div>

        {/* Emotions */}
        <div className="space-y-8">
          {emotions.map((emotion) => (
            <button
              key={emotion.id}
              onClick={() => onNavigate(emotion.id)}
              onMouseEnter={() => setHoveredEmotion(emotion.id)}
              onMouseLeave={() => setHoveredEmotion(null)}
              className="block text-left hover:bg-white/5 p-4 rounded-lg transition-all duration-200 w-full group"
            >
              <h2 className="text-3xl font-bold mb-2 group-hover:scale-105 transition-transform">
                {emotion.name}
              </h2>
              <p className="text-white/70 text-lg">{emotion.description}</p>
            </button>
          ))}
        </div>

        {/* Bottom Input */}
        <div className="mt-16">
          <input 
            type="text" 
            placeholder="Search modules..."
            className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 transition-colors"
          />
        </div>
      </div>

      {/* Right Side - Dynamic Content */}
      <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center px-12 relative">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 transition-all duration-300">
            {currentEmotion.content.title}
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed transition-all duration-300">
            {currentEmotion.content.subtitle}
          </p>
          
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {emotions.map((emotion, index) => (
              <div 
                key={emotion.id}
                className="w-3 h-3 rounded-full transition-colors duration-300"
                style={{ 
                  backgroundColor: emotion.id === hoveredEmotion ? emotion.color : '#D1D5DB' 
                }}
              />
            ))}
          </div>

          {/* Phone Mockup */}
          {hoveredEmotion === 'excited' && (
            <div className="mb-8 transform transition-all duration-500 scale-100 opacity-100">
              <div className="relative w-48 h-80 mx-auto">
                <div className="absolute inset-0 bg-black rounded-3xl p-1">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                    {/* Phone Status Bar */}
                    <div className="bg-white px-4 py-2 flex justify-between items-center">
                      <span className="text-xs font-medium">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* App Content */}
                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-3">wonderlist.app</div>
                      
                      <h3 className="font-bold text-gray-900 mb-2">Listmas</h3>
                      <p className="text-xs text-gray-600 mb-4">Transform holiday chaos into cherished memories</p>
                      
                      {/* Christmas Image */}
                      <div className="rounded-lg overflow-hidden mb-4">
                        <div className="w-full h-24 bg-gradient-to-br from-red-600 to-green-600 relative flex items-center justify-center">
                          <span className="text-white text-xs font-medium">🎁 Christmas Planning</span>
                        </div>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-gray-900">Quick Actions</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-xs">Gift Tracking</span>
                            <div className="w-2 h-2 bg-[#F05959] rounded-full"></div>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-xs">Holiday Meals</span>
                            <div className="w-2 h-2 bg-[#F05959] rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Progress dots below phone */}
                <div className="flex justify-center gap-1 mt-4">
                  <div className="w-2 h-2 bg-[#F05959] rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          <Button 
            onClick={() => onNavigate(currentEmotion.id === 'excited' ? 'christmas' : currentEmotion.id)}
            className="px-8 py-3 rounded-full text-lg transition-all duration-300"
            style={{ 
              backgroundColor: hoveredEmotion ? currentEmotion.color : '#57C289',
              color: 'white'
            }}
          >
            Get Started
          </Button>
        </div>

        {/* Fixed Get Started in corner */}
        <div className="absolute bottom-8 right-8">
          <Button 
            onClick={() => onNavigate('christmas')}
            className="bg-[#030F38] hover:bg-[#0A1B4A] text-white px-6 py-2 rounded-lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}