'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  Upload, 
  Download, 
  ArrowLeft,
  Settings,
  Wand2,
  Loader2,
  FileAudio
} from 'lucide-react';
import Link from 'next/link';

export default function SpeechPage() {
  const [text, setText] = useState('');
  const [transcribedText, setTranscribedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleSpeechToText = async () => {
    if (!audioFile) return;

    setIsProcessing(true);
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

      const formData = new FormData();
      formData.append('audio', audioFile);

      const response = await fetch('/api/ai/speech-to-text', {
        method: 'POST',
        body: formData,
      });

      clearInterval(interval);
      setProgress(100);

      if (response.ok) {
        const data = await response.json();
        setTranscribedText(data.text);
      }
    } catch (error) {
      console.error('Speech-to-text failed:', error);
    } finally {
      setIsProcessing(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleTextToSpeech = async () => {
    if (!text.trim()) return;

    setIsProcessing(true);
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
          voice: 'default',
          provider: 'ai-speech'
        }),
      });

      clearInterval(interval);
      setProgress(100);

      if (response.ok) {
        const data = await response.json();
        // Handle audio result
      }
    } catch (error) {
      console.error('Text-to-speech failed:', error);
    } finally {
      setIsProcessing(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
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
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                  <Mic className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Speech Processing</h1>
                  <p className="text-sm text-muted-foreground">Convert speech to text and text to speech</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">AI Speech</Badge>
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
        <Tabs defaultValue="stt" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stt">Speech to Text</TabsTrigger>
            <TabsTrigger value="tts">Text to Speech</TabsTrigger>
          </TabsList>

          <TabsContent value="stt" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wand2 className="h-5 w-5 text-orange-500" />
                    <span>Audio Upload</span>
                  </CardTitle>
                  <CardDescription>
                    Upload an audio file to convert speech to text
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Audio File</Label>
                    <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
                      {audioFile ? (
                        <div className="space-y-2">
                          <FileAudio className="h-8 w-8 mx-auto text-green-600" />
                          <p className="text-sm font-medium">{audioFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 mx-auto text-gray-400" />
                          <p className="text-sm text-gray-600 mb-2">Upload audio file</p>
                          <p className="text-xs text-muted-foreground">
                            Supports MP3, WAV, M4A files
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="audio-upload"
                      />
                      <Label htmlFor="audio-upload">
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                          <span>Choose File</span>
                        </Button>
                      </Label>
                    </div>
                  </div>

                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Processing audio...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                    </div>
                  )}

                  <Button 
                    onClick={handleSpeechToText} 
                    disabled={!audioFile || isProcessing}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        Convert to Text
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Output Panel */}
              <Card>
                <CardHeader>
                  <CardTitle>Transcribed Text</CardTitle>
                  <CardDescription>
                    The converted text will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {transcribedText ? (
                    <div className="space-y-4">
                      <Textarea
                        value={transcribedText}
                        onChange={(e) => setTranscribedText(e.target.value)}
                        rows={8}
                        className="resize-none"
                      />
                      <Button 
                        onClick={() => handleDownload(transcribedText, 'transcription.txt')}
                        className="w-full"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Text
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="text-center">
                        <Mic className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-sm text-muted-foreground mb-2">No transcription yet</p>
                        <p className="text-xs text-muted-foreground">
                          Upload an audio file to get started
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wand2 className="h-5 w-5 text-orange-500" />
                    <span>Text Input</span>
                  </CardTitle>
                  <CardDescription>
                    Enter text to convert to speech
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
                      rows={8}
                      className="resize-none"
                    />
                    <p className="text-sm text-muted-foreground">
                      {text.length} characters
                    </p>
                  </div>

                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Generating speech...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                    </div>
                  )}

                  <Button 
                    onClick={handleTextToSpeech} 
                    disabled={!text.trim() || isProcessing}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        Convert to Speech
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Output Panel */}
              <Card>
                <CardHeader>
                  <CardTitle>Generated Speech</CardTitle>
                  <CardDescription>
                    Your audio will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-center">
                      <Mic className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm text-muted-foreground mb-2">No audio generated yet</p>
                      <p className="text-xs text-muted-foreground">
                        Enter text and click convert to generate speech
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}