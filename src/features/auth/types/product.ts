import { ProductIngredient } from './product-ingredient';

export type Product = {
  documentId?: string;
  name: string;
  priceUnitId: string;
  price: number;
  manualPrice?: boolean;
  ingredients: ProductIngredient[];
};
