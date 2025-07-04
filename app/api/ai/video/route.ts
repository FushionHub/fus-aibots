import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, options, provider = 'veo-3' } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Simulate video generation (longer delay for video)
    await new Promise(resolve => setTimeout(resolve, 8000));

    const videoData = {
      success: true,
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      prompt: prompt.substring(0, 100) + '...',
      provider,
      duration: options.duration || '5 seconds',
      quality: options.quality || 'hd',
      style: options.style || 'realistic'
    };

    return NextResponse.json(videoData);
  } catch (error) {
    console.error('Video generation API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}