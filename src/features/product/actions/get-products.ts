import { Product } from '@/features/auth/types/product';
import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api-response';

export const getProducts = async () => {
  const response = await api.get<ApiResponse<Product[]>>('/api/products');
  return response.data;
};
