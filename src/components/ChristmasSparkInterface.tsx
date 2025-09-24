import React, { useState, useEffect, useRef } from 'react';
import { Clock, DollarSign, Gift, CheckCircle, Lightbulb, Search, Sparkles, Package, Calendar, Users, ShoppingCart, Heart, Star, Globe, ChefHat, Scissors } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface SparkIdeaProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

function StageItem({ title, subtitle, icon, onClick, stageColor }: SparkIdeaProps & { stageColor: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-left w-full group"
      style={{ 
        '--hover-color': stageColor,
        '--hover-bg': stageColor + '05'
      } as React.CSSProperties}
    >
      <div className="flex-shrink-0 w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-gray-100 transition-colors">
        {icon}
      </div>
      <div className="flex-grow">
        <div className="text-gray-700 group-hover:text-gray-900 transition-colors font-medium">{title}</div>
        {subtitle && (
          <div className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">{subtitle}</div>
        )}
      </div>
      <div className="ml-auto opacity-40 group-hover:opacity-60 transition-opacity">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </button>
  );
}

interface ChristmasSparkInterfaceProps {
  onNavigate?: (page: string) => void;
}

export function ChristmasSparkInterface({ onNavigate }: ChristmasSparkInterfaceProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStage, setCurrentStage] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stages = [
    {
      title: 'Spark',
      subtitle: 'Get inspired with creative ideas',
      icon: <Lightbulb className="w-6 h-6 text-white" />,
      color: '#F05959',
      searchPlaceholder: "What inspires you? Try 'gift ideas for mom' or 'creative decorations'",
      buttonText: 'Get Inspired'
    },
    {
      title: 'Shape',
      subtitle: 'Organize your holiday plans',
      icon: <Package className="w-6 h-6 text-white" />,
      color: '#6B7280',
      searchPlaceholder: "What do you need to organize? Try 'gift lists' or 'holiday timeline'",
      buttonText: 'Get Organized'
    },
    {
      title: 'Start',
      subtitle: 'Put your plans into action',
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      color: '#1F2937',
      searchPlaceholder: "What's your next step? Try 'shopping list' or 'party planning'",
      buttonText: 'Take Action'
    }
  ];

  const stageContent = {
    0: { // Spark
      sectionTitle: 'Popular Spark Ideas',
      sectionIcon: <Sparkles className="w-4 h-4 text-[#F05959]" />,
      items: [
        { title: 'Help me with gift ideas', subtitle: 'AI gift inspiration', icon: <Gift className="w-4 h-4 text-[#F05959]" />, page: 'gift-inspiration' },
        { title: 'Start a new family tradition', subtitle: 'International traditions portal', icon: <Globe className="w-4 h-4 text-[#F05959]" />, page: 'traditions' },
        { title: 'Inspire new festive food', subtitle: 'AI recipe folder', icon: <ChefHat className="w-4 h-4 text-[#F05959]" />, page: 'christmas-food' },
        { title: 'Get Crafty', subtitle: 'Christmas craft inspiration', icon: <Scissors className="w-4 h-4 text-[#F05959]" />, page: 'craft-inspiration' }
      ]
    },
    1: { // Shape
      sectionTitle: 'Organization Tools',
      sectionIcon: <Package className="w-4 h-4 text-[#6B7280]" />,
      items: [
        { title: 'Gift lists by person', icon: <Users className="w-4 h-4 text-[#6B7280]" />, page: 'gift-list' },
        { title: 'Holiday timeline planner', icon: <Calendar className="w-4 h-4 text-[#6B7280]" />, page: 'holiday-timeline' },
        { title: 'Budget tracker', icon: <DollarSign className="w-4 h-4 text-[#6B7280]" />, page: 'festive-budget' },
        { title: 'Party planning checklist', icon: <CheckCircle className="w-4 h-4 text-[#6B7280]" />, page: 'party-planning' }
      ]
    },
    2: { // Start
      sectionTitle: 'Action Steps',
      sectionIcon: <CheckCircle className="w-4 h-4 text-[#1F2937]" />,
      items: [
        { title: 'Create shopping lists', icon: <ShoppingCart className="w-4 h-4 text-[#1F2937]" />, page: 'festive-shopping' },
        { title: 'Book holiday reservations', icon: <Calendar className="w-4 h-4 text-[#1F2937]" />, page: 'holiday-reservations' },
        { title: 'Send invitations', icon: <Heart className="w-4 h-4 text-[#1F2937]" />, page: 'holiday-invitations' },
        { title: 'Order online gifts', icon: <Star className="w-4 h-4 text-[#1F2937]" />, page: 'online-gift-ordering' }
      ]
    }
  };

  const currentStageData = stages[currentStage];
  const currentContent = stageContent[currentStage as keyof typeof stageContent];

  // Auto-rotation logic
  useEffect(() => {
    if (!isAutoRotating || isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % stages.length);
    }, 4000); // Change stage every 4 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoRotating, isPaused, stages.length]);

  // Handle manual stage changes
  const handleStageChange = (index: number) => {
    setCurrentStage(index);
    setIsAutoRotating(false); // Stop auto-rotation when user manually changes
    
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoRotating(true);
    }, 10000);
  };

  // Handle pause/resume on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleStageAction = () => {
    const stageActions = ['Getting inspired with:', 'Getting organized with:', 'Taking action on:'];
    console.log(stageActions[currentStage], searchQuery);
    // Pause auto-rotation when user interacts
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 15000); // Resume after 15 seconds
  };

  // Handle search input interaction
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsAutoRotating(false); // Pause when typing
    setTimeout(() => setIsAutoRotating(true), 8000); // Resume after 8 seconds
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header Stats Bar */}
      <div className="bg-[#F05959] text-white p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#F05959] font-bold text-lg">C</span>
              </div>
              <h1 className="text-xl font-semibold">ChristmasList</h1>
            </div>

            {/* Stats */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <div className="text-center">
                  <div className="text-xs opacity-90">Days Until Christmas</div>
                  <div className="font-bold">45</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <div className="text-center">
                  <div className="text-xs opacity-90">Budget Used</div>
                  <div className="font-bold">67%</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <div className="text-center">
                  <div className="text-xs opacity-90">Gifts Planned</div>
                  <div className="font-bold">12</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <div className="text-center">
                  <div className="text-xs opacity-90">Tasks Complete</div>
                  <div className="font-bold">23</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div 
          className="bg-white rounded-2xl shadow-lg min-h-[500px] overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="grid md:grid-cols-2 h-full">
            {/* Left Panel - Stage Info and Search */}
            <div className="bg-gray-50 p-8 flex flex-col justify-center items-center text-center border-r border-gray-200">
              {/* Dynamic Stage Box */}
              <Card 
                className="border-2 bg-white p-6 rounded-xl max-w-sm w-full mb-6 transition-all duration-300"
                style={{ borderColor: currentStageData.color }}
              >
                <div className="flex flex-col items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                    style={{ backgroundColor: currentStageData.color }}
                  >
                    {currentStageData.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">{currentStageData.title}</h2>
                    <p className="text-sm text-gray-600">{currentStageData.subtitle}</p>
                  </div>
                </div>
              </Card>

              {/* Search Section - Below Stage Box */}
              <div className="w-full max-w-sm mb-6">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder={currentStageData.searchPlaceholder}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10 py-3 text-sm bg-white rounded-full border transition-colors duration-300"
                    style={{ 
                      borderColor: currentStageData.color + '40' // 25% opacity
                    }}
                  />
                </div>
                <Button 
                  onClick={handleStageAction}
                  className="w-full text-white py-3 rounded-full transition-colors duration-300"
                  style={{ 
                    backgroundColor: currentStageData.color,
                    '--tw-shadow-color': currentStageData.color + '50'
                  } as React.CSSProperties}
                >
                  {currentStageData.buttonText}
                </Button>
              </div>

              {/* Stage Navigation Dots */}
              <div className="flex gap-2 items-center">
                {stages.map((stage, index) => (
                  <button
                    key={index}
                    onClick={() => handleStageChange(index)}
                    className="w-3 h-3 rounded-full transition-all duration-200 hover:scale-110 relative"
                    style={{
                      backgroundColor: index === currentStage ? stage.color : '#d1d5db'
                    }}
                  >
                    {/* Auto-rotation progress indicator */}
                    {index === currentStage && isAutoRotating && !isPaused && (
                      <div 
                        className="absolute inset-0 rounded-full border-2 border-white/50"
                        style={{
                          animation: 'rotate-progress 4s linear infinite',
                          borderTopColor: 'white'
                        }}
                      />
                    )}
                  </button>
                ))}
                
                {/* Auto-rotation control */}
                <button
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className="ml-2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                  title={isAutoRotating ? 'Pause auto-rotation' : 'Resume auto-rotation'}
                >
                  {isAutoRotating && !isPaused ? (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 4h2v12H6V4zm6 0h2v12h-2V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l8-5-8-5z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Right Panel - Dynamic Content */}
            <div className="p-8">
              <div className="max-w-md mx-auto">
                {/* Dynamic Content Based on Stage */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {currentContent.sectionIcon}
                    <h3 className="font-semibold text-gray-900">{currentContent.sectionTitle}</h3>
                  </div>
                  <div className="space-y-3">
                    {currentContent.items.map((item, index) => (
                      <StageItem
                        key={index}
                        title={item.title}
                        subtitle={item.subtitle}
                        icon={item.icon}
                        stageColor={currentStageData.color}
                        onClick={() => {
                          if (onNavigate && item.page) {
                            onNavigate(item.page);
                          } else {
                            console.log(`${currentStageData.title} - Clicked:`, item.title);
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}