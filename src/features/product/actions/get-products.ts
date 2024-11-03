import { ProductPopulated } from '@/features/product/types/product';
import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api-response';
import { Pagination } from '@/types/pagination';
import { useFakeProductApiStore } from '../stores/use-fake-product-api-store';

export const getProducts = async (props: Pagination) => {
  const getProducts = useFakeProductApiStore.getState().getProducts;
  const products = getProducts(props);

  const token = localStorage.getItem('TOKEN');

  if (!token) {
    const response = getProducts(props);

    return {
      data: response,
      meta: {
        pagination: {
          page: props.pagination?.page ?? 1,
          pageSize: props.pagination?.pageSize ?? 10,
          pageCount: 1,
          total: products.length,
        },
      } satisfies ApiResponse<ProductPopulated[]>['meta'],
    };
  }

  const response = await api.get<ApiResponse<ProductPopulated[]>>(
    `/api/products?pagination[pageSize]=${
      props.pagination?.pageSize
    }&pagination[page]=${props.pagination?.page}&filter[name]=${
      props.filters?.name ?? ''
    }&populate[0]=ingredients.product&populate[1]=priceUnit&fields=*`
  );
  return response.data;
};
