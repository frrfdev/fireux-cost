import { Product } from '@/features/auth/types/product';
import { api } from '@/lib/api';

export const deleteProduct = async (product: Product) => {
  if (!product.id) throw new Error('Product ID is required');
  const response = await api.delete(`/api/products/${product.id - 1}`);
  return response.data;
};
