import React, { useState } from 'react';
import { PartyPopper, Users, Utensils, Music, Camera, ArrowLeft, CheckCircle, Plus, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface PartyPlanningPageProps {
  onNavigate: (page: string) => void;
}

interface ChecklistItem {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  dueDate?: string;
}

const partyChecklist: Record<string, ChecklistItem[]> = {
  planning: [
    { id: '1', title: 'Set party date and time', category: 'planning', completed: true },
    { id: '2', title: 'Create guest list', category: 'planning', completed: true },
    { id: '3', title: 'Choose party theme', category: 'planning', completed: false, dueDate: '2024-12-01' },
    { id: '4', title: 'Set budget', category: 'planning', completed: false, dueDate: '2024-12-01' },
    { id: '5', title: 'Book venue (if needed)', category: 'planning', completed: false, dueDate: '2024-12-03' },
  ],
  invitations: [
    { id: '6', title: 'Design invitations', category: 'invitations', completed: false, dueDate: '2024-12-05' },
    { id: '7', title: 'Send digital invites', category: 'invitations', completed: false, dueDate: '2024-12-07' },
    { id: '8', title: 'Mail physical invitations', category: 'invitations', completed: false, dueDate: '2024-12-07' },
    { id: '9', title: 'Track RSVPs', category: 'invitations', completed: false, dueDate: '2024-12-15' },
    { id: '10', title: 'Send reminder to guests', category: 'invitations', completed: false, dueDate: '2024-12-20' },
  ],
  foodDrinks: [
    { id: '11', title: 'Plan party menu', category: 'food', completed: false, dueDate: '2024-12-10' },
    { id: '12', title: 'Create shopping list', category: 'food', completed: false, dueDate: '2024-12-15' },
    { id: '13', title: 'Order special items', category: 'food', completed: false, dueDate: '2024-12-18' },
    { id: '14', title: 'Buy non-perishables', category: 'food', completed: false, dueDate: '2024-12-20' },
    { id: '15', title: 'Prep food day before', category: 'food', completed: false, dueDate: '2024-12-23' },
  ],
  decorations: [
    { id: '16', title: 'Choose decoration scheme', category: 'decorations', completed: false, dueDate: '2024-12-05' },
    { id: '17', title: 'Buy decorations', category: 'decorations', completed: false, dueDate: '2024-12-15' },
    { id: '18', title: 'Set up lighting', category: 'decorations', completed: false, dueDate: '2024-12-24' },
    { id: '19', title: 'Arrange furniture', category: 'decorations', completed: false, dueDate: '2024-12-24' },
    { id: '20', title: 'Final decoration setup', category: 'decorations', completed: false, dueDate: '2024-12-24' },
  ],
  entertainment: [
    { id: '21', title: 'Create playlist', category: 'entertainment', completed: false, dueDate: '2024-12-15' },
    { id: '22', title: 'Plan party games', category: 'entertainment', completed: false, dueDate: '2024-12-15' },
    { id: '23', title: 'Set up music system', category: 'entertainment', completed: false, dueDate: '2024-12-24' },
    { id: '24', title: 'Prepare game supplies', category: 'entertainment', completed: false, dueDate: '2024-12-24' },
    { id: '25', title: 'Designate photographer', category: 'entertainment', completed: false, dueDate: '2024-12-20' },
  ]
};

export function PartyPlanningPage({ onNavigate }: PartyPlanningPageProps) {
  const [checklist, setChecklist] = useState(partyChecklist);
  const [newItemTitle, setNewItemTitle] = useState('');

  const toggleItem = (category: string, id: string) => {
    setChecklist(prev => ({
      ...prev,
      [category]: prev[category].map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  const getTotalProgress = () => {
    const allItems = Object.values(checklist).flat();
    const completed = allItems.filter(item => item.completed).length;
    return Math.round((completed / allItems.length) * 100);
  };

  const getCategoryProgress = (category: string) => {
    const items = checklist[category];
    const completed = items.filter(item => item.completed).length;
    return Math.round((completed / items.length) * 100);
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      planning: <PartyPopper className="w-4 h-4" />,
      invitations: <Users className="w-4 h-4" />,
      foodDrinks: <Utensils className="w-4 h-4" />,
      decorations: <Camera className="w-4 h-4" />,
      entertainment: <Music className="w-4 h-4" />
    };
    return icons[category as keyof typeof icons];
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#6B7280] text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('christmas-spark-interface')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <PartyPopper className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-semibold">Party Planning Checklist</h1>
                <p className="text-white/80">Everything you need for the perfect holiday party</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Progress Overview */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Overall Progress</h2>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {getTotalProgress()}% Complete
            </Badge>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-[#6B7280] h-3 rounded-full transition-all duration-300"
              style={{ width: `${getTotalProgress()}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(checklist).map(([category, items]) => (
              <div key={category} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {getCategoryIcon(category)}
                </div>
                <p className="text-sm font-medium capitalize">{category.replace(/([A-Z])/g, ' $1')}</p>
                <p className="text-xs text-gray-600">{getCategoryProgress(category)}%</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Checklist Tabs */}
        <Tabs defaultValue="planning" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="invitations">Invites</TabsTrigger>
            <TabsTrigger value="foodDrinks">Food & Drinks</TabsTrigger>
            <TabsTrigger value="decorations">Decor</TabsTrigger>
            <TabsTrigger value="entertainment">Fun</TabsTrigger>
          </TabsList>

          {Object.entries(checklist).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(category)}
                    <h3 className="text-lg font-semibold capitalize">
                      {category.replace(/([A-Z])/g, ' $1')}
                    </h3>
                    <Badge variant="outline">
                      {items.filter(item => item.completed).length} / {items.length}
                    </Badge>
                  </div>
                  
                  <Button size="sm" className="bg-[#6B7280] hover:bg-[#6B7280]/80">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div 
                      key={item.id}
                      className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                        item.completed 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200 hover:shadow-sm'
                      }`}
                    >
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => toggleItem(category, item.id)}
                        className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                      />
                      
                      <div className="flex-1">
                        <p className={`font-medium ${
                          item.completed ? 'line-through text-gray-500' : 'text-gray-900'
                        }`}>
                          {item.title}
                        </p>
                        {item.dueDate && (
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            Due: {formatDate(item.dueDate)}
                          </p>
                        )}
                      </div>

                      {item.completed && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Party Tips */}
        <Card className="p-6 mt-8">
          <h3 className="font-semibold mb-4">Party Planning Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Timeline</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Start planning 4-6 weeks before</li>
                <li>• Send invites 2-3 weeks ahead</li>
                <li>• Confirm final count 1 week before</li>
                <li>• Prep food 1-2 days early</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Budget Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Food & drinks: 40-50% of budget</li>
                <li>• Decorations: 20-25%</li>
                <li>• Entertainment: 15-20%</li>
                <li>• Miscellaneous: 10-15%</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}