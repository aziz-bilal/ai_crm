'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Handoff } from '@/types';
import { getClientApiClient } from '@/lib/api-client';

export default function HandoffClient({ initialHandoffs }: { initialHandoffs: Handoff[] }) {
  const [handoffs, setHandoffs] = useState<Handoff[]>(initialHandoffs);
  const [resolvingId, setResolvingId] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const client = getClientApiClient();
      const response = await client.get<Handoff[]>('/api/handoff');
      if (response.success) {
        setHandoffs(response.data);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleResolve = async (id: string) => {
    if (!confirm('Mark this handoff as resolved?')) return;

    setResolvingId(id);
    const client = getClientApiClient();
    const response = await client.post(`/api/handoff/resolve`, { id });

    if (response.success) {
      setHandoffs((prev) => prev.filter((h) => h.id !== id));
    } else {
      alert('Failed to resolve handoff');
    }
    setResolvingId(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Handoff Queue</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Session ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Channel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {handoffs.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  No pending handoffs
                </td>
              </tr>
            ) : (
              handoffs.map((handoff) => (
                <tr key={handoff.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/conversations/${handoff.sessionId}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {handoff.sessionId.substring(0, 12)}...
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{handoff.channel}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{handoff.reason}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {handoff.lastMessage}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {new Date(handoff.timestamp).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        handoff.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {handoff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {handoff.status === 'pending' && (
                      <button
                        onClick={() => handleResolve(handoff.id)}
                        disabled={resolvingId === handoff.id}
                        className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                      >
                        {resolvingId === handoff.id ? 'Resolving...' : 'Resolve'}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
