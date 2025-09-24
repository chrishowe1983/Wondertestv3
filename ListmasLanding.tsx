import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Home, 
  Search, 
  Clock, 
  DollarSign, 
  Gift, 
  CheckCircle, 
  Lightbulb, 
  FileText, 
  ShoppingCart,
  Sparkles,
  Calendar,
  Users,
  TrendingUp,
  ArrowRight,
  Star
} from 'lucide-react';
import exampleImage from 'figma:asset/b32a7904ec16928962409116327a280624022fcc.png';
import wonderlistLogo from 'figma:asset/2d824b5a7b3a54f5471b29fd4d282c21a8096ada.png';

interface ListmasLandingProps {
  onNavigate: (page: string) => void;
}

const stages = [
  {
    id: 'spark',
    title: 'Spark',
    icon: Lightbulb,
    placeholder: 'What inspires you? Try "gift ideas for mom" or "creative decorations"',
    description: 'Get inspired with creative ideas',
    action: 'Get Inspired',
    page: 'christmas-spark',
    color: '#F05959',
    suggestions: [
      { text: 'Gift ideas for mom', page: 'smart-gift-planner', context: { recipient: 'mom' } },
      { text: 'Creative decoration ideas', page: 'creative-spark-studio', context: { category: 'decoration' } },
      { text: 'Family tradition ideas', page: 'creative-spark-studio', context: { category: 'activities' } },
      { text: 'DIY craft projects', page: 'creative-spark-studio', context: { category: 'crafts' } }
    ]
  },
  {
    id: 'shape',
    title: 'Shape',
    icon: FileText,
    placeholder: 'What needs planning? Try "Christmas dinner" or "holiday schedule"',
    description: 'Organize and plan your holidays',
    action: 'Start Planning',
    page: 'christmas-shape',
    color: '#F05959',
    suggestions: [
      { text: 'Plan Christmas dinner', page: 'christmas-dinner-planner', context: { type: 'dinner' } },
      { text: 'Holiday event planning', page: 'christmas-shape', context: { type: 'event' } },
      { text: 'Gift list organization', page: 'gift-list', context: { type: 'planning' } },
      { text: 'Holiday schedule', page: 'todo-schedule', context: { type: 'schedule' } }
    ]
  },
  {
    id: 'start',
    title: 'Start',
    icon: ShoppingCart,
    placeholder: 'Ready to take action? Try "buy Christmas gifts" or "grocery shopping"',
    description: 'Take action and make it happen',
    action: 'Start Shopping',
    page: 'festive-shopping',
    color: '#F05959',
    suggestions: [
      { text: 'Buy Christmas gifts', page: 'festive-shopping', context: { type: 'gifts' } },
      { text: 'Grocery shopping list', page: 'christmas-food', context: { type: 'groceries' } },
      { text: 'Decoration shopping', page: 'festive-shopping', context: { type: 'decorations' } },
      { text: 'Budget tracking', page: 'festive-budget', context: { type: 'budget' } }
    ]
  }
];

export function ListmasLanding({ onNavigate }: ListmasLandingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStageIndex, setCurrentStageIndex] = useState(1); // Start with Shape as default
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
  const [isCarouselActive, setIsCarouselActive] = useState(true); // Controls auto-cycling
  const [hasUserInteracted, setHasUserInteracted] = useState(false); // Tracks if user has manually selected
  const currentStage = stages[currentStageIndex];

  // Carousel auto-cycling effect
  useEffect(() => {
    if (isCarouselActive && !hasUserInteracted) {
      const interval = setInterval(() => {
        setCurrentStageIndex((prevIndex) => (prevIndex + 1) % stages.length);
      }, 3000); // Change every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isCarouselActive, hasUserInteracted]);

  // Show suggestions when search is focused or has content
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      // Filter suggestions based on search query
      const allSuggestions = stages.flatMap(stage => 
        stage.suggestions.map(suggestion => ({
          ...suggestion,
          stage: stage.title,
          stageColor: stage.color
        }))
      );
      
      const filtered = allSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setFilteredSuggestions(filtered.slice(0, 6)); // Show max 6 suggestions
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions(currentStage.suggestions.map(suggestion => ({
        ...suggestion,
        stage: currentStage.title,
        stageColor: currentStage.color
      })));
      setShowSuggestions(false);
    }
  }, [searchQuery, currentStageIndex]);

  const parseSearchQuery = (query: string): { page: string; context?: any } => {
    const lowerQuery = query.toLowerCase().trim();
    
    // SPARK STAGE - Creative Inspiration Queries
    if (lowerQuery.includes('gift') || lowerQuery.includes('present')) {
      // Smart gift planning
      if (lowerQuery.includes('for') || lowerQuery.includes('ideas') || lowerQuery.includes('suggest')) {
        return { 
          page: 'smart-gift-planner',
          context: { 
            type: 'gift-planning', 
            query: query,
            recipient: extractRecipient(lowerQuery)
          }
        };
      }
      return { 
        page: 'gift-inspiration',
        context: { type: 'gift-planning', query: query }
      };
    }
    
    // Creative inspiration queries
    if (lowerQuery.includes('idea') || lowerQuery.includes('inspire') || lowerQuery.includes('creative')) {
      if (lowerQuery.includes('decorat') || lowerQuery.includes('craft') || lowerQuery.includes('diy')) {
        return { 
          page: 'creative-spark-studio',
          context: { 
            type: 'creative-inspiration', 
            query: query,
            category: 'decoration'
          }
        };
      }
      if (lowerQuery.includes('activit') || lowerQuery.includes('tradition') || lowerQuery.includes('family')) {
        return { 
          page: 'creative-spark-studio',
          context: { 
            type: 'creative-inspiration', 
            query: query,
            category: 'activities'
          }
        };
      }
      return { 
        page: 'creative-spark-studio',
        context: { type: 'creative-inspiration', query: query }
      };
    }
    
    // SHAPE STAGE - Planning Queries
    // Christmas dinner/meal planning
    if (lowerQuery.includes('dinner') || lowerQuery.includes('meal') || lowerQuery.includes('cooking') || lowerQuery.includes('recipe')) {
      if (lowerQuery.includes('christmas') || lowerQuery.includes('holiday')) {
        return { 
          page: 'christmas-dinner-planner',
          context: { 
            type: 'christmas-dinner',
            query: query,
            mealType: lowerQuery.includes('dinner') ? 'dinner' : 'meal'
          }
        };
      }
    }
    
    // Party/event planning
    if (lowerQuery.includes('party') || lowerQuery.includes('event') || lowerQuery.includes('gathering') || lowerQuery.includes('plan')) {
      return { 
        page: 'christmas-shape',
        context: { type: 'event-planning', query: query }
      };
    }
    
    // START STAGE - Action Queries
    // Shopping/buying
    if (lowerQuery.includes('buy') || lowerQuery.includes('shop') || lowerQuery.includes('purchase')) {
      return { 
        page: 'festive-shopping',
        context: { type: 'shopping', query: query }
      };
    }
    
    // Decoration/craft implementation
    if (lowerQuery.includes('decorat') || lowerQuery.includes('craft') || lowerQuery.includes('diy')) {
      return { 
        page: 'craft-inspiration',
        context: { type: 'decoration', query: query }
      };
    }
    
    // Default to current stage
    return { page: currentStage.page, context: { query: query } };
  };

  const extractRecipient = (query: string): string | undefined => {
    const recipients = ['mom', 'dad', 'wife', 'husband', 'boyfriend', 'girlfriend', 'kids', 'children', 'teacher', 'boss', 'friend', 'brother', 'sister', 'grandma', 'grandpa', 'aunt', 'uncle', 'cousin'];
    const found = recipients.find(recipient => query.includes(recipient));
    return found;
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const { page, context } = parseSearchQuery(searchQuery);
      // Store context in sessionStorage for the target page to use
      if (context) {
        sessionStorage.setItem('searchContext', JSON.stringify(context));
      }
      onNavigate(page);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.context) {
      sessionStorage.setItem('searchContext', JSON.stringify(suggestion.context));
    }
    onNavigate(suggestion.page);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 150);
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Stats Bar with Logo */}
      <div className="bg-[#F05959] text-white p-6">
        <div className="max-w-6xl mx-auto flex items-center gap-8">
          {/* Logo */}
          <div className="flex-shrink-0 hidden md:block">
            <img 
              src={wonderlistLogo} 
              alt="Wonderlist" 
              className="h-12 w-auto"
            />
          </div>

          {/* Stats Grid */}
          <div className="flex-1">
            {/* Mobile: Separate rows for titles and stats */}
            <div className="md:hidden">
              {/* Titles Row */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                <div className="text-center">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs opacity-90 leading-tight">Days Until Christmas</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    <span className="text-xs opacity-90 leading-tight">Budget Used</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Gift className="w-3 h-3" />
                    <span className="text-xs opacity-90 leading-tight">Gifts Planned</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span className="text-xs opacity-90 leading-tight">Tasks Complete</span>
                  </div>
                </div>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-2">
                <div className="text-center">
                  <div className="text-xl font-bold">45</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">67%</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">12</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">23</div>
                </div>
              </div>
            </div>

            {/* Desktop: Original layout */}
            <div className="hidden md:grid md:grid-cols-4 md:gap-6">
              {/* Days Until Christmas */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm opacity-90">Days Until Christmas</span>
                </div>
                <div className="text-3xl font-bold">45</div>
              </div>

              {/* Budget Used */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm opacity-90">Budget Used</span>
                </div>
                <div className="text-3xl font-bold">67%</div>
              </div>

              {/* Gifts Planned */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Gift className="w-5 h-5" />
                  <span className="text-sm opacity-90">Gifts Planned</span>
                </div>
                <div className="text-3xl font-bold">12</div>
              </div>

              {/* Tasks Complete */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm opacity-90">Tasks Complete</span>
                </div>
                <div className="text-3xl font-bold">23</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 pt-4">
        {/* Stage Filter + Search Interface */}
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            
            {/* Stage Filter - Horizontal */}
            <div className="p-6 pb-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Choose Your Approach</h3>
              <div className="flex gap-4 justify-center">
                {stages.map((stage, index) => (
                  <Card 
                    key={stage.id}
                    className={`p-4 cursor-pointer transition-all duration-300 border-2 flex-1 max-w-xs ${
                      index === currentStageIndex 
                        ? 'border-opacity-100 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md opacity-40 hover:opacity-60'
                    }`}
                    style={{
                      borderColor: index === currentStageIndex ? stage.color : undefined,
                      backgroundColor: index === currentStageIndex ? stage.color + '08' : undefined
                    }}
                    onClick={() => {
                      setCurrentStageIndex(index);
                      setHasUserInteracted(true);
                      setIsCarouselActive(false);
                    }}
                  >
                    <div className="text-center">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                          index !== currentStageIndex ? 'opacity-60' : ''
                        }`}
                        style={{ backgroundColor: stage.color }}
                      >
                        <stage.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 
                        className={`font-bold text-lg mb-1 ${
                          index !== currentStageIndex ? 'opacity-60' : ''
                        }`} 
                        style={{ color: stage.color }}
                      >
                        {stage.title}
                      </h4>
                      <p className={`text-gray-600 text-sm leading-tight ${
                        index !== currentStageIndex ? 'opacity-60' : ''
                      }`}>
                        {stage.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Search & Suggestions */}
            <div className="p-8">
                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={currentStage.placeholder}
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyPress={handleKeyPress}
                    className="pl-12 pr-4 py-4 text-lg border-2 rounded-xl focus:ring-0 transition-all duration-300"
                    style={{ 
                      borderColor: currentStage.color,
                      '--tw-ring-color': currentStage.color + '20'
                    } as any}
                  />
                  
                  {/* Search Suggestions Dropdown */}
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-80 overflow-y-auto">
                      {filteredSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: suggestion.stageColor + '20' }}
                            >
                              <Search className="w-4 h-4" style={{ color: suggestion.stageColor }} />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{suggestion.text}</p>
                              <p className="text-sm text-gray-500">{suggestion.stage} approach</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="mb-8">
                  <Button 
                    onClick={() => searchQuery.trim() ? handleSearch() : onNavigate(currentStage.page)}
                    className="w-full text-white py-4 text-lg rounded-xl font-medium transition-all duration-300"
                    style={{ backgroundColor: currentStage.color }}
                  >
                    {searchQuery.trim() ? 'Smart Search' : currentStage.action}
                  </Button>
                </div>

                {/* Suggestion Cards */}
                {!showSuggestions && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5" style={{ color: currentStage.color }} />
                      <h4 className="font-bold text-lg">Popular {currentStage.title} Ideas</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentStage.suggestions.map((suggestion, index) => (
                        <Card 
                          key={index}
                          className="p-4 cursor-pointer hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: currentStage.color + '20' }}
                            >
                              <TrendingUp className="w-4 h-4" style={{ color: currentStage.color }} />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{suggestion.text}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-4">
          <Button 
            variant="outline"
            className="text-gray-600 border-gray-300 hover:bg-gray-50"
            onClick={() => onNavigate('excited')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Feel Excited
          </Button>
          <Button 
            variant="outline"
            className="text-gray-600 border-gray-300 hover:bg-gray-50"
            onClick={() => onNavigate('home')}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}