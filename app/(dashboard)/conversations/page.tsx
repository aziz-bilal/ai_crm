import { getServerApiClient } from '@/lib/api-client';
import type { Conversation } from '@/types';
import ConversationsClient from '@/components/ConversationsClient';

export const dynamic = 'force-dynamic';

async function getConversations(): Promise<Conversation[]> {
  const client = await getServerApiClient();
  const response = await client.get<Conversation[]>('/api/conversations');
  return response.success ? response.data : [];
}

export default async function ConversationsPage() {
  const conversations = await getConversations();

  return <ConversationsClient initialConversations={conversations} />;
}
