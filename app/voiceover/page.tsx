'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Volume2, 
  Play, 
  Pause, 
  Download, 
  ArrowLeft,
  Settings,
  Wand2,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function VoiceoverPage() {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [selectedSpeed, setSelectedSpeed] = useState('normal');
  const [selectedProvider, setSelectedProvider] = useState('premium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const providers = [
    { id: 'premium', name: 'Premium Voice', description: 'Premium quality voices' },
    { id: 'standard', name: 'Standard Voice', description: 'Natural sounding AI voices' },
    { id: 'fast', name: 'Fast Voice', description: 'Fast generation' }
  ];

  const voices = {
    'premium': [
      { id: 'rachel', name: 'Rachel', description: 'Calm, professional female voice' },
      { id: 'josh', name: 'Josh', description: 'Friendly male voice' },
      { id: 'bella', name: 'Bella', description: 'Warm female voice' },
      { id: 'antoni', name: 'Antoni', description: 'Deep male voice' }
    ],
    'standard': [
      { id: 'natural', name: 'Natural', description: 'Balanced AI voice' },
      { id: 'expressive', name: 'Expressive', description: 'Emotional AI voice' }
    ],
    'fast': [
      { id: 'quick', name: 'Quick Voice', description: 'High quality voice' },
      { id: 'rapid', name: 'Rapid Voice', description: 'Standard quality voice' }
    ]
  };

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setIsGenerating(true);
    setProgress(0);

    try {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const response = await fetch('/api/ai/voiceover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice: selectedVoice,
          speed: selectedSpeed,
          provider: selectedProvider
        }),
      });

      clearInterval(interval);
      setProgress(100);

      if (response.ok) {
        const data = await response.json();
        setGeneratedAudio(data.audioUrl);
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleDownload = () => {
    if (generatedAudio) {
      const link = document.createElement('a');
      link.href = generatedAudio;
      link.download = 'generated-voiceover.mp3';
      link.click();
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Audio playback logic would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Volume2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">AI Voiceover</h1>
                  <p className="text-sm text-muted-foreground">Generate natural-sounding voiceovers</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{providers.find(p => p.id === selectedProvider)?.name}</Badge>
              <Link href="/settings">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wand2 className="h-5 w-5 text-purple-500" />
                  <span>Text to Speech</span>
                </CardTitle>
                <CardDescription>
                  Enter your text and configure voice settings to generate high-quality voiceovers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="text">Text Content</Label>
                  <Textarea
                    id="text"
                    placeholder="Enter the text you want to convert to speech..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-sm text-muted-foreground">
                    {text.length} characters
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>AI Provider</Label>
                    <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {providers.map((provider) => (
                          <SelectItem key={provider.id} value={provider.id}>
                            <div>
                              <div className="font-medium">{provider.name}</div>
                              <div className="text-sm text-muted-foreground">{provider.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Voice</Label>
                    <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select voice" />
                      </SelectTrigger>
                      <SelectContent>
                        {voices[selectedProvider as keyof typeof voices]?.map((voice) => (
                          <SelectItem key={voice.id} value={voice.id}>
                            <div>
                              <div className="font-medium">{voice.name}</div>
                              <div className="text-sm text-muted-foreground">{voice.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Speech Speed</Label>
                  <Select value={selectedSpeed} onValueChange={setSelectedSpeed}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select speed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Slow (0.8x)</SelectItem>
                      <SelectItem value="normal">Normal (1.0x)</SelectItem>
                      <SelectItem value="fast">Fast (1.2x)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Generating voiceover...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                )}

                <Button 
                  onClick={handleGenerate} 
                  disabled={!text.trim() || isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4 mr-2" />
                      Generate Voiceover
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Output Panel */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Generated Audio</CardTitle>
                <CardDescription>
                  Your voiceover will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedAudio ? (
                  <div className="space-y-4">
                    <div className="p-4 border-2 border-dashed border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-950">
                      <div className="text-center">
                        <Volume2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">
                          Voiceover Generated Successfully!
                        </p>
                      </div>
                    </div>

                    <audio controls className="w-full">
                      <source src={generatedAudio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>

                    <div className="flex space-x-2">
                      <Button onClick={togglePlayback} variant="outline" className="flex-1">
                        {isPlaying ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Play
                          </>
                        )}
                      </Button>
                      <Button onClick={handleDownload} className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-center">
                      <Volume2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm text-muted-foreground mb-2">No audio generated yet</p>
                      <p className="text-xs text-muted-foreground">
                        Enter text and click generate to create voiceover
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}