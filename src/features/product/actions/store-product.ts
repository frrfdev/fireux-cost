import { Product } from '@/features/product/types/product';

import { api } from '@/lib/api';

export const storeProduct = async (product: Product) => {
  const response = await api.post('/api/products', { data: product });
  return response.data;
};
