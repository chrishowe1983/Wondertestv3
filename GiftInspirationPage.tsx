import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Home, Gift, Heart, DollarSign, Clock, Users, Sparkles, Brain, Zap, Target, TrendingUp, User, Star, RefreshCw, Search } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import sparkBadge from 'figma:asset/6b44017fcff4c853abd58cd6693733aa3b5fe44c.png';
interface GiftInspirationPageProps {
  onNavigate: (page: string) => void;
}

const giftCategories = [
  {
    id: 'trending',
    title: 'Trending Gifts',
    description: 'Popular gifts everyone is talking about',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1638224966976-ae2e4257c09e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwd3JhcHBpbmclMjBwcmVzZW50c3xlbnwxfHx8fDE3NTgzMTc0NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Smart home devices',
      'Sustainable products',
      'Wellness gifts',
      'Tech accessories'
    ]
  },
  {
    id: 'personalized',
    title: 'Personalised Gifts',
    description: 'Thoughtful gifts customized for each recipient',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1638224966976-ae2e4257c09e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwd3JhcHBpbmclMjBwcmVzZW50c3xlbnwxfHx8fDE3NTgzMTc0NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Custom photo albums',
      'Engraved jewelry',
      'Personalized ornaments',
      'Custom artwork'
    ]
  },
  {
    id: 'digital',
    title: 'Digital Gift Options',
    description: 'Quick gifts that still show you care',
    icon: Clock,
    image: 'https://images.unsplash.com/photo-1638224966976-ae2e4257c09e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwd3JhcHBpbmclMjBwcmVzZW50c3xlbnwxfHx8fDE3NTgzMTc0NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Digital gift cards',
      'Subscription services',
      'Online experiences',
      'Same-day delivery'
    ]
  }
];

const aiSuggestions = [
  {
    id: 1,
    name: "Sarah (Sister)",
    age: 28,
    interests: ["yoga", "cooking", "sustainability"],
    personality: "Mindful & Creative",
    confidence: 94,
    suggestion: "Organic Bamboo Cooking Set",
    reasoning: "Combines her love for cooking with eco-conscious values",
    price: "$89",
    trending: true,
    alternatives: ["Zero-waste kitchen starter kit", "Premium yoga mat bundle"]
  },
  {
    id: 2,
    name: "Dad",
    age: 55,
    interests: ["golf", "grilling", "tech"],
    personality: "Traditional & Tech-savvy",
    confidence: 87,
    suggestion: "Smart Meat Thermometer",
    reasoning: "Perfect blend of his grilling passion and tech interests",
    price: "$129",
    trending: false,
    alternatives: ["Golf swing analyzer", "Premium BBQ tool set"]
  },
  {
    id: 3,
    name: "Best Friend Emma",
    age: 26,
    interests: ["travel", "photography", "coffee"],
    personality: "Adventurous & Artistic",
    confidence: 91,
    suggestion: "Travel Coffee Kit",
    reasoning: "Portable coffee setup for her photography adventures",
    price: "$75",
    trending: true,
    alternatives: ["Instant camera bundle", "Travel journal set"]
  }
];

export function GiftInspirationPage({ onNavigate }: GiftInspirationPageProps) {
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [showAiResults, setShowAiResults] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedPerson, setSelectedPerson] = useState('');

  const startAiAnalysis = () => {
    setAiAnalyzing(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAiAnalyzing(false);
          setShowAiResults(true);
          return 100;
        }
        return prev + 12;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SPARK Badge - Positioned at very top */}
      <div className="flex justify-center pt-4 pb-6 bg-white">
        <div className="relative">
          <ImageWithFallback
            src={sparkBadge}
            alt="SPARK"
            className="w-48 h-auto object-contain"
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F05959] rounded-full"></div>
          <span className="text-xl font-semibold text-[#F05959]">ChristmasList</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-900">Gift</span>
          <span className="text-xl font-normal text-gray-600">Inspiration</span>
          <Gift className="w-6 h-6 text-gray-900 ml-2" />
        </div>
      </div>

      {/* Hero Section with AI */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 p-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Gift Inspiration Hub</h1>
            <p className="text-xl text-gray-600 mb-6">Let AI analyze your loved ones and suggest perfect gifts</p>
          </div>

          {/* AI Analysis Module */}
          <Card className="max-w-4xl mx-auto p-6 bg-white border-2 border-[#F05959]/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#F05959] to-[#E04848] rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Gift Genius</h3>
                <p className="text-sm text-gray-600">Advanced personality & preference analysis</p>
              </div>
              <Badge className="ml-auto bg-[#F05959] text-white">BETA</Badge>
            </div>

            {!aiAnalyzing && !showAiResults && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Brain className="w-8 h-8 text-[#F05959] mx-auto mb-2" />
                    <h4 className="font-medium text-gray-900">Personality Analysis</h4>
                    <p className="text-sm text-gray-600">AI analyzes interests & preferences</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Target className="w-8 h-8 text-[#F05959] mx-auto mb-2" />
                    <h4 className="font-medium text-gray-900">Perfect Matching</h4>
                    <p className="text-sm text-gray-600">Smart gift recommendations</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-[#F05959] mx-auto mb-2" />
                    <h4 className="font-medium text-gray-900">Trend Insights</h4>
                    <p className="text-sm text-gray-600">Latest gift trends & predictions</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button 
                    onClick={startAiAnalysis}
                    className="bg-gradient-to-r from-[#F05959] to-[#E04848] hover:from-[#E04848] hover:to-[#D03737] text-white px-8 py-3"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Start AI Gift Analysis
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Analyzing social profiles, purchase history & preferences</p>
                </div>
              </div>
            )}

            {aiAnalyzing && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-[#F05959] to-[#E04848] rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">AI is analyzing your gift recipients...</h4>
                  <Progress value={analysisProgress} className="w-full max-w-sm mx-auto" />
                  <p className="text-sm text-gray-600 mt-2">
                    {analysisProgress < 30 && "Scanning social media profiles..."}
                    {analysisProgress >= 30 && analysisProgress < 60 && "Analyzing personality traits..."}
                    {analysisProgress >= 60 && analysisProgress < 90 && "Matching with gift database..."}
                    {analysisProgress >= 90 && "Finalizing recommendations..."}
                  </p>
                </div>
              </div>
            )}

            {showAiResults && (
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">🎯 AI Analysis Complete!</h4>
                  <p className="text-sm text-gray-600">Found perfect gift matches with 89% average confidence</p>
                </div>

                <div className="grid gap-4">
                  {aiSuggestions.map((person) => (
                    <Card key={person.id} className="p-4 border border-gray-200 hover:border-[#F05959]/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#F05959] to-[#E04848] rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-medium text-gray-900">{person.name}</h5>
                            <Badge variant="secondary" className="text-xs">{person.personality}</Badge>
                            {person.trending && <Badge className="text-xs bg-orange-100 text-orange-700">Trending</Badge>}
                          </div>
                          
                          <div className="mb-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-[#F05959]">{person.suggestion}</span>
                              <span className="text-sm text-gray-600">{person.price}</span>
                            </div>
                            <p className="text-xs text-gray-600">{person.reasoning}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium text-gray-900">{person.confidence}% match</span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="text-xs">
                                View Alternatives
                              </Button>
                              <Button size="sm" className="bg-[#F05959] hover:bg-[#E04848] text-white text-xs">
                                Add to List
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => {setShowAiResults(false); setAnalysisProgress(0);}}
                    className="text-[#F05959] border-[#F05959] hover:bg-[#F05959] hover:text-white"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Analyze More Recipients
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-3 gap-8">
          {giftCategories.map((category, index) => (
            <Card key={category.id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              {/* Image */}
              <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                <ImageWithFallback
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Icon and Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#F05959] rounded-full flex items-center justify-center">
                    <category.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#F05959] rounded-full"></div>
                      <span className="text-sm text-[#F05959] font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button className="w-full bg-[#F05959] hover:bg-[#E04848] text-white py-2">
                  Explore {category.title}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Tools */}
        <div className="mt-12 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Gift Planning Tools</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F05959] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Gift List Manager</h3>
              <p className="text-sm text-gray-600">Organize gifts by recipient and track your progress</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F05959] rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Budget Tracker</h3>
              <p className="text-sm text-gray-600">Set spending limits and monitor your holiday budget</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F05959] rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Wishlist Tracker</h3>
              <p className="text-sm text-gray-600">Save ideas throughout the year for the perfect gift</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            variant="outline"
            className="text-gray-600 border-gray-300"
            onClick={() => onNavigate('christmas-spark')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Spark
          </Button>
          <Button 
            variant="outline"
            className="text-gray-600 border-gray-300"
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