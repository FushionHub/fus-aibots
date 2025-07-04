import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { text, voice, options, provider = 'eleven-labs' } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Simulate API call to Eleven Labs or other providers
    if (provider === 'eleven-labs') {
      return await generateElevenLabsVoiceover(text, voice, options);
    } else if (provider === 'gemini') {
      return await generateGeminiVoiceover(text, voice, options);
    } else if (provider === 'fai') {
      return await generateFAIVoiceover(text, voice, options);
    }

    return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
  } catch (error) {
    console.error('Voiceover API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function generateElevenLabsVoiceover(text: string, voice: string, options: any) {
  // Simulate Eleven Labs API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return NextResponse.json({
    success: true,
    audioUrl: 'https://example.com/generated-audio.mp3',
    provider: 'eleven-labs',
    duration: 5.2,
    voice,
    text: text.substring(0, 50) + '...'
  });
}

async function generateGeminiVoiceover(text: string, voice: string, options: any) {
  // Simulate Gemini API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return NextResponse.json({
    success: true,
    audioUrl: 'https://example.com/generated-audio-gemini.mp3',
    provider: 'gemini',
    duration: 4.8,
    voice,
    text: text.substring(0, 50) + '...'
  });
}

async function generateFAIVoiceover(text: string, voice: string, options: any) {
  // Simulate FAI API call
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  return NextResponse.json({
    success: true,
    audioUrl: 'https://example.com/generated-audio-fai.mp3',
    provider: 'fai',
    duration: 5.5,
    voice,
    text: text.substring(0, 50) + '...'
  });
}