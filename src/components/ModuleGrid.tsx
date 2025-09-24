import React from 'react';
import { Card } from './ui/card';
import { 
  Target, Sunrise, Trophy, Folder, Calendar, Clock, Star, Briefcase, Settings,
  Rocket, Lightbulb, Map, Book, Users, Zap, Sparkles, Brain, Heart,
  Crown, Megaphone, CheckCircle, Handshake, Monitor, Link, Compass, Shield, Mountain,
  Circle, Search, PenTool, Wind, RotateCcw, TreePine, Smile, Eye, Scale,
  Home, Utensils, GraduationCap, Gift, Baby, DollarSign, TrendingUp, RefreshCw
} from 'lucide-react';
import type { Emotion } from '../App';

const iconMap: Record<string, React.ComponentType<any>> = {
  target: Target,
  sunrise: Sunrise,
  trophy: Trophy,
  folder: Folder,
  calendar: Calendar,
  clock: Clock,
  star: Star,
  briefcase: Briefcase,
  settings: Settings,
  rocket: Rocket,
  lightbulb: Lightbulb,
  map: Map,
  book: Book,
  users: Users,
  zap: Zap,
  'party-popper': Sparkles,
  brain: Brain,
  heart: Heart,
  crown: Crown,
  megaphone: Megaphone,
  'check-circle': CheckCircle,
  handshake: Handshake,
  presentation: Monitor,
  link: Link,
  compass: Compass,
  shield: Shield,
  mountain: Mountain,
  circle: Circle,
  mirror: Search,
  'pen-tool': PenTool,
  wind: Wind,
  move: RotateCcw,
  'tree-pine': TreePine,
  smile: Smile,
  eye: Eye,
  scale: Scale,
  home: Home,
  utensils: Utensils,
  'graduation-cap': GraduationCap,
  gift: Gift,
  baby: Baby,
  'dollar-sign': DollarSign,
  'trending-up': TrendingUp,
  'refresh-cw': RefreshCw
};

interface ModuleGridProps {
  modules: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
  }>;
  emotion: Emotion;
  onNavigate?: (page: string) => void;
}

export function ModuleGrid({ modules, emotion, onNavigate }: ModuleGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {modules.map((module) => {
        const IconComponent = iconMap[module.icon] || Target;
        
        return (
          <Card 
            key={module.id}
            className="p-5 cursor-pointer transition-all duration-300 hover:shadow-md border border-gray-200 hover:border-gray-300 bg-white"
            onClick={() => onNavigate && onNavigate(module.id)}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 ${emotion.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-900 mb-1">
                  {module.name}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {module.description}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}