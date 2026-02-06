'use client';

import { useState, useEffect } from 'react';
import type { DashboardStats } from '@/types';
import { getClientApiClient } from '@/lib/api-client';

export default function DashboardClient({ initialData }: { initialData: DashboardStats }) {
  const [data, setData] = useState<DashboardStats>(initialData);

  useEffect(() => {
    const interval = setInterval(async () => {
      const client = getClientApiClient();
      const response = await client.get<DashboardStats>('/api/dashboard');
      if (response.success) {
        setData(response.data);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const usagePercent = (data.messagesUsed / data.messagesQuota) * 100;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Messages Used</div>
          <div className="text-3xl font-bold text-gray-900">
            {data.messagesUsed.toLocaleString()}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            of {data.messagesQuota.toLocaleString()} quota
          </div>
          <div className="mt-3 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(usagePercent, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Active Conversations</div>
          <div className="text-3xl font-bold text-gray-900">
            {data.activeConversations}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Currently ongoing
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Pending Handoffs</div>
          <div className="text-3xl font-bold text-orange-600">
            {data.pendingHandoffs}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Awaiting human response
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Enabled Channels</div>
          <div className="text-3xl font-bold text-gray-900">
            {data.enabledChannels.length}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.enabledChannels.map((channel) => (
              <span
                key={channel}
                className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded"
              >
                {channel}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
