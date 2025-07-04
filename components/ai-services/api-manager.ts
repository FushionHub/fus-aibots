// API Manager for different AI services
export class AIServiceManager {
  private apiKeys: Record<string, string> = {};

  constructor() {
    // Initialize with environment variables or stored keys
    this.loadApiKeys();
  }

  private loadApiKeys() {
    // Load API keys from environment variables or local storage
    this.apiKeys = {
      gemini: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
      elevenLabs: process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY || '',
      fai: process.env.NEXT_PUBLIC_FAI_API_KEY || '',
      stabilityai: process.env.NEXT_PUBLIC_STABILITY_AI_API_KEY || '',
      veo3: process.env.NEXT_PUBLIC_VEO_3_API_KEY || '',
      pexels: process.env.NEXT_PUBLIC_PEXELS_API_KEY || '',
      deepseek: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || '',
      lamia: process.env.NEXT_PUBLIC_LAMIA_API_KEY || '',
      replicate: process.env.NEXT_PUBLIC_REPLICATE_API_KEY || '',
    };
  }

  // Eleven Labs Text-to-Speech
  async generateVoiceover(text: string, voice: string, options: any = {}) {
    try {
      const response = await fetch('/api/ai/voiceover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice,
          options,
          provider: 'eleven-labs'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate voiceover');
      }

      return await response.json();
    } catch (error) {
      console.error('Voiceover generation error:', error);
      throw error;
    }
  }

  // Image Generation
  async generateImage(prompt: string, options: any = {}) {
    try {
      const response = await fetch('/api/ai/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          options,
          provider: 'stability-ai'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      return await response.json();
    } catch (error) {
      console.error('Image generation error:', error);
      throw error;
    }
  }

  // Video Generation with Veo 3
  async generateVideo(prompt: string, options: any = {}) {
    try {
      const response = await fetch('/api/ai/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          options,
          provider: 'veo-3'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate video');
      }

      return await response.json();
    } catch (error) {
      console.error('Video generation error:', error);
      throw error;
    }
  }

  // Music Generation
  async generateMusic(prompt: string, options: any = {}) {
    try {
      const response = await fetch('/api/ai/music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          options,
          provider: 'replicate'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate music');
      }

      return await response.json();
    } catch (error) {
      console.error('Music generation error:', error);
      throw error;
    }
  }

  // Speech-to-Text
  async speechToText(audioBlob: Blob, options: any = {}) {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('options', JSON.stringify(options));

      const response = await fetch('/api/ai/speech-to-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to convert speech to text');
      }

      return await response.json();
    } catch (error) {
      console.error('Speech-to-text error:', error);
      throw error;
    }
  }

  // Code Generation with Gemini and DeepSeek
  async generateCode(prompt: string, language: string, options: any = {}) {
    try {
      const response = await fetch('/api/ai/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          language,
          options,
          provider: 'gemini'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate code');
      }

      return await response.json();
    } catch (error) {
      console.error('Code generation error:', error);
      throw error;
    }
  }

  // Pexels Image Search
  async searchPexelsImages(query: string, options: any = {}) {
    try {
      const response = await fetch('/api/ai/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: query,
          options,
          provider: 'pexels'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to search images');
      }

      return await response.json();
    } catch (error) {
      console.error('Pexels search error:', error);
      throw error;
    }
  }

  // Check API status
  async checkAPIStatus(service: string): Promise<'online' | 'offline' | 'maintenance'> {
    try {
      const response = await fetch(`/api/status/${service}`);
      const data = await response.json();
      return data.status;
    } catch (error) {
      return 'offline';
    }
  }

  // Set API key
  setApiKey(service: string, key: string) {
    this.apiKeys[service] = key;
    // Optionally save to localStorage
    localStorage.setItem(`ai_api_key_${service}`, key);
  }

  // Get API key
  getApiKey(service: string): string {
    return this.apiKeys[service] || localStorage.getItem(`ai_api_key_${service}`) || '';
  }

  // Download/Export functionality
  async downloadContent(url: string, filename: string) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      link.click();
      
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  }
}

export const aiService = new AIServiceManager();