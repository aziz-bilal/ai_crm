import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookie } from '@/lib/auth';
import { ApiClient } from '@/lib/api-client';

export async function POST(request: NextRequest) {
  try {
    const { tenantId, apiKey } = await request.json();

    if (!tenantId || !apiKey) {
      return NextResponse.json({
        success: false,
        data: null,
        error: 'Tenant ID and API Key are required',
      });
    }

    const client = new ApiClient();
    const response = await client.post('/api/auth/login', {
      tenantId,
      apiKey,
    });

    if (response.success && response.data?.token) {
      await setAuthCookie(response.data.token);
      return NextResponse.json({
        success: true,
        data: { token: response.data.token },
        error: null,
      });
    }

    return NextResponse.json({
      success: false,
      data: null,
      error: response.error || 'Invalid credentials',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: null,
      error: 'Server error',
    });
  }
}
