import { ProductFormRegister } from '@/features/product/types/product';

import { api } from '@/lib/api';
import { useFakeProductApiStore } from '../stores/use-fake-product-api-store';

export const storeProduct = async (product: ProductFormRegister) => {
  const storeProduct = useFakeProductApiStore.getState().createProduct;

  if (!localStorage.getItem('TOKEN')) return storeProduct(product);

  const response = await api.post('/api/products', { data: product });
  return response.data;
};
