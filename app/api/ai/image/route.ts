import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, options, provider = 'stability-ai' } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Simulate image generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    const imageData = {
      success: true,
      imageUrl: `https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&dpr=1`,
      prompt: prompt.substring(0, 100) + '...',
      provider,
      dimensions: options.size || '1024x1024',
      style: options.style || 'photorealistic'
    };

    return NextResponse.json(imageData);
  } catch (error) {
    console.error('Image generation API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}