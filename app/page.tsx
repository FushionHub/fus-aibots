'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Volume2, 
  Image, 
  Music, 
  Code, 
  Mic,
  Video,
  Camera,
  Brain,
  Sparkles,
  ArrowRight,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const services = [
    {
      id: 'voiceover',
      title: 'AI Voiceover',
      description: 'Generate natural-sounding voiceovers with advanced AI technology',
      icon: Volume2,
      gradient: 'from-purple-500 to-pink-500',
      href: '/voiceover',
      features: ['Multiple voices', 'Custom speed', 'High quality audio']
    },
    {
      id: 'image',
      title: 'Image Generation',
      description: 'Create stunning images with AI-powered generation and photo search',
      icon: Image,
      gradient: 'from-blue-500 to-cyan-500',
      href: '/image',
      features: ['Multiple styles', 'Custom dimensions', 'HD quality']
    },
    {
      id: 'video',
      title: 'Video Generation',
      description: 'Generate videos with cutting-edge AI technology',
      icon: Video,
      gradient: 'from-red-500 to-orange-500',
      href: '/video',
      features: ['AI video creation', 'Custom prompts', 'HD output']
    },
    {
      id: 'music',
      title: 'Music Generation',
      description: 'Compose original music tracks with AI',
      icon: Music,
      gradient: 'from-green-500 to-emerald-500',
      href: '/music',
      features: ['Multiple genres', 'Custom duration', 'Professional quality']
    },
    {
      id: 'speech',
      title: 'Speech Processing',
      description: 'Speech-to-text and text-to-speech conversion',
      icon: Mic,
      gradient: 'from-orange-500 to-red-500',
      href: '/speech',
      features: ['Real-time processing', 'Multiple languages', 'High accuracy']
    },
    {
      id: 'code',
      title: 'Code Generation',
      description: 'Generate and optimize code with advanced AI models',
      icon: Code,
      gradient: 'from-indigo-500 to-purple-500',
      href: '/code',
      features: ['Multiple languages', 'Smart suggestions', 'Code optimization']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Fus AI Model
                </h1>
                <p className="text-sm text-muted-foreground">Multi-AI Platform</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden sm:flex">
                <Zap className="h-3 w-3 mr-1" />
                6 AI Services
              </Badge>
              <Link href="/settings">
                <Button variant="outline" size="sm">
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Powered by Fus AI Model Technology
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Create with AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Unleash your creativity with our comprehensive AI toolkit. Generate voiceovers, images, videos, music, and code - all powered by the latest Fus AI Model technology.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.id} href={service.href}>
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 bg-white/60 backdrop-blur-sm dark:bg-slate-800/60 h-full">
                  <CardHeader className="pb-4">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                      Get Started
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-8">Why Choose Fus AI Model?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Lightning Fast</h4>
              <p className="text-muted-foreground">Generate content in seconds with our optimized AI models</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Advanced AI Technology</h4>
              <p className="text-muted-foreground">Powered by cutting-edge Fus AI Model for superior results</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Export Ready</h4>
              <p className="text-muted-foreground">Download and export all generated content instantly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}