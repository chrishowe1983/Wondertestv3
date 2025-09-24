import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wifi, Battery, Signal, Clock, DollarSign, Gift, CheckCircle, Lightbulb, Target, Play, ChevronRight } from 'lucide-react';
import frameImage from 'figma:asset/e9d6a06917de40d5c825b778cce15aabfea8bc0b.png';

interface ChristmasLandingCarouselProps {
  onNavigate: (page: string) => void;
}

const christmasModules = [
  {
    id: 'spark',
    title: 'Spark',
    subtitle: 'Get inspired with creative ideas',
    description: 'Brainstorm and discover new Christmas possibilities',
    image: 'https://images.unsplash.com/photo-1608839000895-1778481bc1a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBnaWZ0cyUyMHdyYXBwaW5nJTIwcGxhbm5pbmd8ZW58MXx8fHwxNzU4NjQzNDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Lightbulb,
    page: 'christmas-spark-interface'
  },
  {
    id: 'shape',
    title: 'Shape',
    subtitle: 'Plan and organize your vision',
    description: 'Structure your Christmas plans systematically',
    image: 'https://images.unsplash.com/photo-1608373763100-33fec005eaac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBmYW1pbHklMjBkaW5uZXIlMjB0YWJsZXxlbnwxfHx8fDE3NTg2NDM0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Target,
    page: 'christmas-shape'
  },
  {
    id: 'start',
    title: 'Start',
    subtitle: 'Execute and make it happen',
    description: 'Take action and bring your Christmas vision to life',
    image: 'https://images.unsplash.com/photo-1754548930515-ac7eb978280d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBjaGVja2xpc3QlMjBvcmdhbml6YXRpb258ZW58MXx8fHwxNzU4NjQzNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Play,
    page: 'christmas-start'
  }
];

const navigationChips = [
  { label: 'Christmas', active: true, page: 'christmas' },
  { label: 'Weddings', active: false, page: 'weddings' },
  { label: 'Babies', active: false, page: 'babies' }
];

const dynamicContent = {
  spark: {
    title: 'Popular Spark Ideas',
    emoji: '✨',
    items: [
      {
        icon: Gift,
        iconBg: 'bg-gray-100 border border-[#F05959]',
        iconColor: 'text-[#F05959]',
        title: 'Help me with gift ideas',
        subtitle: 'AI gift inspiration',
        route: 'gift-inspiration'
      },
      {
        icon: '🌟',
        iconBg: 'bg-gray-100 border border-[#F05959]',
        iconColor: 'text-[#F05959]',
        title: 'Start a new family tradition',
        subtitle: 'International traditions portal',
        route: 'traditions'
      },
      {
        icon: '🍽️',
        iconBg: 'bg-gray-100 border border-[#F05959]',
        iconColor: 'text-[#F05959]',
        title: 'Inspire new festive food',
        subtitle: 'AI recipe folder',
        route: 'christmas-food'
      },
      {
        icon: '🎨',
        iconBg: 'bg-gray-100 border border-[#F05959]',
        iconColor: 'text-[#F05959]',
        title: 'Get Crafty',
        subtitle: 'Christmas craft inspiration',
        route: 'craft-inspiration'
      }
    ]
  },
  shape: {
    title: 'Popular Shape Tools',
    emoji: '🎯',
    items: [
      {
        icon: CheckCircle,
        iconBg: 'bg-gray-100 border border-[#F05959]',
        iconColor: 'text-[#F05959]',
        title: 'Smart Budget Tracker',
        subtitle: 'AI-powered spending alerts',
        route: 'smart-budget-tracker'
      },
      {
        icon: '📅',
        iconBg: 'bg-gray-100 border border-[#F05959]',
        iconColor: 'text-[#F05959]',
        title: 'Holiday Timeline Builder',
        subtitle: 'Automated scheduling assistant',
        route: 'holiday-timeline-builder'
      },
      {
        icon: '👥',
        iconBg: 'bg-gray-100 border border-[#F05959]',
        iconColor: 'text-[#F05959]',
        title: 'Guest List Organizer',
        subtitle: 'RSVP tracking & meal preferences',
        route: 'guest-list-organizer'
      },
      {
        icon: '🛒',
        iconBg: 'bg-gray-100 border border-[#F05959]',
        iconColor: 'text-[#F05959]',
        title: 'Shopping List Optimizer',
        subtitle: 'Store routing & price comparison',
        route: 'shopping-list-optimizer'
      }
    ]
  },
  start: {
    title: 'Popular Start Actions',
    emoji: '🚀',
    items: [
      {
        icon: Clock,
        iconBg: 'bg-gray-100 border border-[#F05959]',
        iconColor: 'text-[#F05959]',
        title: 'Daily Task Scheduler',
        subtitle: 'Smart priority management',
        route: 'daily-task-scheduler'
      },
      {
        icon: '📋',
        iconBg: 'bg-gray-100 border border-[#F05959]',
        iconColor: 'text-[#F05959]',
        title: 'Progress Tracker Dashboard',
        subtitle: 'Real-time completion insights',
        route: 'progress-tracker-dashboard'
      },
      {
        icon: '🎁',
        iconBg: 'bg-gray-100 border border-[#F05959]',
        iconColor: 'text-[#F05959]',
        title: 'Gift Wrap Scheduler',
        subtitle: 'Timing & materials planner',
        route: 'gift-wrap-scheduler'
      },
      {
        icon: '📱',
        iconBg: 'bg-gray-100 border border-[#F05959]',
        iconColor: 'text-[#F05959]',
        title: 'Family Coordination Hub',
        subtitle: 'Shared notifications & updates',
        route: 'family-coordination-hub'
      }
    ]
  }
};

export function ChristmasLandingCarousel({ onNavigate }: ChristmasLandingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate through modules every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % christmasModules.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentModule = christmasModules[currentIndex];
  const currentContent = dynamicContent[currentModule.id as keyof typeof dynamicContent];

  const handleModuleClick = () => {
    onNavigate(currentModule.page);
  };

  const handleChipClick = (page: string) => {
    onNavigate(page);
  };

  const navigationChips = [
    { label: 'Spark Ideas', page: 'christmas-spark', active: currentModule.id === 'spark' },
    { label: 'Shape Tools', page: 'christmas-shape', active: currentModule.id === 'shape' },
    { label: 'Start Actions', page: 'christmas-start', active: currentModule.id === 'start' }
  ];

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Christmas Header */}
      <div className="bg-[#F05959] px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#F05959] font-bold text-lg">C</span>
            </div>
            <h1 className="text-white text-xl font-medium">ChristmasList</h1>
          </div>
          
          {/* Stats Row */}
          <div className="flex gap-8 text-white">
            <div className="text-center">
              <Clock className="w-4 h-4 mx-auto mb-1 opacity-80" />
              <div className="text-xs opacity-80">Days Until Christmas</div>
              <div className="font-medium">45</div>
            </div>
            <div className="text-center">
              <DollarSign className="w-4 h-4 mx-auto mb-1 opacity-80" />
              <div className="text-xs opacity-80">Budget Used</div>
              <div className="font-medium">87%</div>
            </div>
            <div className="text-center">
              <Gift className="w-4 h-4 mx-auto mb-1 opacity-80" />
              <div className="text-xs opacity-80">Gifts Planned</div>
              <div className="font-medium">12</div>
            </div>
            <div className="text-center">
              <CheckCircle className="w-4 h-4 mx-auto mb-1 opacity-80" />
              <div className="text-xs opacity-80">Tasks Complete</div>
              <div className="font-medium">23</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        
        {/* Left Side - Phone Mockup Carousel */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center">
          <div className="relative">
            {/* Phone Frame */}
            <div className="w-80 h-[640px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                
                {/* Status Bar */}
                <div className="flex justify-between items-center px-6 pt-4 pb-2">
                  <div className="font-medium">9:41</div>
                  <div className="flex items-center gap-1">
                    <Signal className="w-4 h-4" />
                    <Wifi className="w-4 h-4" />
                    <Battery className="w-6 h-3" />
                  </div>
                </div>
                
                {/* Browser Bar */}
                <div className="px-6 pb-4">
                  <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">wonderlist.app</span>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="h-full flex flex-col cursor-pointer"
                      onClick={handleModuleClick}
                    >
                      {/* Module Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gray-100 border-2 border-[#F05959] rounded-full flex items-center justify-center">
                          <currentModule.icon className="w-6 h-6 text-[#F05959]" />
                        </div>
                        <div>
                          <h1 className="text-2xl font-medium text-gray-900">
                            {currentModule.title}
                          </h1>
                          <p className="text-gray-600 text-sm">
                            {currentModule.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      {/* Module Image */}
                      <div className="flex-1 bg-gray-200 rounded-2xl overflow-hidden mb-4">
                        <img 
                          src={currentModule.image} 
                          alt={currentModule.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* CTA Button */}
                      <button className="w-full bg-[#F05959] text-white py-3 rounded-full font-medium">
                        Get Inspired
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            
            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {christmasModules.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-[#F05959]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Dynamic Content */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[#F05959] text-xl">{currentContent.emoji}</span>
                  <h2 className="text-xl font-medium">{currentContent.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {currentContent.items.map((item, index) => (
                    <div 
                      key={index} 
                      onClick={() => onNavigate(item.route)}
                      className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md cursor-pointer transition-all duration-200 border border-transparent hover:border-[#F05959]/20"
                    >
                      <div className={`w-10 h-10 ${item.iconBg} rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                        {typeof item.icon === 'string' ? (
                          <span className={`${item.iconColor} text-lg`}>{item.icon}</span>
                        ) : (
                          <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-[#F05959] transition-colors duration-200">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{item.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#F05959] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Go
                        </span>
                        <div className="w-8 h-8 bg-[#F05959] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Chips */}
      <div className="px-6 pb-6">
        <div className="text-center mb-6">
          <h2 className="text-xl text-gray-800">
            Transform planning into a celebration
          </h2>
        </div>
        
        <div className="flex gap-3 justify-center">
          {navigationChips.map((chip) => (
            <button
              key={chip.label}
              onClick={() => handleChipClick(chip.page)}
              className={`px-6 py-3 rounded-full border transition-colors ${
                chip.active
                  ? 'bg-[#F05959] text-white border-[#F05959]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}