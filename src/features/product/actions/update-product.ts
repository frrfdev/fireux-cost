import { ProductFormRegister } from '@/features/product/types/product';

import { api } from '@/lib/api';

export const updateProduct = async ({ documentId, product }: { documentId: string; product: ProductFormRegister }) => {
  const response = await api.put(`/api/products/${documentId}`, {
    data: product,
  });
  return response.data;
};
