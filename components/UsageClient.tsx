'use client';

import { useState, useEffect } from 'react';
import type { Usage } from '@/types';
import { getClientApiClient } from '@/lib/api-client';

export default function UsageClient({ initialUsage }: { initialUsage: Usage }) {
  const [usage, setUsage] = useState<Usage>(initialUsage);

  useEffect(() => {
    const interval = setInterval(async () => {
      const client = getClientApiClient();
      const response = await client.get<Usage>('/api/usage');
      if (response.success) {
        setUsage(response.data);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const usagePercent = (usage.used / usage.limit) * 100;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Usage Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Messages Used</div>
          <div className="text-3xl font-bold text-gray-900">
            {usage.used.toLocaleString()}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Message Limit</div>
          <div className="text-3xl font-bold text-gray-900">
            {usage.limit.toLocaleString()}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Remaining</div>
          <div className="text-3xl font-bold text-green-600">
            {usage.remaining.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage Overview</h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Current Usage</span>
              <span>{usagePercent.toFixed(1)}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all ${
                  usagePercent >= 90
                    ? 'bg-red-600'
                    : usagePercent >= 70
                    ? 'bg-yellow-600'
                    : 'bg-blue-600'
                }`}
                style={{ width: `${Math.min(usagePercent, 100)}%` }}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Used:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {usage.used.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Limit:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {usage.limit.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Remaining:</span>
                <span className="ml-2 font-medium text-green-600">
                  {usage.remaining.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Percentage:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {usagePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          {usagePercent >= 90 && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-800">
                ⚠️ You have used {usagePercent.toFixed(1)}% of your message quota. Consider upgrading your plan.
              </p>
            </div>
          )}

          {usagePercent >= 70 && usagePercent < 90 && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-sm text-yellow-800">
                ⚠️ You have used {usagePercent.toFixed(1)}% of your message quota.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
