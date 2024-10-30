import { useMutation } from '@tanstack/react-query';
import { deleteProduct } from '../actions/delete-product';

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: deleteProduct,
  });
};
