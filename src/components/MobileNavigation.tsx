import React, { useState } from 'react';
import { Button } from './ui/button';
import { Home, Gift, House, TrendingUp, Menu, X } from 'lucide-react';

interface MobileNavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
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
    color: 'bg-[#F05959]',
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
    color: 'bg-[#57C289]',
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
    color: 'bg-[#0F73FF]',
    subItems: [
      { name: 'Finance Planning', page: 'finance' },
      { name: 'Career Growth', page: 'careers' },
      { name: 'Life Changes', page: 'life-change' }
    ]
  }
];

export function MobileNavigation({ onNavigate, currentPage }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between h-16 mobile-padding">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#030F38] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">W</span>
            </div>
            <span className="font-semibold text-[#030F38]">WonderList</span>
          </div>
          
          {/* Menu Toggle */}
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 
        transform transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } shadow-2xl border-l border-gray-100`}>
        
        {/* Menu Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 bg-white">
          <h2 className="font-semibold text-[#030F38]">Navigation</h2>
          <Button
            onClick={() => setIsMenuOpen(false)}
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto bg-white">
          <nav className="p-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              
              return (
                <div key={item.id} className="mb-1">
                  {/* Main Item */}
                  <button
                    onClick={() => handleNavigate(item.page)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-gray-50 border border-gray-200' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.color || 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        item.color ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      {item.subItems && (
                        <p className="text-sm text-gray-500">{item.subItems.length} modules</p>
                      )}
                    </div>
                  </button>

                  {/* Sub Items */}
                  {item.subItems && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.page}
                          onClick={() => handleNavigate(subItem.page)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            currentPage === subItem.page
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
        </div>

        {/* Menu Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            WonderList • Emotion-driven planning
          </p>
        </div>
      </div>
    </>
  );
}