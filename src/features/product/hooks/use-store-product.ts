import { useMutation } from '@tanstack/react-query';

import { storeProduct } from '../actions/store-product';

export const useStoreProduct = () => {
  return useMutation({
    mutationKey: ['store-product'],
    mutationFn: storeProduct,
  });
};
