import { Product } from '@/features/product/types/product';
import { ProductIngredient } from '@/features/product/types/product-ingredient';
import { Unit } from '@/features/unit/types/Unit';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

type ProductStore = {
  editProduct: Product | null;
  setEditProduct: (product: Product | null) => void;
  selectedProductIngredient: ProductIngredient | null;
  setSelectedProductIngredient: (productIngredient: ProductIngredient | null) => void;
  configModalOpen: boolean;
  setConfigModalOpen: (open: boolean) => void;
  selectedUnit: Unit | null;
  setSelectedUnit: (unit: Unit | null) => void;
};

export const useProductStore = create<ProductStore>()(
  subscribeWithSelector((set) => ({
    editProduct: null,
    setEditProduct: (product) => set({ editProduct: product }),
    selectedProductIngredient: null,
    setSelectedProductIngredient: (productIngredient) => set({ selectedProductIngredient: productIngredient }),
    configModalOpen: false,
    setConfigModalOpen: (open) => set({ configModalOpen: open }),
    selectedUnit: null,
    setSelectedUnit: (unit) => set({ selectedUnit: unit }),
  }))
);
