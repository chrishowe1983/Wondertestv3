import React from 'react';
import { Button } from './ui/button';
import { Star, ArrowLeft } from 'lucide-react';

interface TraditionsPageProps {
  onNavigate: (page: string) => void;
}

export function TraditionsPage({ onNavigate }: TraditionsPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white py-12">
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
              <Star className="h-10 w-10" />
              <div>
                <h1 className="text-3xl font-bold">Family Traditions</h1>
                <p className="text-lg opacity-90">Capture and plan family traditions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center py-16 text-gray-500">
          <Star className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium mb-2">Traditions Planner Coming Soon</h3>
          <p className="mb-6">Document and plan your special family holiday traditions</p>
          <Button onClick={() => onNavigate('christmas')}>
            Back to Christmas Planning
          </Button>
        </div>
      </div>
    </div>
  );
}