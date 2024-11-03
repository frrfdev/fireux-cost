import { Product, ProductPopulated } from './product';

export type ProductIngredient = {
  quantity: number;
  product: Product;
};

export type ProductIngredientPopulated = Omit<ProductIngredient, 'product'> & {
  product: ProductPopulated;
};
