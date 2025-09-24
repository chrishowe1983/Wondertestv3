import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Home, Gift, Clock, DollarSign, Lightbulb, Calendar, ShoppingCart, Settings, Play, Pause } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import exampleImage from 'figma:asset/6880b7b348cb6db76d68728435b1c2cfee2607a0.png';

interface ChristmasPageProps {
  onNavigate: (page: string) => void;
}

const christmasOptions = [
  {
    id: 'spark',
    title: 'Spark New Ideas',
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1610116406219-245e2ecaa3a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBvcm5hbWVudHMlMjBwaW5lJTIwdHJlZSUyMGRlY29yYXRpb25zfGVufDF8fHx8MTc1ODM4NjI1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: [
      'Browse for new traditions',
      'Get new craft-spiration',
      'Give me gift inspiration'
    ],
    page: 'christmas-spark',
    color: '#F05959'
  },
  {
    id: 'shape',
    title: 'Shape Festive Plans',
    icon: Calendar,
    image: "https://images.unsplash.com/photo-1609669028107-ed6cec2cb66d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjB0cmVlJTIwY29va2llJTIwY3V0dGVyJTIwYmFraW5nfGVufDF8fHx8MTc1ODM4NjI1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: [
      'Schedule your to do list',
      'Christmas food list',
      'Generate your christmas gift list'
    ],
    page: 'christmas-shape',
    color: '#57C289'
  },
  {
    id: 'start',
    title: 'Start Christmas Shopping',
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1671393759133-781c76bb8f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBnaWZ0JTIwYmFnJTIwd3JhcHBpbmclMjBwcmVzZW50c3xlbnwxfHx8fDE3NTgzODYyNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: [
      'Start festive shopping',
      'Festive budget',
      'Thank you notes'
    ],
    page: 'christmas-start',
    color: '#0F73FF'
  }
];

export function ChristmasPage({ onNavigate }: ChristmasPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showFullView, setShowFullView] = useState(false);

  // Auto-cycle through options
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % christmasOptions.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentOption = christmasOptions[currentIndex];

  const handleCardClick = (option: typeof christmasOptions[0]) => {
    onNavigate(option.page);
  };

  return (
    <div className="h-full flex relative overflow-hidden">
      {/* Left Sidebar - Coral Background */}
      <div className="w-80 bg-[#F05959] text-white p-6 flex flex-col relative">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Home className="w-5 h-5 text-[#F05959]" />
          </div>
          <span className="text-xl font-bold">Listmas</span>
        </div>

        {/* Main Header */}
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-1 h-16 bg-white rounded-full"></div>
            <div>
              <h1 className="text-3xl font-bold">Holiday Magic</h1>
              <p className="text-lg text-white/90 italic">Awaits Your Perfect Planning</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-white/80" />
            <div>
              <p className="text-sm text-white/80">Days Until Christmas</p>
              <p className="text-2xl font-bold">45</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-white/80" />
            <div>
              <p className="text-sm text-white/80">Budget Used</p>
              <p className="text-2xl font-bold">67%</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-white/80" />
            <div>
              <p className="text-sm text-white/80">Gifts Planned</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-white/80" />
            <div>
              <p className="text-sm text-white/80">Tasks Complete</p>
              <p className="text-2xl font-bold">23</p>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white/80">Sizzle Reel</h3>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
          
          <div className="flex gap-2">
            {christmasOptions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-1 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={() => setShowFullView(!showFullView)}
            className="w-full mt-4 bg-white text-[#F05959] hover:bg-white/90"
          >
            {showFullView ? 'Show Sizzle Reel' : 'Show All Options'}
          </Button>
        </div>

        {/* Navigation - Bottom */}
        <div className="mt-auto space-y-3">
          <Button 
            variant="ghost"
            className="text-white hover:bg-white/10 w-full justify-start"
            onClick={() => onNavigate('excited')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Feel Excited
          </Button>
          <Button 
            variant="ghost"
            className="text-white hover:bg-white/10 w-full justify-start"
            onClick={() => onNavigate('home')}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50 relative">
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-white border-b border-gray-200">
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <span>Spark</span>
              <span>→</span>
              <span>Shape</span>
              <span>→</span>
              <span>Start</span>
            </div>
            <Settings className="w-6 h-6 text-gray-600" />
          </div>
          <div className="flex gap-2 ml-6">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 h-full">
          {showFullView ? (
            /* Full View - All Cards */
            <div className="grid grid-cols-3 gap-6">
              {christmasOptions.map((option, index) => (
                <Card 
                  key={option.id}
                  className="p-6 bg-white border border-gray-200 rounded-xl cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleCardClick(option)}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <option.icon className="w-5 h-5 text-gray-700" />
                    <h3 className="font-semibold text-gray-900">{option.title}</h3>
                  </div>
                  
                  <div className="mb-4">
                    <ImageWithFallback
                      src={option.image}
                      alt={option.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  <div className="space-y-2 text-sm">
                    {option.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                        <span className="text-[#F05959]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            /* Sizzle Reel View - Single Featured Card */
            <div className="flex items-center justify-center h-full">
              <div className="max-w-2xl w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                    className="relative"
                  >
                    {/* Featured Card */}
                    <Card 
                      className="p-8 bg-white border-2 rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                      style={{ borderColor: currentOption.color }}
                      onClick={() => handleCardClick(currentOption)}
                    >
                      {/* Animated Background Gradient */}
                      <motion.div
                        className="absolute inset-0 opacity-5"
                        style={{ 
                          background: `linear-gradient(135deg, ${currentOption.color}, transparent)` 
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />

                      {/* Header */}
                      <div className="flex items-center gap-3 mb-6 relative z-10">
                        <motion.div
                          className="p-3 rounded-full"
                          style={{ backgroundColor: `${currentOption.color}20` }}
                          initial={{ rotate: -180, scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          <currentOption.icon className="w-8 h-8" style={{ color: currentOption.color }} />
                        </motion.div>
                        <motion.h2
                          className="text-3xl font-bold text-gray-900"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          {currentOption.title}
                        </motion.h2>
                      </div>

                      {/* Image */}
                      <motion.div
                        className="mb-6 relative z-10"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <ImageWithFallback
                          src={currentOption.image}
                          alt={currentOption.title}
                          className="w-full h-48 object-cover rounded-xl"
                        />
                      </motion.div>

                      {/* Features */}
                      <motion.div
                        className="space-y-4 text-lg relative z-10"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        {currentOption.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                          >
                            <motion.div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: currentOption.color }}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                            />
                            <span style={{ color: currentOption.color }} className="font-medium">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Call to Action */}
                      <motion.div
                        className="mt-8 relative z-10"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                      >
                        <Button
                          className="w-full py-4 text-lg font-semibold text-white rounded-xl"
                          style={{ backgroundColor: currentOption.color }}
                        >
                          Get Started with {currentOption.title}
                        </Button>
                      </motion.div>
                    </Card>

                    {/* Floating Progress Indicator */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: currentOption.color }}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      {currentIndex + 1}/3
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}