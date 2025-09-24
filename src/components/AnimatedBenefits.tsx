import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AnimatedBenefitsProps {
  textColor?: string;
}

export function AnimatedBenefits({ textColor = 'text-gray-900' }: AnimatedBenefitsProps) {
  const benefits = [
    { 
      text: "WonderList helps our users...", 
      type: "intro",
      handwrittenWord: null,
      color: null 
    },
    { 
      text: "SPARK unique ideas", 
      type: "action",
      handwrittenWord: "SPARK",
      color: "#F05959" // Coral Red
    },
    { 
      text: "SHAPE plans that frame the path", 
      type: "action",
      handwrittenWord: "SHAPE",
      color: "#57C289" // Green
    },
    { 
      text: "START their future, today", 
      type: "action",
      handwrittenWord: "START",
      color: "#0F73FF" // Blue
    }
  ];

  const [revealedCount, setRevealedCount] = useState(0);
  const [currentAnimatingIndex, setCurrentAnimatingIndex] = useState(0);

  useEffect(() => {
    if (revealedCount < benefits.length) {
      const timer = setTimeout(() => {
        setRevealedCount(prev => prev + 1);
        if (revealedCount + 1 < benefits.length) {
          setCurrentAnimatingIndex(revealedCount + 1);
        }
      }, revealedCount === 0 ? 500 : 2500); // First item appears quickly, then 2.5s intervals

      return () => clearTimeout(timer);
    }
  }, [revealedCount, benefits.length]);

  const renderText = (benefit: typeof benefits[0], index: number, isAnimating: boolean) => {
    if (!benefit.handwrittenWord) {
      return benefit.text;
    }

    const parts = benefit.text.split(benefit.handwrittenWord);
    const handwrittenFonts = ['Kalam', 'Caveat', 'Dancing Script'];
    const fontFamily = handwrittenFonts[index % handwrittenFonts.length];

    // Define specific animations for each handwritten word
    const getWordAnimation = (word: string) => {
      switch (word) {
        case 'SPARK':
          return {
            initial: { scale: 0, rotate: 0 },
            animate: { scale: [0, 1.3, 1], rotate: [0, 10, -5, 0] },
            transition: { 
              delay: 0.3,
              duration: 0.8,
              ease: "easeOutBack",
              type: "spring",
              stiffness: 150
            }
          };
        case 'SHAPE':
          return {
            initial: { scale: 0.8, rotate: -180 },
            animate: { scale: 1, rotate: 0 },
            transition: { 
              delay: 0.3,
              duration: 1,
              ease: "easeOutBack",
              type: "spring",
              stiffness: 100
            }
          };
        case 'START':
          return {
            initial: { x: -60, scale: 0.8, rotate: -10 },
            animate: { x: 0, scale: 1, rotate: 0 },
            transition: { 
              delay: 0.3,
              duration: 0.6,
              ease: [0.68, -0.55, 0.265, 1.55],
              type: "spring",
              stiffness: 120
            }
          };
        default:
          return {
            initial: { scale: 0.8, rotate: -5 },
            animate: { scale: 1, rotate: 0 },
            transition: { 
              delay: 0.3,
              duration: 0.8,
              ease: "easeOutBack",
              type: "spring",
              stiffness: 100
            }
          };
      }
    };

    const wordAnimation = getWordAnimation(benefit.handwrittenWord);

    return (
      <>
        <span style={{ fontFamily: 'Poppins, sans-serif' }}>{parts[0]}</span>
        <motion.span
          initial={isAnimating ? wordAnimation.initial : { scale: 1, rotate: 0, x: 0 }}
          animate={wordAnimation.animate}
          transition={isAnimating ? wordAnimation.transition : {}}
          style={{ 
            color: benefit.color,
            fontFamily: fontFamily,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
          className="inline-block relative"
        >
          {benefit.handwrittenWord}
          <motion.div
            initial={isAnimating ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 0.6 }}
            animate={{ scaleX: 1, opacity: 0.6 }}
            transition={isAnimating ? { delay: 0.8, duration: 0.5 } : {}}
            className="absolute -bottom-1 left-0 h-0.5 w-full origin-left"
            style={{ backgroundColor: benefit.color }}
          />
        </motion.span>
        <span style={{ fontFamily: 'Poppins, sans-serif' }}>{parts[1]}</span>
      </>
    );
  };

  // Arc trajectory path calculation
  const arcPath = (progress: number) => {
    const startY = -40;
    const endY = 0;
    const arcHeight = -20; // Peak of the arc (negative for upward arc)
    const startX = -30;
    const endX = 0;
    
    const x = startX + (endX - startX) * progress;
    const y = startY + (endY - startY) * progress + arcHeight * Math.sin(Math.PI * progress);
    
    return { x, y };
  };

  return (
    <div className="min-h-80 md:min-h-[500px] flex flex-col justify-start relative overflow-hidden px-2 md:px-0">
      {benefits.slice(0, revealedCount + 1).map((benefit, index) => {
        const isAnimating = index === currentAnimatingIndex && index === revealedCount;
        const isRevealed = index < revealedCount;
        
        // Special positioning for distributed layout - optimized for mobile
        let marginClass = '';
        if (index === 0) {
          marginClass = 'mb-6 md:mb-12'; // Top line with moderate spacing
        } else if (index === 1) {
          marginClass = 'mb-8 md:mb-16'; // SPARK with more spacing
        } else if (index === 2) {
          marginClass = 'mb-8 md:mb-16'; // SHAPE with more spacing  
        } else if (index === 3) {
          marginClass = ''; // START at bottom
        }

        // Force dark navy color for the first line (matching home page frame)
        const itemTextColor = index === 0 ? 'text-[#030F38]' : textColor;
        
        return (
          <AnimatePresence key={index}>
            {(isRevealed || isAnimating) && (
              <motion.h1
                initial={isAnimating ? { 
                  opacity: 0,
                  ...arcPath(0)
                } : { opacity: 1, x: 0, y: 0 }}
                animate={{ 
                  opacity: 1,
                  x: 0,
                  y: 0
                }}
                transition={isAnimating ? { 
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1] // Custom easing for smooth arc
                } : {}}
                className={`text-xl leading-tight md:text-4xl md:leading-normal font-bold transition-colors duration-500 ${itemTextColor} relative ${marginClass}`}
              >
                {renderText(benefit, index, isAnimating)}
              </motion.h1>
            )}
          </AnimatePresence>
        );
      })}
    </div>
  );
}