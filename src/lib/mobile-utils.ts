// Enhanced mobile detection utilities for WonderList

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return (
    // User Agent Detection
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    
    // Screen Size Detection
    window.innerWidth <= 768 ||
    
    // Touch Capability Detection
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    
    // Orientation Detection
    (window.screen && window.screen.orientation && window.screen.orientation.angle !== undefined)
  );
}

export function ensureMobileViewport(): void {
  if (typeof document === 'undefined') return;

  // Remove existing viewport meta tag
  const existingViewport = document.querySelector('meta[name="viewport"]');
  if (existingViewport) {
    existingViewport.remove();
  }

  // Create comprehensive viewport meta tag
  const viewport = document.createElement('meta');
  viewport.name = 'viewport';
  viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, shrink-to-fit=no';
  document.head.appendChild(viewport);

  // Add PWA-specific meta tags
  if (!document.querySelector('meta[name="mobile-web-app-capable"]')) {
    const mobileCapable = document.createElement('meta');
    mobileCapable.name = 'mobile-web-app-capable';
    mobileCapable.content = 'yes';
    document.head.appendChild(mobileCapable);
  }

  if (!document.querySelector('meta[name="apple-mobile-web-app-capable"]')) {
    const appleCapable = document.createElement('meta');
    appleCapable.name = 'apple-mobile-web-app-capable';
    appleCapable.content = 'yes';
    document.head.appendChild(appleCapable);
  }

  if (!document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')) {
    const statusBar = document.createElement('meta');
    statusBar.name = 'apple-mobile-web-app-status-bar-style';
    statusBar.content = 'default';
    document.head.appendChild(statusBar);
  }
}

export function addMobileKeyboardCSS(): void {
  if (typeof document === 'undefined') return;

  const cssId = 'mobile-keyboard-styles';
  if (document.getElementById(cssId)) return;

  const css = `
    /* Enhanced mobile keyboard handling */
    @media (max-width: 768px) {
      /* Prevent zoom on input focus */
      input, textarea, select {
        font-size: 16px !important;
        -webkit-appearance: none;
        border-radius: 8px;
      }
      
      /* Better input styling */
      input:focus, textarea:focus, select:focus {
        outline: none;
        border-color: #0066cc;
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
      }
      
      /* Keyboard-aware viewport */
      .keyboard-visible {
        height: calc(100vh - env(keyboard-inset-height, 0px));
        height: calc(var(--vh, 1vh) * 100 - env(keyboard-inset-height, 0px));
      }
      
      /* iOS Safari keyboard fix */
      @supports (-webkit-touch-callout: none) {
        .ios-keyboard-fix {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      
      /* Better scroll behavior during keyboard */
      .keyboard-scroll {
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
      }
    }
  `;

  const style = document.createElement('style');
  style.id = cssId;
  style.textContent = css;
  document.head.appendChild(style);
}

export function handleMobileKeyboard(): void {
  if (typeof window === 'undefined' || !isMobileDevice()) return;

  let initialViewportHeight = window.innerHeight;
  let keyboardVisible = false;

  function updateViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  function handleResize() {
    const currentHeight = window.innerHeight;
    const heightDifference = initialViewportHeight - currentHeight;
    
    // Keyboard is likely visible if height decreased significantly
    const newKeyboardVisible = heightDifference > 150;
    
    if (newKeyboardVisible !== keyboardVisible) {
      keyboardVisible = newKeyboardVisible;
      document.body.classList.toggle('keyboard-visible', keyboardVisible);
      
      // Update viewport height
      updateViewportHeight();
      
      // Scroll to focused element after keyboard appears
      if (keyboardVisible) {
        setTimeout(() => {
          const activeElement = document.activeElement as HTMLElement;
          if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      }
    }
  }

  // Initial setup
  updateViewportHeight();
  
  // Listen for viewport changes
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      initialViewportHeight = window.innerHeight;
      updateViewportHeight();
    }, 500);
  });

  // Handle input focus/blur
  document.addEventListener('focusin', (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  });

  // iOS-specific fixes
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    document.addEventListener('focusout', () => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    });
  }
}

export function setupMobileOptimizations(): void {
  if (typeof document === 'undefined' || !isMobileDevice()) return;

  // Add mobile-optimized class to body
  document.body.classList.add('mobile-optimized');

  // Prevent bounce scrolling on iOS
  document.addEventListener('touchmove', (e) => {
    if (e.target === document.body) {
      e.preventDefault();
    }
  }, { passive: false });

  // Improve touch response
  document.addEventListener('touchstart', () => {}, { passive: true });

  // Optimize scroll performance
  const style = document.createElement('style');
  style.textContent = `
    * {
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
    }
    
    .smooth-scroll {
      scroll-behavior: smooth;
    }
    
    /* Better button touch response */
    button, [role="button"] {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
      touch-action: manipulation;
      user-select: none;
    }
    
    /* Prevent text selection on mobile */
    .no-select {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  `;
  document.head.appendChild(style);
}