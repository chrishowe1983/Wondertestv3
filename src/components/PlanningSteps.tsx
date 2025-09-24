import React from 'react';

interface PlanningStepsProps {
  currentStep: number;
  totalSteps: number;
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onStepClick: (index: number) => void;
}

export function PlanningSteps({ 
  currentStep, 
  totalSteps, 
  isAutoPlay, 
  onToggleAutoPlay, 
  onPrevious, 
  onNext, 
  onStepClick 
}: PlanningStepsProps) {
  // Dynamic text for each step
  const stepTexts = [
    "Spark ideas for festive fun",
    "Shape your festive plans", 
    "Start - Shopping!"
  ];

  return (
    <div className="bg-[#F05959] text-white px-8 py-6 rounded-2xl shadow-lg">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Planning Steps</h3>
        <button
          onClick={onToggleAutoPlay}
          className="text-white/80 hover:text-white transition-colors text-base font-medium"
        >
          {isAutoPlay ? 'Pause' : 'Play'}
        </button>
      </div>

      {/* Progress Bars */}
      <div className="flex gap-3 mb-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <button
            key={index}
            onClick={() => onStepClick(index)}
            className={`flex-1 h-2 rounded-full transition-all duration-300 cursor-pointer hover:opacity-80 ${
              index === currentStep 
                ? 'bg-white' 
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Dynamic Text Boxes (No Arrows) */}
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          className="flex-1 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center justify-center transition-colors"
        >
          <span className="text-sm font-medium text-center px-2">
            {stepTexts[Math.max(0, currentStep - 1)] || stepTexts[stepTexts.length - 1]}
          </span>
        </button>
        <button
          onClick={onNext}
          className="flex-1 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center justify-center transition-colors"
        >
          <span className="text-sm font-medium text-center px-2">
            {stepTexts[Math.min(stepTexts.length - 1, currentStep + 1)] || stepTexts[0]}
          </span>
        </button>
      </div>
    </div>
  );
}