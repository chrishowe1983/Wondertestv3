import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Lightbulb, 
  Palette, 
  Scissors, 
  Home,
  Users,
  Clock,
  Star,
  Bookmark,
  Share2,
  Search,
  Filter,
  Sparkles,
  Camera,
  Play,
  Download
} from 'lucide-react';

interface CreativeSparkStudioProps {
  onNavigate: (page: string) => void;
}

interface CreativeIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeRequired: string;
  materialsNeeded: string[];
  cost: string;
  trending: boolean;
  rating: number;
  saves: number;
  instructions: string[];
  tips: string[];
  imageUrl?: string;
  videoUrl?: string;
  tags: string[];
}

const creativeIdeas: CreativeIdea[] = [
  {
    id: '1',
    title: 'Mason Jar Snow Globes',
    description: 'Create magical snow globes using mason jars, glitter, and holiday figurines',
    category: 'Decorations',
    difficulty: 'Easy',
    timeRequired: '30 mins',
    materialsNeeded: ['Mason jars', 'Glitter', 'Glycerin', 'Small figurines', 'Super glue', 'Water'],
    cost: '$15-25',
    trending: true,
    rating: 4.8,
    saves: 2847,
    instructions: [
      'Clean mason jars thoroughly',
      'Glue figurines to jar lid interior',
      'Fill jar 3/4 with water',
      'Add 1 tsp glycerin and glitter',
      'Screw on lid tightly',
      'Shake and enjoy!'
    ],
    tips: [
      'Use distilled water to prevent cloudiness',
      'Let glue dry completely before adding water',
      'Add a drop of dish soap to help glitter float'
    ],
    tags: ['christmas', 'diy', 'kids', 'gifts', 'winter']
  },
  {
    id: '2',
    title: 'Advent Calendar Photo Wall',
    description: 'Create a stunning advent calendar using family photos and small pockets',
    category: 'Decorations',
    difficulty: 'Medium',
    timeRequired: '2 hours',
    materialsNeeded: ['Canvas or poster board', 'Small envelopes', 'Photos', 'String lights', 'Markers', 'Glue'],
    cost: '$20-35',
    trending: false,
    rating: 4.6,
    saves: 1523,
    instructions: [
      'Arrange 24 small envelopes on canvas',
      'Number each envelope 1-24',
      'Insert a family photo and activity in each',
      'Attach string lights around the border',
      'Hang at child-friendly height'
    ],
    tips: [
      'Include both photos and activities',
      'Use different colored envelopes',
      'Make activities age-appropriate'
    ],
    tags: ['advent', 'family', 'photos', 'memories', 'christmas']
  },
  {
    id: '3',
    title: 'Cinnamon Stick Christmas Trees',
    description: 'Craft aromatic Christmas trees using cinnamon sticks and natural materials',
    category: 'Crafts',
    difficulty: 'Easy',
    timeRequired: '45 mins',
    materialsNeeded: ['Cinnamon sticks', 'Hot glue gun', 'Small star', 'Ribbon', 'Essential oils'],
    cost: '$10-20',
    trending: true,
    rating: 4.7,
    saves: 3241,
    instructions: [
      'Arrange cinnamon sticks in tree shape',
      'Hot glue sticks together',
      'Add star on top',
      'Tie ribbon around base',
      'Add drops of cinnamon essential oil'
    ],
    tips: [
      'Use various lengths for natural look',
      'Let glue cool before handling',
      'Refresh scent weekly with oils'
    ],
    tags: ['natural', 'scented', 'rustic', 'christmas', 'easy']
  },
  {
    id: '4',
    title: 'Paper Snowflake Backdrop',
    description: 'Create an elegant paper snowflake wall installation for parties',
    category: 'Decorations',
    difficulty: 'Medium',
    timeRequired: '3 hours',
    materialsNeeded: ['White paper', 'Scissors', 'Double-sided tape', 'Template', 'String lights'],
    cost: '$15-30',
    trending: false,
    rating: 4.5,
    saves: 1876,
    instructions: [
      'Print or draw snowflake templates',
      'Cut out various sizes of snowflakes',
      'Create depth with layering',
      'Attach to wall with tape',
      'Add string lights behind for glow'
    ],
    tips: [
      'Make 3 different sizes for depth',
      'Use heavyweight paper for durability',
      'Plan layout before attaching'
    ],
    tags: ['paper', 'backdrop', 'party', 'elegant', 'winter']
  },
  {
    id: '5',
    title: 'Cookie Decorating Station',
    description: 'Set up an interactive cookie decorating station for family fun',
    category: 'Activities',
    difficulty: 'Easy',
    timeRequired: '1 hour setup',
    materialsNeeded: ['Sugar cookies', 'Royal icing', 'Food coloring', 'Sprinkles', 'Piping bags', 'Small bowls'],
    cost: '$25-40',
    trending: true,
    rating: 4.9,
    saves: 4567,
    instructions: [
      'Bake sugar cookies in festive shapes',
      'Prepare colored royal icing',
      'Set up decorating station with tools',
      'Provide aprons and wet wipes',
      'Display finished cookies on rack'
    ],
    tips: [
      'Make icing slightly thicker for kids',
      'Use squeeze bottles for easy decorating',
      'Prepare extra cookies for mistakes'
    ],
    tags: ['baking', 'family', 'interactive', 'christmas', 'kids']
  },
  {
    id: '6',
    title: 'Memory Jar Tradition',
    description: 'Start a new family tradition with a Christmas memory jar',
    category: 'Traditions',
    difficulty: 'Easy',
    timeRequired: '20 mins',
    materialsNeeded: ['Large mason jar', 'Colored paper', 'Pens', 'Ribbon', 'Label'],
    cost: '$10-15',
    trending: false,
    rating: 4.8,
    saves: 2156,
    instructions: [
      'Decorate large mason jar',
      'Cut paper into small strips',
      'Write prompts for memories',
      'Place jar in central location',
      'Read memories on New Years'
    ],
    tips: [
      'Include the date on each memory',
      'Use different colors for family members',
      'Make it part of daily routine'
    ],
    tags: ['tradition', 'memories', 'family', 'simple', 'meaningful']
  }
];

const categories = ['All', 'Decorations', 'Crafts', 'Activities', 'Traditions', 'Gifts'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

export function CreativeSparkStudio({ onNavigate }: CreativeSparkStudioProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [filteredIdeas, setFilteredIdeas] = useState<CreativeIdea[]>(creativeIdeas);
  const [savedIdeas, setSavedIdeas] = useState<string[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<CreativeIdea | null>(null);

  // Check for search context
  useEffect(() => {
    const context = sessionStorage.getItem('searchContext');
    if (context) {
      const parsed = JSON.parse(context);
      if (parsed.type === 'creative-inspiration') {
        setSearchQuery(parsed.query);
        if (parsed.category === 'decoration') {
          setSelectedCategory('Decorations');
        } else if (parsed.category === 'activities') {
          setSelectedCategory('Activities');
        }
      }
      sessionStorage.removeItem('searchContext');
    }
  }, []);

  useEffect(() => {
    filterIdeas();
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const filterIdeas = () => {
    let filtered = creativeIdeas.filter(idea => {
      const matchesSearch = !searchQuery || 
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || idea.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || idea.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Sort by trending first, then by rating
    filtered.sort((a, b) => {
      if (a.trending && !b.trending) return -1;
      if (!a.trending && b.trending) return 1;
      return b.rating - a.rating;
    });

    setFilteredIdeas(filtered);
  };

  const toggleSaved = (ideaId: string) => {
    setSavedIdeas(prev => 
      prev.includes(ideaId)
        ? prev.filter(id => id !== ideaId)
        : [...prev, ideaId]
    );
  };

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
                <Lightbulb className="w-6 h-6 text-[#57C289]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Creative Spark Studio</h1>
                <p className="opacity-90">Get inspired with creative ideas and DIY projects</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold">{filteredIdeas.length}</div>
              <div className="text-sm opacity-90">Ideas Found</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{filteredIdeas.filter(i => i.trending).length}</div>
              <div className="text-sm opacity-90">Trending</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{savedIdeas.length}</div>
              <div className="text-sm opacity-90">Saved</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{filteredIdeas.filter(i => i.difficulty === 'Easy').length}</div>
              <div className="text-sm opacity-90">Easy Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
        {selectedIdea ? (
          // Detailed Idea View
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedIdea(null)}
                className="p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-2xl font-bold">{selectedIdea.title}</h2>
              <Button
                variant="ghost"
                onClick={() => toggleSaved(selectedIdea.id)}
                className="ml-auto"
              >
                <Bookmark 
                  className={`w-5 h-5 ${savedIdeas.includes(selectedIdea.id) ? 'fill-current text-yellow-500' : ''}`} 
                />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="outline">{selectedIdea.category}</Badge>
                    <Badge variant={selectedIdea.difficulty === 'Easy' ? 'secondary' : selectedIdea.difficulty === 'Medium' ? 'default' : 'destructive'}>
                      {selectedIdea.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{selectedIdea.timeRequired}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="text-sm">{selectedIdea.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{selectedIdea.description}</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold mb-2">Instructions</h4>
                      <ol className="space-y-2">
                        {selectedIdea.instructions.map((step, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-[#57C289] text-white rounded-full flex items-center justify-center text-sm">
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-bold mb-2">Pro Tips</h4>
                      <ul className="space-y-1">
                        {selectedIdea.tips.map((tip, index) => (
                          <li key={index} className="flex gap-2">
                            <Sparkles className="w-4 h-4 text-[#57C289] flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <Card className="p-4">
                  <h4 className="font-bold mb-3">Materials Needed</h4>
                  <ul className="space-y-2">
                    {selectedIdea.materialsNeeded.map((material, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#57C289] rounded-full"></div>
                        <span className="text-sm">{material}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Estimated Cost:</span>
                      <span className="text-[#57C289] font-bold">{selectedIdea.cost}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-bold mb-3">Project Stats</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Difficulty:</span>
                      <span className="text-sm font-medium">{selectedIdea.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Time Required:</span>
                      <span className="text-sm font-medium">{selectedIdea.timeRequired}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Rating:</span>
                      <span className="text-sm font-medium">{selectedIdea.rating}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Saves:</span>
                      <span className="text-sm font-medium">{selectedIdea.saves.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>

                <div className="space-y-2">
                  <Button className="w-full bg-[#57C289] hover:bg-[#4AB371]">
                    <Download className="w-4 h-4 mr-2" />
                    Save to My Projects
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Idea
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Ideas Grid View
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Browse Ideas</TabsTrigger>
              <TabsTrigger value="saved">My Saved Ideas ({savedIdeas.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-6">
              {/* Filters */}
              <Card className="p-6">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="relative flex-1 min-w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search creative ideas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {difficulties.map(difficulty => (
                      <Button
                        key={difficulty}
                        variant={selectedDifficulty === difficulty ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDifficulty(difficulty)}
                      >
                        {difficulty}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Ideas Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIdeas.map((idea) => (
                  <Card key={idea.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Palette className="w-5 h-5 text-[#57C289]" />
                        {idea.trending && (
                          <Badge variant="destructive" className="text-xs">
                            Trending
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaved(idea.id);
                        }}
                        className="p-1"
                      >
                        <Bookmark 
                          className={`w-4 h-4 ${savedIdeas.includes(idea.id) ? 'fill-current text-yellow-500' : ''}`} 
                        />
                      </Button>
                    </div>

                    <div onClick={() => setSelectedIdea(idea)}>
                      <h4 className="font-bold mb-2">{idea.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{idea.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{idea.category}</Badge>
                          <Badge variant={idea.difficulty === 'Easy' ? 'secondary' : idea.difficulty === 'Medium' ? 'default' : 'destructive'}>
                            {idea.difficulty}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{idea.timeRequired}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current text-yellow-400" />
                            <span>{idea.rating}</span>
                          </div>
                        </div>

                        <div className="text-sm text-[#57C289] font-medium">
                          {idea.cost}
                        </div>
                      </div>

                      <Button className="w-full bg-[#57C289] hover:bg-[#4AB371]">
                        View Instructions
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Your Saved Creative Ideas</h3>
                
                {savedIdeas.length === 0 ? (
                  <div className="text-center py-8">
                    <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No saved ideas yet. Start browsing to save your favorites!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedIdeas.map(ideaId => {
                      const idea = creativeIdeas.find(i => i.id === ideaId);
                      if (!idea) return null;
                      
                      return (
                        <div 
                          key={idea.id} 
                          className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:shadow-sm"
                          onClick={() => setSelectedIdea(idea)}
                        >
                          <Lightbulb className="w-8 h-8 text-[#57C289]" />
                          <div className="flex-1">
                            <h4 className="font-medium">{idea.title}</h4>
                            <p className="text-sm text-gray-600">{idea.difficulty} • {idea.timeRequired}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}