import { ProductPopulated } from '@/features/product/types/product';
import { api } from '@/lib/api';

export const deleteProduct = async (product: ProductPopulated) => {
  if (!product.documentId) throw new Error('Product ID is required');
  const response = await api.delete(`/api/products/${product.documentId}`);
  return response.data;
};
