import { getServerApiClient } from '@/lib/api-client';
import type { ConversationDetail } from '@/types';
import ConversationDetailClient from '@/components/ConversationDetailClient';

export const dynamic = 'force-dynamic';

async function getConversationDetail(sessionId: string): Promise<ConversationDetail | null> {
  const client = await getServerApiClient();
  const response = await client.get<ConversationDetail>(`/api/conversations/${sessionId}`);
  return response.success ? response.data : null;
}

export default async function ConversationDetailPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const conversation = await getConversationDetail(sessionId);

  if (!conversation) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Conversation not found</p>
      </div>
    );
  }

  return <ConversationDetailClient conversation={conversation} />;
}
