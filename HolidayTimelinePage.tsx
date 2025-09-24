import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Clock, ArrowLeft, Plus, CheckCircle } from 'lucide-react';

interface HolidayTimelinePageProps {
  onNavigate: (page: string) => void;
}

export function HolidayTimelinePage({ onNavigate }: HolidayTimelinePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#059669] to-[#047857] text-white py-12">
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
              <Calendar className="h-10 w-10" />
              <div>
                <h1 className="text-3xl font-bold">Holiday Timeline</h1>
                <p className="text-lg opacity-90">Comprehensive Christmas planning timeline</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center py-16 text-gray-500">
          <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium mb-2">Timeline Builder Coming Soon</h3>
          <p className="mb-6">Comprehensive timeline planning for your perfect Christmas</p>
          <Button onClick={() => onNavigate('christmas')}>
            Back to Christmas Planning
          </Button>
        </div>
      </div>
    </div>
  );
}