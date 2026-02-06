import { cookies } from 'next/headers';
import type { ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5678';

export class ApiClient {
  private baseUrl: string;
  private token: string | null;

  constructor(token?: string) {
    this.baseUrl = API_BASE_URL;
    this.token = token || null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      return {
        success: false,
        data: null as T,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    return await response.json();
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export async function getServerApiClient(): Promise<ApiClient> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  return new ApiClient(token);
}

export function getClientApiClient(): ApiClient {
  if (typeof window === 'undefined') {
    return new ApiClient();
  }
  
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('auth_token='))
    ?.split('=')[1];
  
  return new ApiClient(token);
}
