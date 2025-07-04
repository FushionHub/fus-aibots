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
  Code, 
  Download, 
  ArrowLeft,
  Settings,
  Wand2,
  Loader2,
  Copy,
  Check
} from 'lucide-react';
import Link from 'next/link';

export default function CodePage() {
  const [prompt, setPrompt] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedFramework, setSelectedFramework] = useState('react');
  const [selectedProvider, setSelectedProvider] = useState('ai-code');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const providers = [
    { id: 'ai-code', name: 'AI Code', description: 'Advanced code generation' },
    { id: 'ai-dev', name: 'AI Developer', description: 'Specialized code AI' }
  ];

  const languages = [
    { id: 'javascript', name: 'JavaScript', description: 'Modern JavaScript ES6+' },
    { id: 'typescript', name: 'TypeScript', description: 'Typed JavaScript' },
    { id: 'python', name: 'Python', description: 'Python 3.x' },
    { id: 'php', name: 'PHP', description: 'PHP 8.x' },
    { id: 'java', name: 'Java', description: 'Java 17+' },
    { id: 'csharp', name: 'C#', description: '.NET Core' },
    { id: 'go', name: 'Go', description: 'Go language' },
    { id: 'rust', name: 'Rust', description: 'Rust language' }
  ];

  const frameworks = {
    javascript: [
      { id: 'react', name: 'React', description: 'React.js library' },
      { id: 'vue', name: 'Vue.js', description: 'Vue.js framework' },
      { id: 'angular', name: 'Angular', description: 'Angular framework' },
      { id: 'node', name: 'Node.js', description: 'Node.js runtime' },
      { id: 'express', name: 'Express', description: 'Express.js framework' }
    ],
    typescript: [
      { id: 'react', name: 'React', description: 'React with TypeScript' },
      { id: 'next', name: 'Next.js', description: 'Next.js framework' },
      { id: 'angular', name: 'Angular', description: 'Angular with TypeScript' },
      { id: 'nest', name: 'NestJS', description: 'NestJS framework' }
    ],
    python: [
      { id: 'django', name: 'Django', description: 'Django web framework' },
      { id: 'flask', name: 'Flask', description: 'Flask micro-framework' },
      { id: 'fastapi', name: 'FastAPI', description: 'FastAPI framework' },
      { id: 'pandas', name: 'Pandas', description: 'Data analysis' }
    ],
    php: [
      { id: 'laravel', name: 'Laravel', description: 'Laravel framework' },
      { id: 'symfony', name: 'Symfony', description: 'Symfony framework' },
      { id: 'codeigniter', name: 'CodeIgniter', description: 'CodeIgniter framework' }
    ]
  };

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
      }, 300);

      const response = await fetch('/api/ai/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          language: selectedLanguage,
          options: {
            framework: selectedFramework
          },
          provider: selectedProvider
        }),
      });

      clearInterval(interval);
      setProgress(100);

      if (response.ok) {
        const data = await response.json();
        setGeneratedCode(data.code);
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleCopy = async () => {
    if (generatedCode) {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (generatedCode) {
      const extension = selectedLanguage === 'javascript' ? 'js' : 
                      selectedLanguage === 'typescript' ? 'ts' : 
                      selectedLanguage === 'python' ? 'py' : 
                      selectedLanguage === 'php' ? 'php' : 
                      selectedLanguage === 'java' ? 'java' : 
                      selectedLanguage === 'csharp' ? 'cs' : 
                      selectedLanguage === 'go' ? 'go' : 
                      selectedLanguage === 'rust' ? 'rs' : 'txt';
      
      const blob = new Blob([generatedCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-code.${extension}`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const getAvailableFrameworks = () => {
    return frameworks[selectedLanguage as keyof typeof frameworks] || [];
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
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Code Generation</h1>
                  <p className="text-sm text-muted-foreground">Generate and optimize code with AI</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wand2 className="h-5 w-5 text-indigo-500" />
                <span>Code Prompt</span>
              </CardTitle>
              <CardDescription>
                Describe the code you want to generate and configure settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="prompt">Code Description</Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe the code you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  Be specific about functionality, requirements, and constraints
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Programming Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.id} value={language.id}>
                          <div>
                            <div className="font-medium">{language.name}</div>
                            <div className="text-sm text-muted-foreground">{language.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Framework</Label>
                  <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select framework" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableFrameworks().map((framework) => (
                        <SelectItem key={framework.id} value={framework.id}>
                          <div>
                            <div className="font-medium">{framework.name}</div>
                            <div className="text-sm text-muted-foreground">{framework.description}</div>
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
                    <span>Generating code...</span>
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
                    Generating...
                  </>
                ) : (
                  <>
                    <Code className="h-4 w-4 mr-2" />
                    Generate Code
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Generated Code</span>
                {generatedCode && (
                  <div className="flex space-x-2">
                    <Button onClick={handleCopy} variant="outline" size="sm">
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button onClick={handleDownload} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                Your generated code will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedCode ? (
                <div className="space-y-4">
                  <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                    <code>{generatedCode}</code>
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="text-center">
                    <Code className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-sm text-muted-foreground mb-2">No code generated yet</p>
                    <p className="text-xs text-muted-foreground">
                      Enter a prompt and click generate to create code
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}