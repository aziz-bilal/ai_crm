import { getServerApiClient } from '@/lib/api-client';
import type { DashboardStats } from '@/types';
import DashboardClient from '@/components/DashboardClient';

export const dynamic = 'force-dynamic';

async function getDashboardData(): Promise<DashboardStats | null> {
  const client = await getServerApiClient();
  const response = await client.get<DashboardStats>('/api/dashboard');
  return response.success ? response.data : null;
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load dashboard data</p>
      </div>
    );
  }

  return <DashboardClient initialData={data} />;
}
