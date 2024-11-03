import { useInfiniteQuery } from '@tanstack/react-query';

import { getProducts } from '../actions/get-products';
import { Pagination } from '@/types/pagination';

export const useGetProductsInfinite = (props: Pagination) => {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam }) => getProducts({ ...props, pagination: { ...props.pagination, page: pageParam } }),
    getNextPageParam: (lastPage) =>
      lastPage?.meta?.pagination
        ? lastPage.meta.pagination.page < lastPage.meta.pagination.pageCount
          ? lastPage.meta.pagination.page + 1
          : undefined
        : 1,
    initialPageParam: 1,
  });
};
