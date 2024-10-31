import { Product } from '@/features/product/types/product';
import { ProductIngredient } from '@/features/product/types/product-ingredient';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

type ProductStore = {
  editProduct: Product | null;
  setEditProduct: (product: Product | null) => void;
  selectedProductIngredient: ProductIngredient | null;
  setSelectedProductIngredient: (productIngredient: ProductIngredient | null) => void;
  configModalOpen: boolean;
  setConfigModalOpen: (open: boolean) => void;
};

export const useProductStore = create<ProductStore>()(
  subscribeWithSelector((set) => ({
    editProduct: null,
    setEditProduct: (product) => set({ editProduct: product }),
    selectedProductIngredient: null,
    setSelectedProductIngredient: (productIngredient) => set({ selectedProductIngredient: productIngredient }),
    configModalOpen: false,
    setConfigModalOpen: (open) => set({ configModalOpen: open }),
  }))
);
