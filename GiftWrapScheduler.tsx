import React from 'react';
import { Button } from './ui/button';
import { Package, ArrowLeft } from 'lucide-react';

interface GiftWrapSchedulerProps {
  onNavigate: (page: string) => void;
}

export function GiftWrapScheduler({ onNavigate }: GiftWrapSchedulerProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#D97706] to-[#B45309] text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={() => onNavigate('christmas')}
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4">
              <Package className="h-10 w-10" />
              <div>
                <h1 className="text-3xl font-bold">Gift Wrap Scheduler</h1>
                <p className="text-lg opacity-90">Organized gift wrapping timeline</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center py-16 text-gray-500">
          <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium mb-2">Gift Wrap Planner Coming Soon</h3>
          <p className="mb-6">Schedule and organize your gift wrapping sessions</p>
          <Button onClick={() => onNavigate('christmas')}>
            Back to Christmas Planning
          </Button>
        </div>
      </div>
    </div>
  );
}