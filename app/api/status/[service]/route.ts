import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { service: string } }
) {
  const { service } = params;

  // Simulate API status check
  const statusMap: Record<string, 'online' | 'offline' | 'maintenance'> = {
    'eleven-labs': 'online',
    'gemini': 'online',
    'fai': 'online',
    'openai': 'online',
    'stability-ai': 'online',
    'replicate': 'maintenance'
  };

  const status = statusMap[service] || 'offline';

  return NextResponse.json({
    service,
    status,
    timestamp: new Date().toISOString()
  });
}