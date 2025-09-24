@@ .. @@
 import React, { useState, useEffect } from 'react';
 import { emotions } from './lib/config';
 import { PageRouter } from './components/PageRouter';
-import { PasswordProtection } from './components/PasswordProtection';
 import { MobileNavigation } from './components/MobileNavigation';
 import { HoverNavigation } from './components/HoverNavigation';
 import { 
   isMobileDevice, 
   ensureMobileViewport, 
   addMobileKeyboardCSS, 
   handleMobileKeyboard, 
   setupMobileOptimizations 
 } from './lib/mobile-utils';

-function AppContent() {
+export default function App() {
   const [currentPage, setCurrentPage] = useState<string>('home');
   const [isMobile, setIsMobile] = useState<boolean>(false);
   const [recentModules, setRecentModules] = useState<string[]>([]);

@@ .. @@
     </div>
   );
 }
-
-export default function App() {
-  return (
-    <PasswordProtection>
-      <AppContent />
-    </PasswordProtection>
-  );
-}