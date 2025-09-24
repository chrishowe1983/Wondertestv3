import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';

interface FeatureSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  textColor: string;
  action: string;
}

interface CircularFeatureCarouselProps {
  onNavigate: (page: string) => void;
}

const features: FeatureSection[] = [
  {
    id: 'spark',
    title: 'SPARK',
    subtitle: 'Ideas & Inspiration',
    description: 'Discover new possibilities, get creative inspiration, and spark fresh ideas for your planning journey.',
    color: '#F05959',
    textColor: 'text-[#F05959]',
    action: 'excited'
  },
  {
    id: 'shape',
    title: 'SHAPE',
    subtitle: 'Plans & Structure',
    description: 'Organize your thoughts, structure your goals, and shape comprehensive plans that work.',
    color: '#57C289',
    textColor: 'text-[#57C289]',
    action: 'ready'
  },
  {
    id: 'start',
    title: 'START',
    subtitle: 'Action & Growth',
    description: 'Take confident steps forward, build expertise, and start your journey to success.',
    color: '#0F73FF',
    textColor: 'text-[#0F73FF]',
    action: 'confident'
  }
];



export function CircularFeatureCarousel({ onNavigate }: CircularFeatureCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-rotation every 4 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);



  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    // Re-enable autoplay after 8 seconds of inactivity
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const handleGetStarted = () => {
    onNavigate(features[currentIndex].action);
  };

  const currentFeature = features[currentIndex];

  return (
    <div className="w-full max-w-sm mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center space-y-8"
        >
          {/* Subtitle */}
          <motion.h3 
            className="text-2xl font-semibold text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {currentFeature.subtitle}
          </motion.h3>

          {/* Description */}
          <motion.p 
            className="text-lg text-gray-600 leading-relaxed max-w-xs mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {currentFeature.description}
          </motion.p>
          
          {/* Progress Indicators */}
          <motion.div 
            className="flex justify-center gap-2 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'scale-125' 
                    : 'hover:scale-110'
                }`}
                style={{
                  backgroundColor: index === currentIndex 
                    ? features[index].color 
                    : '#d1d5db'
                }}
              />
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={handleGetStarted}
              className="px-8 py-3 font-semibold text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              style={{ 
                backgroundColor: currentFeature.color,
                boxShadow: `0 4px 16px ${currentFeature.color}40`
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}