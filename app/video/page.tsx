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
  Video, 
  Play, 
  Pause, 
  Download, 
  ArrowLeft,
  Settings,
  Wand2,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function VideoPage() {
  const [prompt, setPrompt] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('5');
  const [selectedQuality, setSelectedQuality] = useState('hd');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const durations = [
    { id: '3', name: '3 seconds', description: 'Quick clip' },
    { id: '5', name: '5 seconds', description: 'Short video' },
    { id: '10', name: '10 seconds', description: 'Medium length' },
    { id: '15', name: '15 seconds', description: 'Extended clip' }
  ];

  const qualities = [
    { id: 'sd', name: 'Standard (480p)', description: 'Fast generation' },
    { id: 'hd', name: 'HD (720p)', description: 'Balanced quality' },
    { id: 'fhd', name: 'Full HD (1080p)', description: 'High quality' }
  ];

  const styles = [
    { id: 'realistic', name: 'Realistic', description: 'Photorealistic video' },
    { id: 'cinematic', name: 'Cinematic', description: 'Movie-like quality' },
    { id: 'animated', name: 'Animated', description: 'Animation style' },
    { id: 'artistic', name: 'Artistic', description: 'Creative and stylized' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setProgress(0);

    try {
      // Simulate progress (video generation takes longer)
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 5;
        });
      }, 800);

      const response = await fetch('/api/ai/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          options: {
            duration: selectedDuration,
            quality: selectedQuality,
            style: selectedStyle
          },
          provider: 'ai-video'
        }),
      });

      clearInterval(interval);
      setProgress(100);

      if (response.ok) {
        const data = await response.json();
        setGeneratedVideo(data.videoUrl);
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleDownload = () => {
    if (generatedVideo) {
      const link = document.createElement('a');
      link.href = generatedVideo;
      link.download = 'generated-video.mp4';
      link.click();
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Video playback logic would go here
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
                <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                  <Video className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Video Generation</h1>
                  <p className="text-sm text-muted-foreground">Create videos with AI technology</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">AI Video</Badge>
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
                  <Wand2 className="h-5 w-5 text-red-500" />
                  <span>Video Prompt</span>
                </CardTitle>
                <CardDescription>
                  Describe the video you want to create with AI technology
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Video Description</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe the video you want to generate..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-sm text-muted-foreground">
                    Be detailed about actions, scenes, and visual elements
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {durations.map((duration) => (
                          <SelectItem key={duration.id} value={duration.id}>
                            <div>
                              <div className="font-medium">{duration.name}</div>
                              <div className="text-sm text-muted-foreground">{duration.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Quality</Label>
                    <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        {qualities.map((quality) => (
                          <SelectItem key={quality.id} value={quality.id}>
                            <div>
                              <div className="font-medium">{quality.name}</div>
                              <div className="text-sm text-muted-foreground">{quality.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Style</Label>
                    <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        {styles.map((style) => (
                          <SelectItem key={style.id} value={style.id}>
                            <div>
                              <div className="font-medium">{style.name}</div>
                              <div className="text-sm text-muted-foreground">{style.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Generating video...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-xs text-muted-foreground">
                      Video generation may take several minutes
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handleGenerate} 
                  disabled={!prompt.trim() || isGenerating}
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
                      <Video className="h-4 w-4 mr-2" />
                      Generate Video
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
                <CardTitle>Generated Video</CardTitle>
                <CardDescription>
                  Your video will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedVideo ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <video 
                        controls 
                        className="w-full rounded-lg shadow-lg"
                        poster="/video-placeholder.jpg"
                      >
                        <source src={generatedVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>

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
                      <Video className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm text-muted-foreground mb-2">No video generated yet</p>
                      <p className="text-xs text-muted-foreground">
                        Enter a prompt and click generate to create a video
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