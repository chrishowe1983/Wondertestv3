import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, Gift, Heart, Baby } from 'lucide-react';

interface App {
  id: string;
  name: string;
  subtitle: string;
  status: 'Coming Soon' | 'Available' | 'Beta';
  tags: string[];
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

const excitedApps: App[] = [
  {
    id: 'listmas',
    name: 'Listmas',
    subtitle: 'Holiday Magic Organizer',
    status: 'Coming Soon',
    tags: ['Planning', 'Holidays'],
    icon: Gift,
    color: '#22C55E',
    description: 'Transform your holiday season into organized magic'
  },
  {
    id: 'festive-sync',
    name: 'FestiveSync',
    subtitle: 'Christmas Coordination',
    status: 'Coming Soon', 
    tags: ['Family', 'Events'],
    icon: Gift,
    color: '#DC2626',
    description: 'Coordinate family celebrations effortlessly'
  },
  {
    id: 'wedding-sync',
    name: 'WeddingSync',
    subtitle: 'Dream Day Planner',
    status: 'Coming Soon',
    tags: ['Wedding', 'Planning'],
    icon: Heart,
    color: '#EC4899',
    description: 'Your complete wedding planning companion'
  },
  {
    id: 'wedding-pro',
    name: 'WeddingPro',
    subtitle: 'Vendor Management',
    status: 'Coming Soon',
    tags: ['Professional', 'Vendors'],
    icon: Heart,
    color: '#BE185D',
    description: 'Professional vendor coordination tools'
  },
  {
    id: 'baby-prep',
    name: 'BabyPrep',
    subtitle: 'Pregnancy Companion',
    status: 'Coming Soon',
    tags: ['Pregnancy', 'Health'],
    icon: Baby,
    color: '#3B82F6',
    description: 'Track your pregnancy journey with confidence'
  },
  {
    id: 'family-sync',
    name: 'FamilySync',
    subtitle: 'New Parent Organizer',
    status: 'Coming Soon',
    tags: ['Family', 'Newborn'],
    icon: Baby,
    color: '#1D4ED8',
    description: 'Organize your growing family with ease'
  }
];

export function AppGrid() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Available Apps</h3>
        <p className="text-gray-600">Specialized tools for life's biggest celebrations</p>
      </div>

      {/* Apps Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {excitedApps.map((app) => {
            const IconComponent = app.icon;
            return (
              <Card key={app.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer group border border-gray-200 rounded-xl">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: app.color }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-[#F05959] transition-colors">
                        {app.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-500">{app.status}</span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#F05959] transition-colors" />
                </div>

                {/* Subtitle */}
                <p className="text-sm text-gray-600 mb-4">{app.subtitle}</p>

                {/* Description */}
                <p className="text-xs text-gray-500 mb-4">{app.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {app.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Ready to start planning?</p>
          <button className="text-sm text-[#F05959] font-medium hover:underline">
            Join the waitlist for early access →
          </button>
        </div>
      </div>
    </div>
  );
}