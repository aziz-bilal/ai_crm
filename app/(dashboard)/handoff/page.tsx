import { getServerApiClient } from '@/lib/api-client';
import type { Handoff } from '@/types';
import HandoffClient from '@/components/HandoffClient';

export const dynamic = 'force-dynamic';

async function getHandoffs(): Promise<Handoff[]> {
  const client = await getServerApiClient();
  const response = await client.get<Handoff[]>('/api/handoff');
  return response.success ? response.data : [];
}

export default async function HandoffPage() {
  const handoffs = await getHandoffs();

  return <HandoffClient initialHandoffs={handoffs} />;
}
