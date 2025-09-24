import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Home, Gift, Clock, DollarSign, Lightbulb, Calendar, ShoppingCart, Settings } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChristmasPageProps {
  onNavigate: (page: string) => void;
}

export function ChristmasPage({ onNavigate }: ChristmasPageProps) {
  return (
    <div className="h-full flex relative overflow-hidden">
      {/* Left Sidebar - Coral Background */}
      <div className="w-80 bg-[#F05959] text-white p-6 flex flex-col relative">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Home className="w-5 h-5 text-[#F05959]" />
          </div>
          <span className="text-xl font-bold">Listmas</span>
        </div>

        {/* Main Header */}
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-1 h-16 bg-white rounded-full"></div>
            <div>
              <h1 className="text-3xl font-bold">Holiday Magic</h1>
              <p className="text-lg text-white/90 italic">Awaits Your Perfect Planning</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-4 mb-8">
          {/* Days Until Christmas */}
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-white/80" />
            <div>
              <p className="text-sm text-white/80">Days Until Christmas</p>
              <p className="text-2xl font-bold">45</p>
            </div>
          </div>

          {/* Budget Used */}
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-white/80" />
            <div>
              <p className="text-sm text-white/80">Budget Used</p>
              <p className="text-2xl font-bold">67%</p>
            </div>
          </div>

          {/* Gifts Planned */}
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-white/80" />
            <div>
              <p className="text-sm text-white/80">Gifts Planned</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>

          {/* Tasks Complete */}
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-white/80" />
            <div>
              <p className="text-sm text-white/80">Tasks Complete</p>
              <p className="text-2xl font-bold">23</p>
            </div>
          </div>
        </div>

        {/* Navigation - Bottom */}
        <div className="mt-auto space-y-3">
          <Button 
            variant="ghost"
            className="text-white hover:bg-white/10 w-full justify-start"
            onClick={() => onNavigate('excited')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Feel Excited
          </Button>
          <Button 
            variant="ghost"
            className="text-white hover:bg-white/10 w-full justify-start"
            onClick={() => onNavigate('home')}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50 relative">
        {/* Header with Spark → Shape → Start and Settings */}
        <div className="flex justify-between items-center p-6 bg-white border-b border-gray-200">
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <span>Spark</span>
              <span>→</span>
              <span>Shape</span>
              <span>→</span>
              <span>Start</span>
            </div>
            <Settings className="w-6 h-6 text-gray-600" />
          </div>
          {/* Decorative dots pattern */}
          <div className="flex gap-2 ml-6">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Three Cards Section */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Spark New Ideas Card */}
            <Card 
              className="p-6 bg-white border border-gray-200 rounded-xl cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate('christmas-spark')}
            >
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Spark New Ideas</h3>
              </div>
              
              <div className="mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1610116406219-245e2ecaa3a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBvcm5hbWVudHMlMjBwaW5lJTIwdHJlZSUyMGRlY29yYXRpb25zfGVufDF8fHx8MTc1ODM4NjI1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Christmas ornaments and decorations"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Browse for new traditions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Get new craft-spiration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Give me gift inspiration</span>
                </div>
              </div>
            </Card>

            {/* Shape Festive Plans Card */}
            <Card 
              className="p-6 bg-white border border-gray-200 rounded-xl cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate('christmas-shape')}
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Shape Festive Plans</h3>
              </div>
              
              <div className="mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1609669028107-ed6cec2cb66d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjB0cmVlJTIwY29va2llJTIwY3V0dGVyJTIwYmFraW5nfGVufDF8fHx8MTc1ODM4NjI1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Christmas tree cookie cutter"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Schedule your to do list</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Christmas food list</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Generate your christmas gift list</span>
                </div>
              </div>
            </Card>

            {/* Start Christmas Shopping Card */}
            <Card 
              className="p-6 bg-white border border-gray-200 rounded-xl cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate('christmas-start')}
            >
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Start Christmas Shopping</h3>
              </div>
              
              <div className="mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1671393759133-781c76bb8f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBnaWZ0JTIwYmFnJTIwd3JhcHBpbmclMjBwcmVzZW50c3xlbnwxfHx8fDE3NTgzODYyNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Christmas gift bag and presents"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Start festive shopping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Festive budget</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Thank you notes</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}