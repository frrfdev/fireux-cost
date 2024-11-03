import { ProductFormRegister } from '@/features/product/types/product';

import { api } from '@/lib/api';
import { useFakeProductApiStore } from '../stores/use-fake-product-api-store';

export const updateProduct = async ({
  documentId,
  product,
}: {
  documentId: string;
  product: ProductFormRegister;
}) => {
  const updateProduct = useFakeProductApiStore.getState().updateProduct;

  if (!localStorage.getItem('TOKEN')) return updateProduct(documentId, product);

  const response = await api.put(`/api/products/${documentId}`, {
    data: product,
  });
  return response.data;
};
