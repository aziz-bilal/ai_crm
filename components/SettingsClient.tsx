'use client';

import { useState } from 'react';
import type { AISettings } from '@/types';
import { getClientApiClient } from '@/lib/api-client';

export default function SettingsClient({ initialSettings }: { initialSettings: AISettings }) {
  const [settings, setSettings] = useState<AISettings>(initialSettings);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof AISettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const client = getClientApiClient();
    const response = await client.post('/api/settings', settings);

    if (response.success) {
      alert('Settings saved successfully');
    } else {
      alert('Failed to save settings');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">AI Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Greeting Prompt</h2>
          <textarea
            value={settings.greetingPrompt}
            onChange={(e) => handleChange('greetingPrompt', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Inquiry Prompt</h2>
          <textarea
            value={settings.productPrompt}
            onChange={(e) => handleChange('productPrompt', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Processing Prompt</h2>
          <textarea
            value={settings.orderPrompt}
            onChange={(e) => handleChange('orderPrompt', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Support Prompt</h2>
          <textarea
            value={settings.supportPrompt}
            onChange={(e) => handleChange('supportPrompt', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Intent Classifier Prompt</h2>
          <textarea
            value={settings.intentClassifierPrompt}
            onChange={(e) => handleChange('intentClassifierPrompt', e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
