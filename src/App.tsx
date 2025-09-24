import React, { useState, useEffect } from 'react';
import { emotions } from './lib/config';
import { PageRouter } from './components/PageRouter';
import { PasswordProtection } from './components/PasswordProtection';
import { MobileNavigation } from './components/MobileNavigation';
import { HoverNavigation } from './components/HoverNavigation';
import { 
  isMobileDevice, 
  ensureMobileViewport, 
  addMobileKeyboardCSS, 
  handleMobileKeyboard, 
  setupMobileOptimizations 
} from './lib/mobile-utils';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [recentModules, setRecentModules] = useState<string[]>([]);

  useEffect(() => {
    // Mobile detection and optimization setup
    const mobile = isMobileDevice();
    setIsMobile(mobile);

    if (mobile) {
      ensureMobileViewport();
      addMobileKeyboardCSS();
      handleMobileKeyboard();
      setupMobileOptimizations();
    }

    // Load recent modules from localStorage
    const stored = localStorage.getItem('wonderlist-recent-modules');
    if (stored) {
      try {
        setRecentModules(JSON.parse(stored));
      } catch (e) {
        console.warn('Failed to parse recent modules:', e);
      }
    }

    // Handle viewport height changes for mobile
    const updateViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateViewportHeight, 500);
    });

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
    };
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    
    // Update recent modules
    if (page !== 'home' && !recentModules.includes(page)) {
      const updated = [page, ...recentModules.filter(m => m !== page)].slice(0, 5);
      setRecentModules(updated);
      localStorage.setItem('wonderlist-recent-modules', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Mobile Navigation */}
      {isMobile && (
        <MobileNavigation 
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
      )}
      
      {/* Desktop Navigation */}
      {!isMobile && (
        <HoverNavigation 
          onNavigate={handleNavigate}
          currentPage={currentPage}
          recentModules={recentModules}
        />
      )}
      
      {/* Main Content */}
      <div className={`${!isMobile ? 'ml-20' : ''} ${isMobile ? 'pt-16' : ''}`}>
        <PageRouter 
          currentPage={currentPage}
          emotions={emotions}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PasswordProtection>
      <AppContent />
    </PasswordProtection>
  );
}