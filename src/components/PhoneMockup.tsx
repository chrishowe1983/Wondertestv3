import React, { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PhoneMockupProps {
  emotion: 'excited' | 'ready' | 'confident';
}

export function PhoneMockup({ emotion }: PhoneMockupProps) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  const getEmotionModules = () => {
    switch (emotion) {
      case 'excited':
        return [
          {
            appName: 'Listmas',
            tagline: 'Transform holiday chaos into cherished memories',
            image: 'https://images.unsplash.com/photo-1639408401592-916f6d550455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBob2xpZGF5JTIwZ2lmdHMlMjBmYW1pbHl8ZW58MXx8fHwxNzU4MzA3MDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            bgColor: 'bg-[#F05959]',
            actions: ['Gift Tracking', 'Holiday Meals', 'Family Wishlists']
          },
          {
            appName: 'WeddingSync',
            tagline: 'Turn wedding planning into joyful anticipation',
            image: 'https://images.unsplash.com/photo-1754200481980-0f364f016b2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGxhbm5pbmclMjBicmlkZSUyMGRyZXNzfGVufDF8fHx8MTc1ODMwNzAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            bgColor: 'bg-[#F05959]',
            actions: ['Plan Ceremony', 'Guest Management', 'Vendor Coordination']
          },
          {
            appName: 'BabyPrep',
            tagline: 'Never miss a milestone in your journey to parenthood',
            image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwbnVyc2VyeSUyMGNyaWIlMjB0b3lzfGVufDF8fHx8MTc1ODMwNDAzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            bgColor: 'bg-[#F05959]',
            actions: ['Pregnancy Timeline', 'Nursery Setup', 'Baby Budgeting']
          }
        ];
      case 'ready':
        return [
          {
            appName: 'HomeSync',
            tagline: 'Keep your family and home perfectly organized',
            image: 'https://images.unsplash.com/photo-1626845859736-1e3b99b5a6d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwb3JnYW5pemF0aW9ufGVufDF8fHx8MTc1ODMxOTM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            bgColor: 'bg-[#57C289]',
            actions: ['Task Lists', 'Family Calendar', 'Home Maintenance']
          },
          {
            appName: 'KitchenSync',
            tagline: 'Transform meal planning into organized efficiency',
            image: 'https://images.unsplash.com/photo-1623194913613-947703662196?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbml6ZWQlMjBraXRjaGVuJTIwbWVhbCUyMHByZXB8ZW58MXx8fHwxNzU4MzE5MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            bgColor: 'bg-[#57C289]',
            actions: ['Weekly Meal Plan', 'Grocery Lists', 'Nutrition Tracking']
          },
          {
            appName: 'SchoolSync',
            tagline: 'Keep your family\'s education on track',
            image: 'https://images.unsplash.com/photo-1474749281103-fb4bc1a29c1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBzdHVkeSUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NTgzMTk0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            bgColor: 'bg-[#57C289]',
            actions: ['Academic Planning', 'Homework Tracking', 'Progress Reports']
          }
        ];
      case 'confident':
        return [
          {
            appName: 'FinanceSync',
            tagline: 'Build financial confidence through smart planning',
            image: 'https://images.unsplash.com/photo-1745301754104-4effee07d6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGNoYXJ0c3xlbnwxfHx8fDE3NTgyOTczMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            bgColor: 'bg-[#0F73FF]',
            actions: ['Budget Tracking', 'Investment Goals', 'Financial Security']
          },
          {
            appName: 'Ascent',
            tagline: 'Accelerate your career development',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBncm93dGh8ZW58MXx8fHwxNzU4MzE5NDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            bgColor: 'bg-[#0F73FF]',
            actions: ['Skill Development', 'Career Planning', 'Network Building']
          },
          {
            appName: 'Transitions',
            tagline: 'Manage major life transitions with confidence',
            image: 'https://images.unsplash.com/photo-1523200466058-5e3e5f2d4ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlJTIwY2hhbmdlJTIwdHJhbnNpdGlvbnxlbnwxfHx8fDE3NTgzMTk0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            bgColor: 'bg-[#0F73FF]',
            actions: ['Health Tracking', 'Moving Coordination', 'Life Planning']
          }
        ];
      default:
        return [];
    }
  };

  const modules = getEmotionModules();
  const currentModule = modules[currentModuleIndex];

  // Auto-advance through modules every 3 seconds
  useEffect(() => {
    if (modules.length > 1) {
      const interval = setInterval(() => {
        setCurrentModuleIndex((prev) => (prev + 1) % modules.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [modules.length]);

  // Reset to first module when emotion changes
  useEffect(() => {
    setCurrentModuleIndex(0);
  }, [emotion]);

  if (!currentModule) return null;

  const { appName, tagline, image, bgColor, actions } = currentModule;

  return (
    <div className="relative">
      {/* Phone Frame */}
      <div className="relative w-52 h-[380px] md:w-80 md:h-[600px] mx-auto">
        {/* Phone Outline */}
        <div className="absolute inset-0 bg-gray-900 rounded-[2.5rem] p-3">
          {/* Screen */}
          <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-3 md:px-6 py-2 md:py-3 bg-white">
              <span className="text-black text-sm md:text-base">9:41</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-3 md:w-4 h-1.5 md:h-2 bg-black rounded-sm"></div>
              </div>
            </div>

            {/* Browser Bar */}
            <div className="px-3 md:px-6 py-1.5 md:py-2 bg-gray-50 border-b">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 md:w-3 h-2 md:h-3 bg-red-500 rounded-full"></div>
                  <div className="w-2 md:w-3 h-2 md:h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 md:w-3 h-2 md:h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs md:text-sm text-gray-500">wonderlist.app</span>
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className="h-full bg-gray-50">
              {/* App Header */}
              <div className="p-3 md:p-6 pb-2 md:pb-4">
                <h1 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">{appName}</h1>
                <p className="text-sm md:text-base text-gray-600">{tagline}</p>
              </div>

              {/* Featured Image */}
              <div className="px-3 md:px-6 mb-3 md:mb-6">
                <div className="w-full h-32 md:h-48 rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src={image}
                    alt={`${appName} preview`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Action Section */}
              <div className="px-3 md:px-6">
                <div className="bg-white rounded-xl p-2 md:p-4 shadow-sm">
                  <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2 md:mb-3">Quick Actions</h3>
                  <div className="space-y-1 md:space-y-2">
                    {actions.map((action, index) => (
                      <div key={index} className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="text-xs md:text-sm text-gray-700">{action}</span>
                        <div className={`w-4 md:w-5 h-4 md:h-5 ${bgColor} rounded-full flex items-center justify-center`}>
                          <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-2 md:mt-4 bg-white rounded-xl p-2 md:p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-1 md:mb-2">
                    <span className="text-xs md:text-sm text-gray-700">Today's Progress</span>
                    <span className="text-xs md:text-sm text-gray-500">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                    <div className={`${bgColor} h-1.5 md:h-2 rounded-full`} style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Reflection */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 rounded-[2.5rem] pointer-events-none"></div>
      </div>

      {/* Module Navigation Dots */}
      {modules.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {modules.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentModuleIndex 
                  ? bgColor
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}