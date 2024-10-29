import { Product } from './product';

export type ProductIngredient = Product & {
  quantity: number;
};
