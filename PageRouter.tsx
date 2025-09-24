import React from 'react';
import { Home } from './Home';
import { AllEmotions } from './AllEmotions';
import { EmotionPage } from './EmotionPage';
import { ChristmasPage } from './ChristmasPage';
import { ChristmasFoodPage } from './ChristmasFoodPage';
import { ChristmasFoodList } from './ChristmasFoodList';
import { GiftListPage } from './GiftListPage';
import { FestiveShoppingPage } from './FestiveShoppingPage';
import { FestiveBudgetPage } from './FestiveBudgetPage';
import { HolidayTimelinePage } from './HolidayTimelinePage';
import { GuestListOrganizer } from './GuestListOrganizer';
import { HolidayInvitationsPage } from './HolidayInvitationsPage';
import { HolidayReservationsPage } from './HolidayReservationsPage';
import { GiftWrapScheduler } from './GiftWrapScheduler';
import { TraditionsPage } from './TraditionsPage';
import { ThankYouNotesPage } from './ThankYouNotesPage';

interface PageRouterProps {
  currentPage: string;
  emotions: any[];
  onNavigate: (page: string) => void;
}

export function PageRouter({ currentPage, emotions, onNavigate }: PageRouterProps) {
  const routeComponents: Record<string, React.ComponentType<any>> = {
    // Core Routes
    'home': () => <Home onNavigate={onNavigate} />,
    'all-emotions': () => <AllEmotions emotions={emotions} onNavigate={onNavigate} />,
    
    // Emotion Hubs
    'ready': () => <EmotionPage emotion="ready" onNavigate={onNavigate} />,
    'excited': () => <EmotionPage emotion="excited" onNavigate={onNavigate} />,
    'confident': () => <EmotionPage emotion="confident" onNavigate={onNavigate} />,
    
    // Christmas Module (Excited)
    'christmas': () => <ChristmasPage onNavigate={onNavigate} />,
    'christmas-food': () => <ChristmasFoodPage onNavigate={onNavigate} />,
    'christmas-food-list': () => <ChristmasFoodList onNavigate={onNavigate} />,
    'christmas-gifts': () => <GiftListPage onNavigate={onNavigate} />,
    'christmas-shopping': () => <FestiveShoppingPage onNavigate={onNavigate} />,
    'christmas-budget': () => <FestiveBudgetPage onNavigate={onNavigate} />,
    'christmas-timeline': () => <HolidayTimelinePage onNavigate={onNavigate} />,
    'christmas-guests': () => <GuestListOrganizer onNavigate={onNavigate} />,
    'christmas-invitations': () => <HolidayInvitationsPage onNavigate={onNavigate} />,
    'christmas-reservations': () => <HolidayReservationsPage onNavigate={onNavigate} />,
    'christmas-gift-wrap': () => <GiftWrapScheduler onNavigate={onNavigate} />,
    'christmas-traditions': () => <TraditionsPage onNavigate={onNavigate} />,
    'christmas-thank-you': () => <ThankYouNotesPage onNavigate={onNavigate} />,
    
    // Placeholder for Future Modules
    'meals': () => <div className="p-8"><h1>Meal Planning (Coming Soon)</h1></div>,
    'home-org': () => <div className="p-8"><h1>Home Organization (Coming Soon)</h1></div>,
    'school': () => <div className="p-8"><h1>School Planning (Coming Soon)</h1></div>,
    'finance': () => <div className="p-8"><h1>Finance Planning (Coming Soon)</h1></div>,
    'careers': () => <div className="p-8"><h1>Career Growth (Coming Soon)</h1></div>,
    'life-change': () => <div className="p-8"><h1>Life Changes (Coming Soon)</h1></div>,
    'weddings': () => <div className="p-8"><h1>Wedding Planning (Coming Soon)</h1></div>,
    'babies': () => <div className="p-8"><h1>Baby Planning (Coming Soon)</h1></div>,
  };

  const Component = routeComponents[currentPage] || (() => <div className="p-8"><h1>Page not found</h1></div>);
  
  return <Component />;
}