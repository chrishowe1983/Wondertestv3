import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Gift, Heart, Baby, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ShowcaseModule {
  id: string;
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  features: string[];
  icon: React.ComponentType<any>;
  color: string;
  mockupContent: {
    title: string;
    subtitle: string;
    imageQuery: string;
  };
}

const excitedModules: ShowcaseModule[] = [
  {
    id: 'christmas',
    name: 'Christmas',
    tagline: 'Listmas & FestiveSync',
    description: 'Turn holiday planning into a magical celebration with comprehensive gift coordination and festive event management.',
    benefits: [
      'Never forget a gift again',
      'Budget tracking for all festivities',
      'Family coordination made simple',
      'Stress-free holiday planning'
    ],
    features: [
      'Gift idea tracker with recipient preferences',
      'Budget management across multiple celebrations',
      'Menu planning for holiday gatherings',
      'Guest coordination and RSVP tracking'
    ],
    icon: Gift,
    color: '#22C55E',
    mockupContent: {
      title: 'Holiday Gift Planner',
      subtitle: 'Track gifts for everyone on your list',
      imageQuery: 'christmas gifts wrapped tree'
    }
  },
  {
    id: 'weddings',
    name: 'Weddings',
    tagline: 'WeddingSync',
    description: 'Comprehensive planning tools that transform wedding preparation into an organized, joyful journey to your dream day.',
    benefits: [
      'Stay on budget effortlessly',
      'Never miss important deadlines',
      'Vendor coordination simplified',
      'Guest management streamlined'
    ],
    features: [
      'Timeline with automated reminders',
      'Vendor contact and contract management',
      'Guest list with dietary preferences',
      'Budget tracker with category breakdowns'
    ],
    icon: Heart,
    color: '#EC4899',
    mockupContent: {
      title: 'Wedding Timeline',
      subtitle: '6 months to go - Stay on track',
      imageQuery: 'wedding planning notebook flowers'
    }
  },
  {
    id: 'babies',
    name: 'Babies',
    tagline: 'BabyPrep & FamilySync',
    description: 'Navigate pregnancy and early parenting with confidence through organized preparation and family coordination tools.',
    benefits: [
      'Pregnancy milestone tracking',
      'Nursery setup made simple',
      'Family preparation organized',
      'Newborn care confidence'
    ],
    features: [
      'Week-by-week pregnancy guides',
      'Baby registry with essentials checklist',
      'Nursery design and setup planner',
      'Feeding and sleep schedule trackers'
    ],
    icon: Baby,
    color: '#3B82F6',
    mockupContent: {
      title: 'Baby Registry',
      subtitle: 'Everything you need for your little one',
      imageQuery: 'baby nursery crib toys'
    }
  }
];

interface LaptopShowcaseProps {
  autoRotate?: boolean;
  rotationInterval?: number;
}

export function LaptopShowcase({ autoRotate = true, rotationInterval = 5000 }: LaptopShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const currentModule = excitedModules[currentIndex];

  // Auto-rotation
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % excitedModules.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [autoRotate, rotationInterval]);

  // Load images using Unsplash
  useEffect(() => {
    setImageUrls({
      christmas: 'https://images.unsplash.com/photo-1608839000895-1778481bc1a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBnaWZ0cyUyMHdyYXBwZWQlMjB0cmVlfGVufDF8fHx8MTc1ODMwNDAyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      weddings: 'https://images.unsplash.com/photo-1660918262717-b08af8df4d82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGxhbm5pbmclMjBub3RlYm9vayUyMGZsb3dlcnN8ZW58MXx8fHwxNzU4MjU2NDY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      babies: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwbnVyc2VyeSUyMGNyaWIlMjB0b3lzfGVufDF8fHx8MTc1ODMwNDAzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    });
  }, []);

  const nextModule = () => {
    setCurrentIndex((prev) => (prev + 1) % excitedModules.length);
  };

  const prevModule = () => {
    setCurrentIndex((prev) => (prev - 1 + excitedModules.length) % excitedModules.length);
  };

  const IconComponent = currentModule.icon;

  return (
    <div className="flex flex-col h-full">
      {/* Module Info Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#F05959] rounded-lg flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{currentModule.name}</h3>
            <p className="text-[#F05959] font-medium">{currentModule.tagline}</p>
          </div>
        </div>
        <p className="text-gray-600 text-lg">{currentModule.description}</p>
      </div>

      {/* Laptop Mockup */}
      <div className="flex-1 flex items-center justify-center mb-8">
        <div className="relative">
          {/* Laptop Base */}
          <div className="w-96 h-6 bg-gray-300 rounded-b-3xl shadow-lg"></div>
          
          {/* Laptop Screen */}
          <div className="w-96 h-64 bg-gray-800 rounded-t-lg shadow-xl relative -mb-1">
            {/* Screen Bezel */}
            <div className="w-full h-full p-3">
              <div className="w-full h-full bg-white rounded overflow-hidden relative">
                {/* Browser Chrome */}
                <div className="h-8 bg-gray-100 border-b flex items-center px-4 gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500 ml-4">wonderlist.app</div>
                </div>
                
                {/* Screen Content */}
                <div className="p-4 h-full bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      {currentModule.mockupContent.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {currentModule.mockupContent.subtitle}
                    </p>
                  </div>
                  
                  {/* Mock content area with image */}
                  <div className="bg-white rounded border h-32 p-2 relative overflow-hidden">
                    {imageUrls[currentModule.id] && (
                      <ImageWithFallback
                        src={imageUrls[currentModule.id]}
                        alt={currentModule.name}
                        className="w-full h-full object-cover rounded opacity-20"
                      />
                    )}
                    <div className="absolute inset-0 p-2 flex flex-col justify-center">
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-2 bg-[#F05959] rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits & Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Key Benefits</h4>
          <ul className="space-y-2">
            {currentModule.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full mt-2 flex-shrink-0"></div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
          <ul className="space-y-2">
            {currentModule.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full mt-2 flex-shrink-0"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevModule}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#F05959] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        
        <div className="flex gap-2">
          {excitedModules.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-[#F05959]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextModule}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#F05959] transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}