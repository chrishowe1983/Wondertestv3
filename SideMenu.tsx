import React, { useState } from 'react';
import { Home, Gift, House, TrendingUp, Menu, Heart, Lightbulb, Calendar, Play, Scissors, Users, Clock, Utensils, List, ShoppingBag, DollarSign, Mail, Baby, GraduationCap, RefreshCw } from 'lucide-react';

interface RecentModule {
  page: string;
  name: string;
  icon: string;
  timestamp: number;
}

interface SideMenuProps {
  onNavigate: (page: string) => void;
  currentPage?: string;
  recentModules?: RecentModule[];
  onHoverChange?: (isHovered: boolean) => void;
}

export function SideMenu({ onNavigate, currentPage, recentModules = [], onHoverChange }: SideMenuProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverChange = (hovered: boolean) => {
    setIsHovered(hovered);
    onHoverChange?.(hovered);
  };

  // Icon mapping for recent modules
  const iconMap: Record<string, React.ComponentType<any>> = {
    'gift': Gift,
    'heart': Heart,
    'lightbulb': Lightbulb,
    'calendar': Calendar,
    'play': Play,
    'scissors': Scissors,
    'users': Users,
    'clock': Clock,
    'utensils': Utensils,
    'list': List,
    'shopping-bag': ShoppingBag,
    'dollar-sign': DollarSign,
    'mail': Mail,
    'baby': Baby,
    'home': House,
    'graduation-cap': GraduationCap,
    'trending-up': TrendingUp,
    'refresh-cw': RefreshCw
  };

  const menuSections = [
    {
      id: 'home',
      name: 'WonderList',
      bgColor: 'bg-[#030F38]',
      textColor: 'text-white',
      icon: Home,
      links: [
        { name: 'Home', page: 'home' }
        // Removed "All Emotions" as requested
      ]
    },
    {
      id: 'excited',
      name: 'Excited',
      bgColor: 'bg-[#F05959]',
      textColor: 'text-white',
      icon: Gift,
      // Removed "Creative & Energetic" descriptor as requested
      links: [
        // Removed "Feel Excited" as requested
        { name: 'Christmas Planning', page: 'christmas' },
        { name: 'Wedding Planning', page: 'weddings' },
        { name: 'Baby Planning', page: 'babies' }
      ]
    },
    {
      id: 'ready',
      name: 'Ready',
      bgColor: 'bg-[#57C289]',
      textColor: 'text-white',
      icon: House,
      // Removed "Organized & Prepared" descriptor as requested
      links: [
        // Removed "Feel Ready" as requested
        { name: 'Home Organization', page: 'home' },
        { name: 'Meal Planning', page: 'meals' },
        { name: 'School Planning', page: 'school' }
      ]
    },
    {
      id: 'confident',
      name: 'Confident',
      bgColor: 'bg-[#0F73FF]',
      textColor: 'text-white',
      icon: TrendingUp,
      // Removed "Professional & Stable" descriptor as requested
      links: [
        { name: 'Finance Planning', page: 'finance' },
        { name: 'Career Growth', page: 'careers' },
        { name: 'Life Changes', page: 'life-change' }
      ]
    }
  ];

  const menuItems = [
    {
      id: 'menu',
      icon: Menu,
      bgColor: 'bg-gray-100',
      page: null,
      isMenu: true
    },
    {
      id: 'home',
      icon: Home,
      bgColor: 'bg-[#030F38]',
      page: 'home'
    },
    {
      id: 'excited',
      icon: Gift,
      bgColor: 'bg-[#F05959]',
      page: 'excited'
    },
    {
      id: 'ready',
      icon: House,
      bgColor: 'bg-[#57C289]',
      page: 'ready'
    },
    {
      id: 'confident',
      icon: TrendingUp,
      bgColor: 'bg-[#0F73FF]',
      page: 'confident'
    }
  ];

  return (
    <>
      {/* Main Side Menu - Hidden on mobile, visible on desktop */}
      <div 
        className={`hidden md:flex fixed top-0 h-full w-16 bg-white border-r border-gray-200 shadow-lg z-50 flex-col items-center py-8 transition-all duration-300 ${
          isHovered ? 'left-64' : 'left-0'
        }`}
        onMouseEnter={() => handleHoverChange(true)}
        onMouseLeave={() => handleHoverChange(false)}
      >
        {/* Menu Items */}
        <div className="flex flex-col gap-8">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.page || 
              (item.id === 'home' && currentPage === 'home') ||
              (item.id === 'excited' && (currentPage === 'excited' || currentPage?.startsWith('christmas'))) ||
              (item.id === 'ready' && (currentPage === 'ready' || ['home', 'meals', 'school'].includes(currentPage || ''))) ||
              (item.id === 'confident' && (currentPage === 'confident' || ['finance', 'careers', 'life-change'].includes(currentPage || '')));

            return (
              <div
                key={item.id}
                className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 ${
                  item.isMenu 
                    ? 'bg-gray-100 hover:bg-gray-200' 
                    : `${item.bgColor} ${isActive ? 'ring-2 ring-gray-300' : ''}`
                }`}
                onClick={() => item.page && onNavigate(item.page)}
              >
                <IconComponent 
                  className={`w-5 h-5 ${
                    item.isMenu ? 'text-gray-600' : 'text-white'
                  }`} 
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Menu on Hover - Desktop only */}
      {isHovered && (
        <div
          className="hidden md:block fixed left-0 top-0 h-full z-40 transition-all duration-300 ease-out"
          onMouseEnter={() => handleHoverChange(true)}
          onMouseLeave={() => handleHoverChange(false)}
        >
          {/* Menu Container */}
          <div className="h-full">
            {/* Expanded Menu Content */}
            <div className="w-64 bg-white shadow-xl border-r border-gray-200 h-full">
              {menuSections.map((section) => (
                <div key={section.id} className={`${section.bgColor} relative`}>
                  {/* Section Header */}
                  <div className="px-3 py-2 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <section.icon className="w-4 h-4 text-white" />
                      <h3 className="text-sm font-semibold text-white">{section.name}</h3>
                    </div>
                  </div>

                  {/* Section Links */}
                  <div className="px-2 py-1 space-y-0.5">
                    {section.links.map((link) => (
                      <button
                        key={link.page}
                        onClick={() => {
                          onNavigate(link.page);
                          handleHoverChange(false);
                        }}
                        className={`w-full text-left px-2 py-1 rounded-lg text-white/90 hover:bg-white/10 hover:text-white transition-colors text-sm ${
                          currentPage === link.page ? 'bg-white/20 text-white' : ''
                        }`}
                      >
                        {link.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Recent Modules */}
              <div className="p-2 border-t border-gray-200 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Modules</h4>
                <div className="space-y-1">
                  {recentModules.length === 0 ? (
                    <p className="text-xs text-gray-500 px-2 py-1.5">No recent modules yet</p>
                  ) : (
                    recentModules.map((module) => {
                      const IconComponent = iconMap[module.icon] || Gift;
                      return (
                        <button
                          key={module.page}
                          onClick={() => {
                            onNavigate(module.page);
                            handleHoverChange(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm flex items-center gap-2 ${
                            currentPage === module.page ? 'bg-gray-100 text-gray-900' : ''
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          {module.name}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop - Desktop only */}
      {isHovered && (
        <div 
          className="hidden md:block fixed inset-0 bg-black/20 z-30"
          onClick={() => handleHoverChange(false)}
        />
      )}
    </>
  );
}