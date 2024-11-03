import { ProductPopulated } from '@/features/product/types/product';
import { api } from '@/lib/api';
import { useFakeProductApiStore } from '../stores/use-fake-product-api-store';

export const deleteProduct = async (product: ProductPopulated) => {
  const deleteProduct = useFakeProductApiStore.getState().deleteProduct;

  if (!localStorage.getItem('TOKEN'))
    return deleteProduct(product.documentId ?? '');

  if (!product.documentId) throw new Error('Product ID is required');
  const response = await api.delete(`/api/products/${product.documentId}`);
  return response.data;
};
