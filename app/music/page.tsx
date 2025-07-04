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
  Music, 
  Play, 
  Pause, 
  Download, 
  ArrowLeft,
  Settings,
  Wand2,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function MusicPage() {
  const [prompt, setPrompt] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('ambient');
  const [selectedDuration, setSelectedDuration] = useState('30');
  const [selectedModel, setSelectedModel] = useState('large');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedMusic, setGeneratedMusic] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const genres = [
    { id: 'ambient', name: 'Ambient', description: 'Atmospheric and relaxing' },
    { id: 'classical', name: 'Classical', description: 'Orchestral and traditional' },
    { id: 'electronic', name: 'Electronic', description: 'Synthesized and digital' },
    { id: 'rock', name: 'Rock', description: 'Guitar-driven and energetic' },
    { id: 'jazz', name: 'Jazz', description: 'Improvisational and smooth' },
    { id: 'pop', name: 'Pop', description: 'Catchy and mainstream' },
    { id: 'cinematic', name: 'Cinematic', description: 'Epic and dramatic' }
  ];

  const durations = [
    { id: '15', name: '15 seconds', description: 'Short clip' },
    { id: '30', name: '30 seconds', description: 'Standard length' },
    { id: '60', name: '1 minute', description: 'Extended track' },
    { id: '120', name: '2 minutes', description: 'Full composition' }
  ];

  const models = [
    { id: 'large', name: 'Large Model', description: 'High quality, slower generation' },
    { id: 'medium', name: 'Medium Model', description: 'Balanced quality and speed' },
    { id: 'fast', name: 'Fast Model', description: 'Fast generation, good for loops' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setProgress(0);

    try {
      // Simulate progress (music generation takes longer)
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 5;
        });
      }, 600);

      const response = await fetch('/api/ai/music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          options: {
            genre: selectedGenre,
            duration: selectedDuration,
            model: selectedModel
          },
          provider: 'ai-music'
        }),
      });

      clearInterval(interval);
      setProgress(100);

      if (response.ok) {
        const data = await response.json();
        setGeneratedMusic(data.audioUrl);
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleDownload = () => {
    if (generatedMusic) {
      const link = document.createElement('a');
      link.href = generatedMusic;
      link.download = 'generated-music.mp3';
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
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Music className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Music Generation</h1>
                  <p className="text-sm text-muted-foreground">Compose original music with AI</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">AI Music</Badge>
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
                  <Wand2 className="h-5 w-5 text-green-500" />
                  <span>Music Prompt</span>
                </CardTitle>
                <CardDescription>
                  Describe the music you want to create and configure generation settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Music Description</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe the music you want to create..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-sm text-muted-foreground">
                    Describe the mood, instruments, tempo, and style
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Genre</Label>
                    <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre.id} value={genre.id}>
                            <div>
                              <div className="font-medium">{genre.name}</div>
                              <div className="text-sm text-muted-foreground">{genre.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

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
                    <Label>AI Model</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        {models.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            <div>
                              <div className="font-medium">{model.name}</div>
                              <div className="text-sm text-muted-foreground">{model.description}</div>
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
                      <span>Generating music...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-xs text-muted-foreground">
                      Music generation may take several minutes
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
                      <Music className="h-4 w-4 mr-2" />
                      Generate Music
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
                <CardTitle>Generated Music</CardTitle>
                <CardDescription>
                  Your music will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedMusic ? (
                  <div className="space-y-4">
                    <div className="p-4 border-2 border-dashed border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-950">
                      <div className="text-center">
                        <Music className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">
                          Music Generated Successfully!
                        </p>
                      </div>
                    </div>

                    <audio controls className="w-full">
                      <source src={generatedMusic} type="audio/mpeg" />
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
                      <Music className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm text-muted-foreground mb-2">No music generated yet</p>
                      <p className="text-xs text-muted-foreground">
                        Enter a prompt and click generate to create music
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