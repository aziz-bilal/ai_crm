import { getServerApiClient } from '@/lib/api-client';
import type { AISettings } from '@/types';
import SettingsClient from '@/components/SettingsClient';

export const dynamic = 'force-dynamic';

async function getSettings(): Promise<AISettings | null> {
  const client = await getServerApiClient();
  const response = await client.get<AISettings>('/api/settings');
  return response.success ? response.data : null;
}

export default async function SettingsPage() {
  const settings = await getSettings();

  if (!settings) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load settings</p>
      </div>
    );
  }

  return <SettingsClient initialSettings={settings} />;
}
