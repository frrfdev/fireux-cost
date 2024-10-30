import { useQuery } from '@tanstack/react-query';

import { getProducts } from '../actions/get-products';

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};
