import React, { useState, useEffect } from 'react';
import { emotions } from './lib/config';
import { PageRouter } from './components/PageRouter';
import { MobileNavigation } from './components/MobileNavigation';
import { HoverNavigation } from './components/HoverNavigation';
import { 
  isMobileDevice, 
  ensureMobileViewport, 
  addMobileKeyboardCSS, 
  handleMobileKeyboard, 
  setupMobileOptimizations 
} from './lib/mobile-utils';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [recentModules, setRecentModules] = useState<string[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = isMobileDevice();
      setIsMobile(mobile);
      
      if (mobile) {
        ensureMobileViewport();
        addMobileKeyboardCSS();
        handleMobileKeyboard();
        setupMobileOptimizations();
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    
    // Add to recent modules if it's an emotion page
    if (emotions.some(emotion => emotion.id === page)) {
      setRecentModules(prev => {
        const filtered = prev.filter(id => id !== page);
        return [page, ...filtered].slice(0, 5);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {isMobile ? (
        <MobileNavigation 
          currentPage={currentPage}
          onPageChange={handlePageChange}
          recentModules={recentModules}
        />
      ) : (
        <HoverNavigation 
          currentPage={currentPage}
          onPageChange={handlePageChange}
          recentModules={recentModules}
        />
      )}
      
      <PageRouter 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isMobile={isMobile}
      />
    </div>
  );
}