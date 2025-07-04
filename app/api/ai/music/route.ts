import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, options, provider = 'replicate' } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Simulate music generation
    await new Promise(resolve => setTimeout(resolve, 5000));

    const musicData = {
      success: true,
      audioUrl: 'https://www.soundjay.com/misc/bell-ringing-05.wav',
      prompt: prompt.substring(0, 100) + '...',
      provider,
      duration: options.duration || '30 seconds',
      genre: options.genre || 'ambient'
    };

    return NextResponse.json(musicData);
  } catch (error) {
    console.error('Music generation API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}