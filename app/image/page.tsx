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
  Image as ImageIcon, 
  Download, 
  ArrowLeft,
  Settings,
  Wand2,
  Loader2,
  Search
} from 'lucide-react';
import Link from 'next/link';

export default function ImagePage() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('photorealistic');
  const [selectedSize, setSelectedSize] = useState('1024x1024');
  const [selectedProvider, setSelectedProvider] = useState('ai-generator');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const providers = [
    { id: 'ai-generator', name: 'AI Generator', description: 'High-quality image generation' },
    { id: 'photo-search', name: 'Photo Search', description: 'Stock photo search' }
  ];

  const styles = [
    { id: 'photorealistic', name: 'Photorealistic', description: 'Realistic photography style' },
    { id: 'artistic', name: 'Artistic', description: 'Artistic and creative style' },
    { id: 'cartoon', name: 'Cartoon', description: 'Cartoon and illustration style' },
    { id: 'abstract', name: 'Abstract', description: 'Abstract and conceptual style' },
    { id: 'digital-art', name: 'Digital Art', description: 'Digital artwork style' }
  ];

  const sizes = [
    { id: '512x512', name: '512×512', description: 'Square (Small)' },
    { id: '1024x1024', name: '1024×1024', description: 'Square (Large)' },
    { id: '1024x768', name: '1024×768', description: 'Landscape' },
    { id: '768x1024', name: '768×1024', description: 'Portrait' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

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
      }, 400);

      const response = await fetch('/api/ai/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          options: {
            style: selectedStyle,
            size: selectedSize
          },
          provider: selectedProvider
        }),
      });

      clearInterval(interval);
      setProgress(100);

      if (response.ok) {
        const data = await response.json();
        setGeneratedImage(data.imageUrl);
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'generated-image.jpg';
      link.click();
    }
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
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <ImageIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Image Generation</h1>
                  <p className="text-sm text-muted-foreground">Create stunning images from text</p>
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
                  <Wand2 className="h-5 w-5 text-blue-500" />
                  <span>Image Prompt</span>
                </CardTitle>
                <CardDescription>
                  Describe the image you want to create or search for stock photos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Image Description</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe the image you want to generate..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-sm text-muted-foreground">
                    Be specific and descriptive for better results
                  </p>
                </div>

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

                {selectedProvider === 'ai-generator' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    <div className="space-y-2">
                      <Label>Size</Label>
                      <Select value={selectedSize} onValueChange={setSelectedSize}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizes.map((size) => (
                            <SelectItem key={size.id} value={size.id}>
                              <div>
                                <div className="font-medium">{size.name}</div>
                                <div className="text-sm text-muted-foreground">{size.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        {selectedProvider === 'photo-search' ? 'Searching...' : 'Generating image...'}
                      </span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
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
                      {selectedProvider === 'photo-search' ? 'Searching...' : 'Generating...'}
                    </>
                  ) : (
                    <>
                      {selectedProvider === 'photo-search' ? (
                        <Search className="h-4 w-4 mr-2" />
                      ) : (
                        <ImageIcon className="h-4 w-4 mr-2" />
                      )}
                      {selectedProvider === 'photo-search' ? 'Search Images' : 'Generate Image'}
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
                <CardTitle>Generated Image</CardTitle>
                <CardDescription>
                  Your image will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedImage ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={generatedImage} 
                        alt="Generated image"
                        className="w-full rounded-lg shadow-lg"
                      />
                    </div>

                    <Button onClick={handleDownload} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Image
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm text-muted-foreground mb-2">No image generated yet</p>
                      <p className="text-xs text-muted-foreground">
                        Enter a prompt and click generate to create an image
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