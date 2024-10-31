import { Product } from '@/features/auth/types/product';

import { api } from '@/lib/api';

export const updateProduct = async (product: Product) => {
  const response = await api.put(`/api/products/${product.documentId}`, {
    data: product,
  });
  return response.data;
};