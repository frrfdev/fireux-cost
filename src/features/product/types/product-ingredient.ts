import { Product, ProductPopulated } from './product';

export type ProductIngredient = {
  quantity: number;
  product: Product;
};

export type ProductIngredientPopulated = ProductIngredient & {
  product: ProductPopulated;
};
