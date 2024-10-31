import { PriceUnit } from './price-unit';
import { ProductIngredient, ProductIngredientPopulated } from './product-ingredient';

export type Product = {
  documentId?: string;
  name: string;
  priceUnit: string;
  price: number;
  manualPrice?: boolean;
  ingredients: ProductIngredient[];
};

export type ProductPopulated = Omit<Product, 'priceUnit' | 'ingredients'> & {
  priceUnit: PriceUnit;
  ingredients: ProductIngredientPopulated[];
};
