'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ConversationDetail } from '@/types';
import { getClientApiClient } from '@/lib/api-client';

export default function ConversationDetailClient({
  conversation,
}: {
  conversation: ConversationDetail;
}) {
  const router = useRouter();
  const [handoffLoading, setHandoffLoading] = useState(false);

  const handleForceHandoff = async () => {
    if (!confirm('Force handoff to human agent?')) return;

    setHandoffLoading(true);
    const client = getClientApiClient();
    const response = await client.post('/api/handoff', {
      sessionId: conversation.sessionId,
      reason: 'Manual handoff from admin',
    });

    if (response.success) {
      alert('Handoff initiated');
      router.refresh();
    } else {
      alert('Failed to initiate handoff');
    }
    setHandoffLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AI_ACTIVE':
        return 'bg-blue-100 text-blue-800';
      case 'HUMAN_ACTIVE':
        return 'bg-orange-100 text-orange-800';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Conversation Detail</h1>
          <p className="text-sm text-gray-600 mt-1">Session: {conversation.sessionId}</p>
        </div>
        <button
          onClick={handleForceHandoff}
          disabled={handoffLoading || conversation.status === 'HUMAN_ACTIVE'}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {handoffLoading ? 'Processing...' : 'Force Handoff'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Channel</div>
          <div className="text-lg font-semibold text-gray-900">{conversation.channel}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Status</div>
          <span className={`inline-block px-3 py-1 text-sm font-medium rounded ${getStatusColor(conversation.status)}`}>
            {conversation.status}
          </span>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Messages</div>
          <div className="text-lg font-semibold text-gray-900">{conversation.messages.length}</div>
        </div>
      </div>

      {conversation.metadata && Object.keys(conversation.metadata).length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {conversation.metadata.intent && (
              <div>
                <div className="text-sm text-gray-500">Intent</div>
                <div className="text-sm font-medium text-gray-900">{conversation.metadata.intent}</div>
              </div>
            )}
            {conversation.metadata.sentiment && (
              <div>
                <div className="text-sm text-gray-500">Sentiment</div>
                <div className="text-sm font-medium text-gray-900">{conversation.metadata.sentiment}</div>
              </div>
            )}
            {conversation.metadata.urgency && (
              <div>
                <div className="text-sm text-gray-500">Urgency</div>
                <div className="text-sm font-medium text-gray-900">{conversation.metadata.urgency}</div>
              </div>
            )}
            {conversation.metadata.language && (
              <div>
                <div className="text-sm text-gray-500">Language</div>
                <div className="text-sm font-medium text-gray-900">{conversation.metadata.language}</div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Message History</h2>
        </div>
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {conversation.messages.length === 0 ? (
            <p className="text-center text-gray-500">No messages</p>
          ) : (
            conversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-lg ${message.sender === 'user' ? 'bg-gray-100' : 'bg-blue-100'} rounded-lg p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-gray-900 uppercase">
                      {message.sender}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
