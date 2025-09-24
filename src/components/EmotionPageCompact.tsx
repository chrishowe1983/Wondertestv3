import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Home, Gift, Heart, Baby, ExternalLink, Calendar, Users, DollarSign, Camera, MapPin, Clock, Utensils, GraduationCap, TrendingUp, RefreshCw } from 'lucide-react';
import { ModuleGrid } from './ModuleGrid';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SideMenu } from './SideMenu';
import type { Emotion } from '../App';

interface EmotionPageProps {
  emotion: Emotion;
  onNavigate: (page: string) => void;
}

// App collections for each emotion
const emotionApps = {
  excited: [
    {
      id: 'christmas',
      name: 'Listmas',
      subtitle: 'Christmas Planning Made Magical',
      description: 'Transform holiday chaos into cherished memories',
      features: ['Gift tracking & budgets', 'Family wishlist sharing', 'Holiday meal planning', 'Festive event coordination'],
      benefits: ['Stress-free holidays', 'Magical moments', 'Budget control', 'Family joy'],
      image: "https://images.unsplash.com/photo-1639408401592-916f6d550455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBob2xpZGF5JTIwZ2lmdHMlMjBmYW1pbHl8ZW58MXx8fHwxNzU4MzA3MDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Gift,
      relatedApps: [
        { name: 'Listmas', subtitle: 'Gift & Holiday Planning', status: 'Available', tags: ['Gifts', 'Family', 'Holiday'] },
        { name: 'FestiveSync', subtitle: 'Holiday Event Coordination', status: 'Coming Soon', tags: ['Events', 'Family', 'Planning'] }
      ]
    },
    {
      id: 'weddings',
      name: 'WeddingSync',
      subtitle: 'Your Dream Wedding, Organized',
      description: 'Turn wedding planning into joyful anticipation',
      features: ['Vendor management', 'Guest list & RSVPs', 'Timeline & checklist', 'Budget tracking'],
      benefits: ['Stress-free planning', 'Perfect day coordination', 'Budget clarity', 'Memorable celebration'],
      image: "https://images.unsplash.com/photo-1754200481980-0f364f016b2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGxhbm5pbmclMjBicmlkZSUyMGRyZXNzfGVufDF8fHx8MTc1ODMwNzAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Heart,
      relatedApps: [
        { name: 'WeddingSync', subtitle: 'Complete Wedding Planning', status: 'Available', tags: ['Wedding', 'Planning', 'Love'] },
        { name: 'WeddingPro', subtitle: 'Professional Wedding Tools', status: 'Coming Soon', tags: ['Vendor', 'Pro', 'Business'] }
      ]
    },
    {
      id: 'babies',
      name: 'BabyPrep',
      subtitle: 'Welcome Your Little Miracle',
      description: 'Never miss a milestone in your journey to parenthood',
      features: ['Pregnancy timeline', 'Baby milestone tracking', 'Nursery setup guide', 'Baby budgeting'],
      benefits: ['Prepared parenthood', 'Milestone memories', 'Budget confidence', 'Family readiness'],
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwbnVyc2VyeSUyMGNyaWIlMjB0b3lzfGVufDF8fHx8MTc1ODMwNDAzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Baby,
      relatedApps: [
        { name: 'BabyPrep', subtitle: 'Pregnancy & Baby Planning', status: 'Available', tags: ['Baby', 'Pregnancy', 'Family'] },
        { name: 'FamilySync', subtitle: 'Growing Family Organization', status: 'Coming Soon', tags: ['Family', 'Growth', 'Kids'] }
      ]
    }
  ],
  ready: [
    {
      id: 'home',
      name: 'HomeSync',
      subtitle: 'Household Organization Made Simple',
      description: 'Keep your family and home perfectly organized',
      features: ['Household task lists', 'Family calendars', 'Home maintenance tracking', 'Family vault'],
      benefits: ['Organized home', 'Efficient routines', 'Family coordination', 'Peace of mind'],
      image: "https://images.unsplash.com/photo-1626845859736-1e3b99b5a6d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwb3JnYW5pemF0aW9ufGVufDF8fHx8MTc1ODMxOTM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Home,
      relatedApps: [
        { name: 'HomeSync', subtitle: 'Household Lists & Organization', status: 'Available', tags: ['Home', 'Family', 'Organization'] },
        { name: 'HomeVault', subtitle: 'Family Document Storage', status: 'Coming Soon', tags: ['Documents', 'Security', 'Family'] }
      ]
    },
    {
      id: 'meals',
      name: 'KitchenSync',
      subtitle: 'Effortless Meal Planning',
      description: 'Transform meal planning into organized efficiency',
      features: ['Weekly meal planning', 'Smart grocery lists', 'Nutrition tracking', 'Recipe management'],
      benefits: ['Healthy eating', 'Time savings', 'Budget control', 'Family nutrition'],
      image: "https://images.unsplash.com/photo-1623194913613-947703662196?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbml6ZWQlMjBraXRjaGVuJTIwbWVhbCUyMHByZXB8ZW58MXx8fHwxNzU4MzE5MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Utensils,
      relatedApps: [
        { name: 'KitchenSync', subtitle: 'Meal Planning & Nutrition', status: 'Available', tags: ['Meals', 'Health', 'Planning'] },
        { name: 'NutritionPro', subtitle: 'Advanced Nutrition Tracking', status: 'Coming Soon', tags: ['Nutrition', 'Health', 'Tracking'] }
      ]
    },
    {
      id: 'school',
      name: 'SchoolSync',
      subtitle: 'Academic Excellence Organized',
      description: 'Keep your family\'s education on track',
      features: ['Academic planning', 'Homework tracking', 'School calendars', 'Progress monitoring'],
      benefits: ['Academic success', 'Organized learning', 'Family coordination', 'Educational growth'],
      image: "https://images.unsplash.com/photo-1474749281103-fb4bc1a29c1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBzdHVkeSUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NTgzMTk0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: GraduationCap,
      relatedApps: [
        { name: 'SchoolSync', subtitle: 'Academic Planning & Tracking', status: 'Available', tags: ['School', 'Education', 'Planning'] },
        { name: 'StudyPro', subtitle: 'Advanced Study Tools', status: 'Coming Soon', tags: ['Study', 'Learning', 'Academic'] }
      ]
    }
  ],
  confident: [
    {
      id: 'finance',
      name: 'FinanceSync',
      subtitle: 'Smart Financial Planning',
      description: 'Build financial confidence through smart planning',
      features: ['Budget tracking', 'Investment planning', 'Financial goals', 'Expense monitoring'],
      benefits: ['Financial security', 'Smart investing', 'Budget control', 'Future planning'],
      image: "https://images.unsplash.com/photo-1745301754104-4effee07d6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGNoYXJ0c3xlbnwxfHx8fDE3NTgyOTczMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: DollarSign,
      relatedApps: [
        { name: 'FinanceSync', subtitle: 'Personal Finance Management', status: 'Available', tags: ['Finance', 'Budget', 'Planning'] },
        { name: 'InvestPro', subtitle: 'Investment Portfolio Tracking', status: 'Coming Soon', tags: ['Investment', 'Portfolio', 'Growth'] }
      ]
    },
    {
      id: 'careers',
      name: 'Ascent',
      subtitle: 'Professional Growth Platform',
      description: 'Accelerate your career development',
      features: ['Skill development', 'Career planning', 'Network building', 'Goal tracking'],
      benefits: ['Career advancement', 'Skill growth', 'Professional network', 'Goal achievement'],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBncm93dGh8ZW58MXx8fHwxNzU4MzE5NDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: TrendingUp,
      relatedApps: [
        { name: 'Ascent', subtitle: 'Career Development Platform', status: 'Available', tags: ['Career', 'Growth', 'Development'] },
        { name: 'NetworkPro', subtitle: 'Professional Networking Tools', status: 'Coming Soon', tags: ['Network', 'Professional', 'Connections'] }
      ]
    },
    {
      id: 'life-change',
      name: 'Transitions',
      subtitle: 'Navigate Life Changes',
      description: 'Manage major life transitions with confidence',
      features: ['Health tracking', 'Moving coordination', 'Life planning', 'Goal setting'],
      benefits: ['Smooth transitions', 'Health improvement', 'Organized changes', 'Life clarity'],
      image: "https://images.unsplash.com/photo-1523200466058-5e3e5f2d4ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlJTIwY2hhbmdlJTIwdHJhbnNpdGlvbnxlbnwxfHx8fDE3NTgzMTk0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: RefreshCw,
      relatedApps: [
        { name: 'Transitions', subtitle: 'Life Change Management', status: 'Available', tags: ['Life Change', 'Health', 'Planning'] },
        { name: 'WellnessPro', subtitle: 'Comprehensive Wellness Tracking', status: 'Coming Soon', tags: ['Wellness', 'Health', 'Fitness'] }
      ]
    }
  ]
};

export function EmotionPage({ emotion, onNavigate }: EmotionPageProps) {
  const [currentAppIndex, setCurrentAppIndex] = useState(0);
  
  // Get apps specific to the current emotion
  const currentEmotionApps = emotionApps[emotion.id as keyof typeof emotionApps] || [];
  const currentApp = currentEmotionApps[currentAppIndex];

  // Get all apps for the right panel (flatten all related apps)
  const allAvailableApps = currentEmotionApps.flatMap(app => app.relatedApps);

  useEffect(() => {
    if (currentEmotionApps.length > 0) {
      const interval = setInterval(() => {
        setCurrentAppIndex((prev) => (prev + 1) % currentEmotionApps.length);
      }, 4000); // Change every 4 seconds

      return () => clearInterval(interval);
    }
  }, [emotion.id, currentEmotionApps.length]);

  return (
    <div className="h-full flex flex-col md:flex-row relative -mt-16 md:mt-0 pt-16 md:pt-0">
      
      {currentApp ? (
        // Streamlined layout with carousel left, all apps right
        <>
          {/* Left Side - Carousel with rotating content */}
          <div className={`w-full md:w-1/2 text-white p-4 md:p-8 flex flex-col ${emotion.bgColor}`}>
            {/* Logo */}
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full"></div>
              <span className="text-xl md:text-2xl font-bold">Wonderlist</span>
            </div>

            {/* Feel Section */}
            <div className="mb-4 md:mb-6">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-1 h-12 md:h-16 bg-white"></div>
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold">Feel {emotion.name}</h1>
                  <p className="text-base md:text-lg text-white/90 italic mt-2">
                    Turn your ideas into a true celebration
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Screen - Responsive */}
            <div className="flex-1 flex justify-center md:justify-start">
              <div 
                className={`w-80 h-[500px] md:w-96 md:h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-200 ${ 
                  currentApp?.id === 'christmas' 
                    ? 'cursor-pointer hover:shadow-2xl md:hover:scale-105' 
                    : 'cursor-default'
                }`}
                onClick={() => {
                  if (currentApp?.id === 'christmas') {
                    onNavigate('christmas');
                  }
                }}
              >
                {/* Status Bar */}
                <div className="flex justify-between items-center px-4 md:px-8 py-2 md:py-4 text-black font-medium text-base md:text-lg">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="flex gap-0.5">
                      <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-black rounded-full"></div>
                      <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-black rounded-full"></div>
                      <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-black rounded-full"></div>
                      <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-black rounded-full"></div>
                    </div>
                    <div className="w-4 md:w-5 h-2 md:h-2.5 border border-black rounded-sm">
                      <div className="w-full h-full bg-black rounded-sm"></div>
                    </div>
                  </div>
                </div>

                {/* Browser Bar */}
                <div className="mx-3 md:mx-6 mb-3 md:mb-6 bg-gray-100 rounded-full py-2 md:py-3 px-3 md:px-5 flex items-center gap-2">
                  <div className="flex gap-1 md:gap-1.5">
                    <div className="w-2 md:w-3 h-2 md:h-3 bg-red-400 rounded-full"></div>
                    <div className="w-2 md:w-3 h-2 md:h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 md:w-3 h-2 md:h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-sm md:text-base text-gray-600 ml-2 md:ml-3">wonderlist.app</span>
                </div>

                {/* Content Area */}
                <div className="px-3 md:px-6 flex-1">
                  <div className="mb-4 md:mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl md:text-3xl font-semibold text-gray-900">{currentApp?.name}</h4>
                      {currentApp?.id === 'christmas' && (
                        <span className={`text-xs px-2 py-1 ${emotion.bgColor} text-white rounded-full hidden md:inline`}>
                          Click to explore
                        </span>
                      )}
                    </div>
                    <p className="text-sm md:text-lg text-gray-600 mt-2">{currentApp?.description}</p>
                  </div>

                  {/* Image */}
                  <div className="bg-gray-50 rounded-xl p-3 md:p-6 h-48 md:h-80 relative overflow-hidden">
                    <ImageWithFallback
                      src={currentApp?.image || ''}
                      alt={currentApp?.name || ''}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {/* Progress bar at bottom */}
                    <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
                      <div className="w-full h-2 md:h-3 bg-white/20 rounded-full">
                        <div className={`w-2/3 h-full ${emotion.bgColor} rounded-full`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* App Progress Dots */}
            <div className="flex justify-center gap-2 mt-2 md:mt-4">
              {currentEmotionApps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentAppIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - All Available Apps */}
          <div className="w-full md:w-1/2 bg-gray-50 p-4 md:p-8 flex flex-col min-h-[50vh] md:min-h-full">
            {/* Header */}
            <div className="mb-4 md:mb-8">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Available Apps</h2>
              <div className={`w-8 md:w-10 h-1 ${emotion.bgColor} mb-4`}></div>
            </div>

            {/* All Available Apps (No Subcategories) */}
            <div className="space-y-3 md:space-y-4 flex-1">
              {allAvailableApps.map((app, index) => (
                <div key={index} className="flex items-start gap-2 md:gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 md:w-3 h-2.5 md:h-3 ${emotion.bgColor} rounded-full`}></div>
                    {index < allAvailableApps.length - 1 && (
                      <div className="w-0.5 h-8 md:h-10 bg-gray-300"></div>
                    )}
                  </div>
                  <Card 
                    className={`flex-1 p-2.5 md:p-4 bg-white border border-gray-200 rounded-lg md:rounded-xl shadow-sm transition-all duration-200 ${
                      app.name === 'Listmas' && app.status === 'Available' 
                        ? `cursor-pointer hover:shadow-md hover:border-[#F05959] hover:bg-gray-50` 
                        : app.status === 'Available' 
                          ? 'cursor-pointer hover:shadow-md hover:border-gray-300 hover:bg-gray-50'
                          : 'cursor-not-allowed opacity-75'
                    }`}
                    onClick={() => {
                      if (app.name === 'Listmas' && app.status === 'Available') {
                        onNavigate('christmas');
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-2 md:mb-3">
                      <div className="flex items-center gap-2.5 md:gap-3 flex-1">
                        <div className={`w-7 h-7 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${
                          app.name === 'WeddingSync' ? 'bg-[#F05959]' :
                          app.name === 'BabyPrep' ? 'bg-[#F05959]' :
                          app.name === 'Listmas' ? 'bg-[#F05959]' :
                          emotion.bgColor
                        }`}>
                          {app.name === 'WeddingSync' && <Heart className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />}
                          {app.name === 'BabyPrep' && <Baby className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />}
                          {app.name === 'Listmas' && <Gift className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />}
                          {!['WeddingSync', 'BabyPrep', 'Listmas'].includes(app.name) && (
                            <div className="w-3.5 h-3.5 md:w-5 md:h-5 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base md:text-lg font-semibold text-gray-900">{app.name}</h4>
                          <p className="text-xs md:text-sm text-gray-600 mb-1">{app.subtitle}</p>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              app.status === 'Available' ? 'bg-green-400' : 'bg-gray-400'
                            }`}></div>
                            <span className="text-xs text-gray-500">{app.status}</span>
                            {app.name === 'Listmas' && app.status === 'Available' && (
                              <span className="text-xs px-1.5 py-0.5 bg-[#F05959] text-white rounded-full ml-1 hidden md:inline">
                                Click to explore
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className={`w-3.5 h-3.5 md:w-4 md:h-4 ml-1.5 flex-shrink-0 ${
                        app.name === 'Listmas' && app.status === 'Available' 
                          ? 'text-[#F05959]'
                          : 'text-gray-400'
                      }`} />
                    </div>
                    
                    <div className="flex gap-1 flex-wrap">
                      {app.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            {/* Navigation - Bottom */}
            <div className="mt-4 md:mt-8 space-y-2 md:space-y-3">
              <Button 
                variant="ghost"
                className="text-gray-600 hover:bg-gray-100 w-full justify-start text-sm md:text-base"
                onClick={() => onNavigate('home')}
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Button 
                variant="ghost"
                className="text-gray-600 hover:bg-gray-100 w-full justify-start text-sm md:text-base"
                onClick={() => onNavigate('all-emotions')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Emotions
              </Button>
            </div>
          </div>
        </>
      ) : (
        // Standard layout for other emotions
        <>
          {/* Left Sidebar */}
          <div className={`w-full md:w-1/2 text-white p-6 md:p-12 flex flex-col ${emotion.bgColor}`}>
            {/* Logo */}
            <div className="mb-16">
              <div 
                className="flex items-center gap-3 mb-2 cursor-pointer"
                onClick={() => onNavigate('home')}
              >
                <div className="w-8 h-8 bg-white rounded-full"></div>
                <span className="text-2xl font-bold">WonderList</span>
              </div>
            </div>

            {/* Current Emotion - Featured */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-start gap-4 mb-8">
                <div className={`w-1 h-16 bg-white`}></div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    Feel {emotion.name}
                  </h1>
                  <p className="text-xl text-white/90 italic">
                    {emotion.descriptor}
                  </p>
                </div>
              </div>
              <p className="text-lg text-white/80 ml-6">
                {emotion.description}
              </p>
            </div>

            {/* Navigation */}
            <div className="mt-8 space-y-3">
              <Button 
                variant="ghost"
                className="text-white hover:bg-white/10 w-full justify-start"
                onClick={() => onNavigate('home')}
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Button 
                variant="ghost"
                className="text-white hover:bg-white/10 w-full justify-start"
                onClick={() => onNavigate('all-emotions')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Emotions
              </Button>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-1/2 bg-gray-100 p-12 flex flex-col">
            {/* Header */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your {emotion.name} Toolkit
              </h2>
              <p className="text-lg text-gray-600">
                Choose from these carefully curated modules designed to help you feel {emotion.name.toLowerCase()} and achieve your goals.
              </p>
            </div>

            {/* Modules Grid */}
            <div className="flex-1 overflow-y-auto">
              <ModuleGrid modules={emotion.modules} emotion={emotion} onNavigate={onNavigate} />
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Button 
                className={`${emotion.bgColor} hover:opacity-90 text-white px-8 py-3`}
              >
                Start your {emotion.name} Plan
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}