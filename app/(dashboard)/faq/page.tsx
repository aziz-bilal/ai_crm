import { getServerApiClient } from '@/lib/api-client';
import type { FAQ } from '@/types';
import FAQClient from '@/components/FAQClient';

export const dynamic = 'force-dynamic';

async function getFAQs(): Promise<FAQ[]> {
  const client = await getServerApiClient();
  const response = await client.get<FAQ[]>('/api/faq');
  return response.success ? response.data : [];
}

export default async function FAQPage() {
  const faqs = await getFAQs();

  return <FAQClient initialFAQs={faqs} />;
}
