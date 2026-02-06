import { getServerApiClient } from '@/lib/api-client';
import type { Usage } from '@/types';
import UsageClient from '@/components/UsageClient';

export const dynamic = 'force-dynamic';

async function getUsage(): Promise<Usage | null> {
  const client = await getServerApiClient();
  const response = await client.get<Usage>('/api/usage');
  return response.success ? response.data : null;
}

export default async function UsagePage() {
  const usage = await getUsage();

  if (!usage) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load usage data</p>
      </div>
    );
  }

  return <UsageClient initialUsage={usage} />;
}
