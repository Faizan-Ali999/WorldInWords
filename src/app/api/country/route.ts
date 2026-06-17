import { NextRequest, NextResponse } from 'next/server';
import { fetchCountryDetailsFromServer } from '@/lib/api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Missing country code' }, { status: 400 });
  }

  try {
    const data = await fetchCountryDetailsFromServer(code.toUpperCase());
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'Failed to retrieve country telemetry' }, { status: 500 });
  }
}
