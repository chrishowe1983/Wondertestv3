import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, ArrowRight, Sparkles, Calendar, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  gradient: string;
  category: string;
  modules: string[];
  action: string;
  iconColor: string;
  image: string;
}

interface CenteredCarouselHeroProps {
  onNavigate: (page: string) => void;
}

const slides: CarouselSlide[] = [
  {
    id: 'excited',
    title: 'Feel Excited',
    subtitle: 'Creative & Energetic',
    description: 'Unleash your creativity with Christmas planning, baby prep, and festive celebrations',
    color: '#F05959',
    gradient: 'from-[#F05959] to-[#E04848]',
    category: 'Creative Planning',
    modules: ['Christmas/Listmas', 'Babies/BabyPrep'],
    action: 'excited',
    iconColor: 'text-[#F05959]',
    image: '🎄'
  },
  {
    id: 'ready',
    title: 'Feel Ready',
    subtitle: 'Organized & Prepared',
    description: 'Get organized with home management, meal planning, and school coordination',
    color: '#57C289', 
    gradient: 'from-[#57C289] to-[#45A575]',
    category: 'Life Organization',
    modules: ['Home/Household', 'Meals/KitchenSync', 'School/SchoolSync'],
    action: 'ready',
    iconColor: 'text-[#57C289]',
    image: '🏠'
  },
  {
    id: 'confident',
    title: 'Feel Confident',
    subtitle: 'Professional & Stable',
    description: 'Build confidence through financial planning, career growth, and life transitions',
    color: '#0F73FF',
    gradient: 'from-[#0F73FF] to-[#0B5CE6]',
    category: 'Professional Growth',
    modules: ['Finance/FinanceSync', 'Careers/Ascent', 'Life Change/Transitions'],
    action: 'confident',
    iconColor: 'text-[#0F73FF]',
    image: '💼'
  }
];

export function CenteredCarouselHero({ onNavigate }: CenteredCarouselHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0);

  // Auto-rotation every 5 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const currentSlide = slides[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Background Gradient Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${currentSlide.gradient} opacity-5 transition-all duration-1000`}
      />
      
      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 md:left-8 z-20 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors group"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 z-20 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors group"
      >
        <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" />
      </button>

      {/* Main Carousel Content */}
      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-8">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 }
            }}
          >
            <Card className="relative overflow-hidden bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              {/* Header with gradient accent */}
              <div className={`h-2 bg-gradient-to-r ${currentSlide.gradient}`}></div>
              
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Left Content */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Badge 
                        className="bg-gray-100 text-gray-700 px-3 py-1"
                        style={{ 
                          backgroundColor: `${currentSlide.color}15`,
                          color: currentSlide.color 
                        }}
                      >
                        {currentSlide.category}
                      </Badge>
                      
                      <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                          {currentSlide.title}
                        </h1>
                        <p className="text-xl text-gray-600 italic">
                          {currentSlide.subtitle}
                        </p>
                      </div>

                      <p className="text-lg text-gray-700 leading-relaxed max-w-md">
                        {currentSlide.description}
                      </p>
                    </div>

                    {/* Modules */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Available Modules
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {currentSlide.modules.map((module, index) => (
                          <Badge 
                            key={index}
                            variant="secondary"
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                          >
                            {module}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        onClick={() => onNavigate(currentSlide.action)}
                        className="px-8 py-3 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        style={{ 
                          backgroundColor: currentSlide.color,
                          boxShadow: `0 4px 20px ${currentSlide.color}30`
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Get Started
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => onNavigate('all-emotions')}
                        className="px-6 py-3 font-semibold rounded-full border-gray-300 hover:border-gray-400 transition-colors"
                      >
                        Explore All
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>

                  {/* Right Visual */}
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      {/* Main Icon Display */}
                      <div 
                        className="w-48 h-48 md:w-64 md:h-64 rounded-3xl flex items-center justify-center text-8xl md:text-9xl shadow-xl"
                        style={{ backgroundColor: `${currentSlide.color}10` }}
                      >
                        {currentSlide.image}
                      </div>
                      
                      {/* Floating Elements */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center"
                      >
                        {currentSlide.id === 'excited' && <Sparkles className="w-8 h-8 text-[#F05959]" />}
                        {currentSlide.id === 'ready' && <Calendar className="w-8 h-8 text-[#57C289]" />}
                        {currentSlide.id === 'confident' && <Target className="w-8 h-8 text-[#0F73FF]" />}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                        className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
                        style={{ backgroundColor: currentSlide.color }}
                      >
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => handleDotClick(index)}
            className={`relative overflow-hidden rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-12 h-3' 
                : 'w-3 h-3 hover:scale-125'
            }`}
            style={{
              backgroundColor: index === currentIndex 
                ? currentSlide.color 
                : '#d1d5db'
            }}
          >
            {index === currentIndex && isAutoPlay && (
              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* WonderList Brand */}
      <div className="absolute top-8 left-8 z-20">
        <div className="flex items-center gap-3 text-gray-800">
          <div className="w-8 h-8 bg-[#030F38] rounded-full"></div>
          <span className="text-xl font-bold">WonderList</span>
        </div>
      </div>
    </div>
  );
}