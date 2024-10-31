import { ProductPopulated } from '@/features/product/types/product';
import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api-response';

export const getProducts = async () => {
  const response = await api.get<ApiResponse<ProductPopulated[]>>(
    '/api/products?populate[0]=ingredients.product&populate[1]=priceUnit&fields=*'
  );
  return response.data;
};
