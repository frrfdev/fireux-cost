import { Product } from '@/features/product/types/product';

import { api } from '@/lib/api';

export const updateProduct = async (product: Product) => {
  const response = await api.put(`/api/products/${product.documentId}`, {
    data: product,
  });
  return response.data;
};
