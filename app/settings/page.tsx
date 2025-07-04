'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Key, 
  Brain, 
  Save, 
  Eye, 
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [selectedModels, setSelectedModels] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const aiServices = [
    {
      id: 'gemini',
      name: 'Google Gemini',
      description: 'Advanced language model for text and code generation',
      models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-1.0-pro'],
      category: 'text'
    },
    {
      id: 'eleven-labs',
      name: 'Eleven Labs',
      description: 'High-quality text-to-speech synthesis',
      models: ['eleven_multilingual_v2', 'eleven_turbo_v2', 'eleven_monolingual_v1'],
      category: 'voice'
    },
    {
      id: 'fai',
      name: 'FAI',
      description: 'Fast AI voice generation',
      models: ['fai-premium', 'fai-standard', 'fai-fast'],
      category: 'voice'
    },
    {
      id: 'stability-ai',
      name: 'Stability AI',
      description: 'Image generation and editing',
      models: ['stable-diffusion-xl', 'stable-diffusion-3', 'stable-cascade'],
      category: 'image'
    },
    {
      id: 'veo-3',
      name: 'Google Veo 3',
      description: 'Advanced video generation',
      models: ['veo-3-standard', 'veo-3-premium'],
      category: 'video'
    },
    {
      id: 'pexels',
      name: 'Pexels',
      description: 'Stock photo and video search',
      models: ['pexels-api-v1'],
      category: 'image'
    },
    {
      id: 'deepseek',
      name: 'DeepSeek AI',
      description: 'Code generation and analysis',
      models: ['deepseek-coder-v2', 'deepseek-chat-v2'],
      category: 'code'
    },
    {
      id: 'lamia',
      name: 'Lamia AI',
      description: 'Creative text generation',
      models: ['lamia-creative', 'lamia-standard'],
      category: 'text'
    },
    {
      id: 'replicate',
      name: 'Replicate',
      description: 'Music and audio generation',
      models: ['musicgen-large', 'musicgen-medium', 'riffusion'],
      category: 'music'
    }
  ];

  useEffect(() => {
    // Load saved settings from localStorage
    const savedApiKeys: Record<string, string> = {};
    const savedModels: Record<string, string> = {};
    
    aiServices.forEach(service => {
      const apiKey = localStorage.getItem(`ai_api_key_${service.id}`);
      const model = localStorage.getItem(`ai_model_${service.id}`);
      
      if (apiKey) savedApiKeys[service.id] = apiKey;
      if (model) savedModels[service.id] = model;
      else savedModels[service.id] = service.models[0]; // Default to first model
    });
    
    setApiKeys(savedApiKeys);
    setSelectedModels(savedModels);
  }, []);

  const handleApiKeyChange = (serviceId: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [serviceId]: value }));
  };

  const handleModelChange = (serviceId: string, value: string) => {
    setSelectedModels(prev => ({ ...prev, [serviceId]: value }));
  };

  const toggleApiKeyVisibility = (serviceId: string) => {
    setShowApiKeys(prev => ({ ...prev, [serviceId]: !prev[serviceId] }));
  };

  const saveSettings = () => {
    setSaveStatus('saving');
    
    // Save to localStorage
    Object.entries(apiKeys).forEach(([serviceId, apiKey]) => {
      if (apiKey) {
        localStorage.setItem(`ai_api_key_${serviceId}`, apiKey);
      }
    });
    
    Object.entries(selectedModels).forEach(([serviceId, model]) => {
      localStorage.setItem(`ai_model_${serviceId}`, model);
    });
    
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  const getServicesByCategory = (category: string) => {
    return aiServices.filter(service => service.category === category);
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
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Settings</h1>
                  <p className="text-sm text-muted-foreground">Configure AI models and API keys</p>
                </div>
              </div>
            </div>
            <Button onClick={saveSettings} disabled={saveStatus === 'saving'}>
              {saveStatus === 'saving' ? (
                <>Saving...</>
              ) : saveStatus === 'saved' ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="api-keys" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5" />
                  <span>API Keys Configuration</span>
                </CardTitle>
                <CardDescription>
                  Configure your API keys for different AI services. Keys are stored locally in your browser.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {aiServices.map((service) => (
                  <div key={service.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">{service.name}</Label>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {service.category}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex-1 relative">
                        <Input
                          type={showApiKeys[service.id] ? 'text' : 'password'}
                          placeholder={`Enter ${service.name} API key`}
                          value={apiKeys[service.id] || ''}
                          onChange={(e) => handleApiKeyChange(service.id, e.target.value)}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleApiKeyVisibility(service.id)}
                      >
                        {showApiKeys[service.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {service.id !== aiServices[aiServices.length - 1].id && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>AI Model Selection</span>
                </CardTitle>
                <CardDescription>
                  Choose the AI models you want to use for each service category.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {['text', 'voice', 'image', 'video', 'code', 'music'].map((category) => {
                  const categoryServices = getServicesByCategory(category);
                  if (categoryServices.length === 0) return null;

                  return (
                    <div key={category} className="space-y-4">
                      <h3 className="text-lg font-semibold capitalize flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                        <span>{category} Generation</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categoryServices.map((service) => (
                          <div key={service.id} className="space-y-3 p-4 border rounded-lg">
                            <div>
                              <Label className="font-medium">{service.name}</Label>
                              <p className="text-sm text-muted-foreground">{service.description}</p>
                            </div>
                            <Select
                              value={selectedModels[service.id] || service.models[0]}
                              onValueChange={(value) => handleModelChange(service.id, value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select model" />
                              </SelectTrigger>
                              <SelectContent>
                                {service.models.map((model) => (
                                  <SelectItem key={model} value={model}>
                                    {model}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Status Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Configuration Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiServices.map((service) => {
                const hasApiKey = apiKeys[service.id]?.length > 0;
                const hasModel = selectedModels[service.id]?.length > 0;
                const isConfigured = hasApiKey && hasModel;

                return (
                  <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        isConfigured ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <span className="text-sm font-medium">{service.name}</span>
                    </div>
                    {isConfigured ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}