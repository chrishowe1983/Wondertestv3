import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Home, Palette, Scissors, Users, Clock, Star, Heart } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';


interface CraftInspirationPageProps {
  onNavigate: (page: string) => void;
}

const craftCategories = [
  {
    id: 'decorations',
    title: 'DIY Decorations',
    description: 'Beautiful handmade decorations for your home',
    icon: Star,
    image: 'https://images.unsplash.com/photo-1610089219212-c39d538a7aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBjcmFmdHMlMjBkaXl8ZW58MXx8fHwxNzU4MzE3NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Paper snowflakes',
      'Felt ornaments',
      'Mason jar luminaries',
      'Garland & wreaths'
    ]
  },
  {
    id: 'gifts',
    title: 'Handmade Gifts',
    description: 'Heartfelt gifts crafted with love',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1610089219212-c39d538a7aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBjcmFmdHMlMjBkaXl8ZW58MXx8fHwxNzU4MzE3NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Knitted scarves',
      'Photo albums',
      'Candle making',
      'Custom pottery'
    ]
  },
  {
    id: 'kids',
    title: 'Kids Crafts',
    description: 'Fun and easy projects for little hands',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1610089219212-c39d538a7aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBjcmFmdHMlMjBkaXl8ZW58MXx8fHwxNzU4MzE3NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Salt dough ornaments',
      'Paper plate crafts',
      'Handprint keepsakes',
      'Simple sewing projects'
    ]
  },
  {
    id: 'upcycling',
    title: 'Upcycling Projects',
    description: 'Transform everyday items into holiday magic',
    icon: Scissors,
    image: 'https://images.unsplash.com/photo-1610089219212-c39d538a7aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBjcmFmdHMlMjBkaXl8ZW58MXx8fHwxNzU4MzE3NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Bottle planters',
      'Tin can lanterns',
      'Fabric scraps projects',
      'Cardboard creations'
    ]
  },
  {
    id: 'quick',
    title: 'Quick 30-Minute Crafts',
    description: 'Fast projects with beautiful results',
    icon: Clock,
    image: 'https://images.unsplash.com/photo-1610089219212-c39d538a7aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBjcmFmdHMlMjBkaXl8ZW58MXx8fHwxNzU4MzE3NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'No-sew pillows',
      'Painted ornaments',
      'Wire decorations',
      'Simple centerpieces'
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Projects',
    description: 'Challenging crafts for experienced makers',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1610089219212-c39d538a7aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBjcmFmdHMlMjBkaXl8ZW58MXx8fHwxNzU4MzE3NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Woodworking projects',
      'Complex quilting',
      'Metal crafts',
      'Multi-step builds'
    ]
  }
];

export function CraftInspirationPage({ onNavigate }: CraftInspirationPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F05959] rounded-full"></div>
          <span className="text-xl font-semibold text-[#F05959]">ChristmasList</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-900">Craft</span>
          <span className="text-xl font-normal text-gray-600">Inspiration</span>
          <Palette className="w-6 h-6 text-gray-900 ml-2" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Craft-spiration</h1>
          <p className="text-xl text-gray-600 mb-6">Create magical holiday memories with these DIY projects</p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span>500+ Craft Ideas</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>All Skill Levels</span>
            </div>
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              <span>Step-by-Step Guides</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-3 gap-8">
          {craftCategories.map((category, index) => (
            <Card key={category.id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              {/* Image */}
              <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                <ImageWithFallback
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Icon and Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#F05959] rounded-full flex items-center justify-center">
                    <category.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#F05959] rounded-full"></div>
                      <span className="text-sm text-[#F05959] font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button className="w-full bg-[#F05959] hover:bg-[#E04848] text-white py-2">
                  Start {category.title}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Craft Planning Tools */}
        <div className="mt-12 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Craft Planning Tools</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F05959] rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Supply Tracker</h3>
              <p className="text-sm text-gray-600">Keep track of crafting materials and shopping lists</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F05959] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Project Timeline</h3>
              <p className="text-sm text-gray-600">Plan your crafting schedule to finish on time</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F05959] rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Inspiration Board</h3>
              <p className="text-sm text-gray-600">Save and organize your favorite craft ideas</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            variant="outline"
            className="text-gray-600 border-gray-300"
            onClick={() => onNavigate('christmas-spark')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Spark
          </Button>
          <Button 
            variant="outline"
            className="text-gray-600 border-gray-300"
            onClick={() => onNavigate('home')}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}