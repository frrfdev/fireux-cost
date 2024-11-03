import { ProductPopulated } from '@/features/product/types/product';
import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api-response';
import { Pagination } from '@/types/pagination';

export const getProducts = async (props: Pagination) => {
  const response = await api.get<ApiResponse<ProductPopulated[]>>(
    `/api/products?pagination[pageSize]=${props.pagination?.pageSize}&pagination[page]=${
      props.pagination?.page
    }&filter[name]=${props.filters?.name ?? ''}&populate[0]=ingredients.product&populate[1]=priceUnit&fields=*`
  );
  return response.data;
};
