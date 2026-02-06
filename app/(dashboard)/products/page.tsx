import { getServerApiClient } from '@/lib/api-client';
import type { Product } from '@/types';
import ProductsClient from '@/components/ProductsClient';

export const dynamic = 'force-dynamic';

async function getProducts(): Promise<Product[]> {
  const client = await getServerApiClient();
  const response = await client.get<Product[]>('/api/products');
  return response.success ? response.data : [];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsClient initialProducts={products} />;
}
