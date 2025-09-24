import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { 
  ArrowLeft, 
  Gift, 
  Heart, 
  Star, 
  TrendingUp,
  User,
  DollarSign,
  Filter,
  Search,
  Sparkles,
  ShoppingBag,
  Bookmark,
  Share2
} from 'lucide-react';

interface SmartGiftPlannerProps {
  onNavigate: (page: string) => void;
}

interface GiftSuggestion {
  id: string;
  name: string;
  description: string;
  category: string;
  priceRange: string;
  priceMin: number;
  priceMax: number;
  recipient: string[];
  interests: string[];
  trending: boolean;
  personalityFit: string[];
  amazonLink?: string;
  imageUrl?: string;
  rating: number;
  reviews: number;
}

const giftDatabase: GiftSuggestion[] = [
  {
    id: '1',
    name: 'Personalized Star Map',
    description: 'Custom star map showing the night sky from a special date and location',
    category: 'Personalized',
    priceRange: '$30-50',
    priceMin: 30,
    priceMax: 50,
    recipient: ['wife', 'husband', 'boyfriend', 'girlfriend', 'mom', 'dad'],
    interests: ['romantic', 'astronomy', 'memories'],
    trending: true,
    personalityFit: ['romantic', 'sentimental', 'thoughtful'],
    rating: 4.8,
    reviews: 2847
  },
  {
    id: '2',
    name: 'Smart Plant Monitor',
    description: 'App-connected device that monitors soil, light, and water for plants',
    category: 'Tech',
    priceRange: '$25-40',
    priceMin: 25,
    priceMax: 40,
    recipient: ['friend', 'wife', 'husband', 'mom'],
    interests: ['plants', 'gardening', 'technology', 'home'],
    trending: false,
    personalityFit: ['organized', 'tech-savvy', 'nurturing'],
    rating: 4.6,
    reviews: 1523
  },
  {
    id: '3',
    name: 'Artisanal Coffee Subscription',
    description: '3-month subscription to small-batch, specialty coffee from around the world',
    category: 'Food & Drink',
    priceRange: '$60-120',
    priceMin: 60,
    priceMax: 120,
    recipient: ['dad', 'boss', 'friend', 'husband', 'boyfriend'],
    interests: ['coffee', 'food', 'discovery'],
    trending: true,
    personalityFit: ['foodie', 'adventurous', 'sophisticated'],
    rating: 4.9,
    reviews: 5672
  },
  {
    id: '4',
    name: 'Cozy Reading Nook Set',
    description: 'Soft throw blanket, book light, and gourmet tea selection',
    category: 'Lifestyle',
    priceRange: '$45-75',
    priceMin: 45,
    priceMax: 75,
    recipient: ['mom', 'wife', 'girlfriend', 'teacher', 'friend'],
    interests: ['reading', 'relaxation', 'tea', 'cozy'],
    trending: false,
    personalityFit: ['introverted', 'intellectual', 'homebody'],
    rating: 4.7,
    reviews: 967
  },
  {
    id: '5',
    name: 'Wireless Charging Stand with Clock',
    description: 'Sleek bedside charging station with digital clock and ambient lighting',
    category: 'Tech',
    priceRange: '$35-55',
    priceMin: 35,
    priceMax: 55,
    recipient: ['husband', 'boyfriend', 'dad', 'friend', 'boss'],
    interests: ['technology', 'organization', 'minimalism'],
    trending: true,
    personalityFit: ['tech-savvy', 'organized', 'modern'],
    rating: 4.5,
    reviews: 3241
  },
  {
    id: '6',
    name: 'DIY Terrarium Kit',
    description: 'Complete kit with glass container, plants, soil, and decorative elements',
    category: 'Craft & DIY',
    priceRange: '$25-45',
    priceMin: 25,
    priceMax: 45,
    recipient: ['kids', 'teacher', 'friend', 'mom', 'wife'],
    interests: ['crafts', 'plants', 'diy', 'creativity'],
    trending: false,
    personalityFit: ['creative', 'hands-on', 'nurturing'],
    rating: 4.4,
    reviews: 1876
  },
  {
    id: '7',
    name: 'Premium Leather Keychain Organizer',
    description: 'Handcrafted leather key organizer with multiple slots and bottle opener',
    category: 'Accessories',
    priceRange: '$20-35',
    priceMin: 20,
    priceMax: 35,
    recipient: ['dad', 'husband', 'boyfriend', 'boss', 'friend'],
    interests: ['organization', 'leather', 'practical'],
    trending: false,
    personalityFit: ['practical', 'organized', 'classic'],
    rating: 4.6,
    reviews: 892
  },
  {
    id: '8',
    name: 'Mindfulness & Meditation Set',
    description: 'Guided meditation app subscription, aromatherapy diffuser, and essential oils',
    category: 'Wellness',
    priceRange: '$50-85',
    priceMin: 50,
    priceMax: 85,
    recipient: ['wife', 'girlfriend', 'mom', 'friend', 'teacher'],
    interests: ['wellness', 'meditation', 'self-care', 'mindfulness'],
    trending: true,
    personalityFit: ['stressed', 'health-conscious', 'spiritual'],
    rating: 4.8,
    reviews: 2156
  }
];

const recipientProfiles = {
  'mom': { interests: ['home', 'family', 'cooking', 'reading'], personality: ['nurturing', 'traditional', 'caring'] },
  'dad': { interests: ['tools', 'sports', 'grilling', 'technology'], personality: ['practical', 'traditional', 'provider'] },
  'wife': { interests: ['jewelry', 'wellness', 'home', 'experiences'], personality: ['romantic', 'sophisticated', 'caring'] },
  'husband': { interests: ['technology', 'sports', 'tools', 'experiences'], personality: ['practical', 'adventurous', 'provider'] },
  'boyfriend': { interests: ['gaming', 'technology', 'experiences', 'fitness'], personality: ['fun', 'modern', 'active'] },
  'girlfriend': { interests: ['beauty', 'fashion', 'experiences', 'wellness'], personality: ['romantic', 'trendy', 'social'] },
  'friend': { interests: ['experiences', 'hobbies', 'food', 'entertainment'], personality: ['fun', 'social', 'varied'] },
  'kids': { interests: ['toys', 'games', 'crafts', 'learning'], personality: ['playful', 'curious', 'energetic'] },
  'teacher': { interests: ['books', 'organization', 'coffee', 'classroom'], personality: ['educational', 'organized', 'caring'] },
  'boss': { interests: ['office', 'quality', 'professional', 'food'], personality: ['professional', 'sophisticated', 'busy'] }
};

export function SmartGiftPlanner({ onNavigate }: SmartGiftPlannerProps) {
  const [recipient, setRecipient] = useState('');
  const [priceRange, setPriceRange] = useState([25, 100]);
  const [interests, setInterests] = useState<string[]>([]);
  const [personality, setPersonality] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendations, setRecommendations] = useState<GiftSuggestion[]>([]);
  const [savedGifts, setSavedGifts] = useState<string[]>([]);

  // Check for search context from intelligent search
  useEffect(() => {
    const context = sessionStorage.getItem('searchContext');
    if (context) {
      const parsed = JSON.parse(context);
      if (parsed.type === 'gift-planning') {
        setSearchQuery(parsed.query);
        if (parsed.recipient) {
          setRecipient(parsed.recipient);
          autoFillProfile(parsed.recipient);
        }
      }
      sessionStorage.removeItem('searchContext');
    }
  }, []);

  const autoFillProfile = (recipientType: string) => {
    const profile = recipientProfiles[recipientType as keyof typeof recipientProfiles];
    if (profile) {
      setInterests(profile.interests);
      setPersonality(profile.personality);
    }
  };

  useEffect(() => {
    generateRecommendations();
  }, [recipient, priceRange, interests, personality, searchQuery]);

  const generateRecommendations = () => {
    let filtered = giftDatabase.filter(gift => {
      const matchesRecipient = !recipient || gift.recipient.includes(recipient);
      const matchesPrice = gift.priceMin >= priceRange[0] && gift.priceMax <= priceRange[1];
      const matchesInterests = interests.length === 0 || interests.some(interest => 
        gift.interests.includes(interest)
      );
      const matchesPersonality = personality.length === 0 || personality.some(trait =>
        gift.personalityFit.includes(trait)
      );
      const matchesSearch = !searchQuery || 
        gift.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gift.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gift.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesRecipient && matchesPrice && matchesInterests && matchesPersonality && matchesSearch;
    });

    // Sort by relevance (trending first, then by rating)
    filtered.sort((a, b) => {
      if (a.trending && !b.trending) return -1;
      if (!a.trending && b.trending) return 1;
      return b.rating - a.rating;
    });

    setRecommendations(filtered);
  };

  const toggleSaved = (giftId: string) => {
    setSavedGifts(prev => 
      prev.includes(giftId) 
        ? prev.filter(id => id !== giftId)
        : [...prev, giftId]
    );
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const togglePersonality = (trait: string) => {
    setPersonality(prev => 
      prev.includes(trait)
        ? prev.filter(p => p !== trait)
        : [...prev, trait]
    );
  };

  const allInterests = ['technology', 'home', 'fashion', 'sports', 'cooking', 'reading', 'wellness', 'travel', 'gaming', 'music', 'art', 'fitness', 'crafts', 'food'];
  const personalityTraits = ['practical', 'romantic', 'adventurous', 'creative', 'tech-savvy', 'organized', 'trendy', 'traditional', 'sophisticated', 'fun'];

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#57C289] to-[#4AB371] text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => onNavigate('listmas')}
              className="text-white hover:bg-white/10 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#57C289]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Smart Gift Planner</h1>
                <p className="opacity-90">AI-powered gift recommendations for everyone on your list</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold">{recommendations.length}</div>
              <div className="text-sm opacity-90">Suggestions</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">${priceRange[0]}-${priceRange[1]}</div>
              <div className="text-sm opacity-90">Budget Range</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{savedGifts.length}</div>
              <div className="text-sm opacity-90">Saved Ideas</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{recommendations.filter(g => g.trending).length}</div>
              <div className="text-sm opacity-90">Trending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <Tabs defaultValue="finder" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="finder">Gift Finder</TabsTrigger>
            <TabsTrigger value="saved">Saved Ideas ({savedGifts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="finder" className="space-y-6">
            {/* Gift Finder Form */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Tell me about the gift recipient</h3>
              
              <div className="space-y-6">
                {/* Recipient Selection */}
                <div>
                  <label className="block font-medium mb-2">Who are you shopping for?</label>
                  <Select value={recipient} onValueChange={(value) => {
                    setRecipient(value);
                    autoFillProfile(value);
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(recipientProfiles).map(recipientType => (
                        <SelectItem key={recipientType} value={recipientType}>
                          {recipientType.charAt(0).toUpperCase() + recipientType.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block font-medium mb-2">
                    Budget Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Interests */}
                <div>
                  <label className="block font-medium mb-2">Their interests</label>
                  <div className="flex flex-wrap gap-2">
                    {allInterests.map(interest => (
                      <Badge
                        key={interest}
                        variant={interests.includes(interest) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Personality */}
                <div>
                  <label className="block font-medium mb-2">Their personality</label>
                  <div className="flex flex-wrap gap-2">
                    {personalityTraits.map(trait => (
                      <Badge
                        key={trait}
                        variant={personality.includes(trait) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => togglePersonality(trait)}
                      >
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search for specific gifts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">
                  {recommendations.length > 0 ? `${recommendations.length} Perfect Matches` : 'No matches found'}
                </h3>
                {recommendations.length > 0 && (
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">Personalized for you</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((gift) => (
                  <Card key={gift.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Gift className="w-5 h-5 text-[#57C289]" />
                        {gift.trending && (
                          <Badge variant="destructive" className="text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSaved(gift.id)}
                        className="p-1"
                      >
                        <Bookmark 
                          className={`w-4 h-4 ${savedGifts.includes(gift.id) ? 'fill-current text-yellow-500' : ''}`} 
                        />
                      </Button>
                    </div>

                    <h4 className="font-bold mb-2">{gift.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{gift.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{gift.category}</Badge>
                        <span className="font-bold text-[#57C289]">{gift.priceRange}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(gift.rating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {gift.rating} ({gift.reviews.toLocaleString()} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-[#57C289] hover:bg-[#4AB371]">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Add to List
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Your Saved Gift Ideas</h3>
              
              {savedGifts.length === 0 ? (
                <div className="text-center py-8">
                  <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No saved gifts yet. Start browsing to save your favorites!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedGifts.map(giftId => {
                    const gift = giftDatabase.find(g => g.id === giftId);
                    if (!gift) return null;
                    
                    return (
                      <div key={gift.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <Gift className="w-8 h-8 text-[#57C289]" />
                        <div className="flex-1">
                          <h4 className="font-medium">{gift.name}</h4>
                          <p className="text-sm text-gray-600">{gift.priceRange}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ShoppingBag className="w-4 h-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}