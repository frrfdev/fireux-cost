import { getUnits } from '@/features/unit/actions/get-units';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetUnitsQuery = () => {
  return useInfiniteQuery({
    queryKey: ['units'],
    queryFn: getUnits,
    getNextPageParam: (lastPage) =>
      lastPage.meta.pagination.page === lastPage.meta.pagination.pageCount
        ? undefined
        : lastPage.meta.pagination.page + 1,
    initialPageParam: 1,
  });
};
