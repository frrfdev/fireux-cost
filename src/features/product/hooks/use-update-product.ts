import { useMutation } from '@tanstack/react-query';
import { updateProduct } from '../actions/update-product';

export const useUpdateProduct = () => {
  return useMutation({
    mutationKey: ['update-product'],
    mutationFn: updateProduct,
  });
};
