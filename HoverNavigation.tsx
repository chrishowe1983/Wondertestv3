import React from 'react';
import { Home, Gift, House, TrendingUp, Clock } from 'lucide-react';

interface HoverNavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  recentModules: string[];
}

const navigationItems = [
  { 
    id: 'home', 
    name: 'Home', 
    icon: Home, 
    page: 'home' 
  },
  { 
    id: 'excited', 
    name: 'Excited', 
    icon: Gift, 
    page: 'excited', 
    color: '#F05959',
    subItems: [
      { name: 'Christmas Planning', page: 'christmas' },
      { name: 'Wedding Planning', page: 'weddings' },
      { name: 'Baby Planning', page: 'babies' }
    ]
  },
  { 
    id: 'ready', 
    name: 'Ready', 
    icon: House, 
    page: 'ready', 
    color: '#57C289',
    subItems: [
      { name: 'Home Organization', page: 'home-org' },
      { name: 'Meal Planning', page: 'meals' },
      { name: 'School Planning', page: 'school' }
    ]
  },
  { 
    id: 'confident', 
    name: 'Confident', 
    icon: TrendingUp, 
    page: 'confident', 
    color: '#0F73FF',
    subItems: [
      { name: 'Finance Planning', page: 'finance' },
      { name: 'Career Growth', page: 'careers' },
      { name: 'Life Changes', page: 'life-change' }
    ]
  }
];

export function HoverNavigation({ onNavigate, currentPage, recentModules }: HoverNavigationProps) {
  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-[#030F38] z-40 hover:w-64 transition-all duration-300 group">
      
      {/* Logo Section */}
      <div className="p-4 border-b border-white/10">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-[#030F38] text-sm font-bold">W</span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
          <p className="text-white font-semibold">WonderList</p>
          <p className="text-white/60 text-xs">Emotion-driven planning</p>
        </div>
      </div>
      
      {/* Navigation Items */}
      <nav className="mt-8 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          
          return (
            <div key={item.id}>
              {/* Main Item */}
              <button
                onClick={() => onNavigate(item.page)}
                className={`w-full flex items-center p-4 transition-all duration-200 ${
                  isActive ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  item.color ? `bg-[${item.color}]` : 'bg-white/10'
                }`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-medium text-left">{item.name}</p>
                  {item.subItems && (
                    <p className="text-white/60 text-xs">{item.subItems.length} modules</p>
                  )}
                </div>
              </button>

              {/* Sub Items */}
              {item.subItems && (
                <div className="ml-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-1">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.page}
                      onClick={() => onNavigate(subItem.page)}
                      className={`w-full text-left p-2 rounded-lg transition-colors ${
                        currentPage === subItem.page
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="text-sm">{subItem.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Recent Modules */}
      {recentModules.length > 0 && (
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center mb-2">
              <Clock className="w-4 h-4 text-white/60" />
              <span className="ml-2 text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Recent
              </span>
            </div>
            <div className="space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {recentModules.slice(0, 3).map((module) => (
                <button
                  key={module}
                  onClick={() => onNavigate(module)}
                  className="w-full text-left p-2 text-white/50 hover:text-white/80 text-xs"
                >
                  {module}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}