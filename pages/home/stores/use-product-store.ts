import { ProductPopulated } from '@/features/product/types/product';
import { ProductIngredient } from '@/features/product/types/product-ingredient';
import { Unit } from '@/features/unit/types/Unit';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

type ProductStore = {
  editProduct: ProductPopulated | null;
  setEditProduct: (product: ProductPopulated | null) => void;
  selectedProductIngredient: ProductIngredient | null;
  setSelectedProductIngredient: (
    productIngredient: ProductIngredient | null
  ) => void;
  configModalOpen: boolean;
  setConfigModalOpen: (open: boolean) => void;
  selectedUnit: Unit | null;
  setSelectedUnit: (unit: Unit | null) => void;
  priceCalcDialogOpen: boolean;
  setPriceCalcDialogOpen: (open: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
};

export const useProductStore = create<ProductStore>()(
  subscribeWithSelector((set) => ({
    editProduct: null,
    setEditProduct: (product) => set({ editProduct: product }),
    selectedProductIngredient: null,
    setSelectedProductIngredient: (productIngredient) =>
      set({ selectedProductIngredient: productIngredient }),
    configModalOpen: false,
    setConfigModalOpen: (open) => set({ configModalOpen: open }),
    selectedUnit: null,
    setSelectedUnit: (unit) => set({ selectedUnit: unit }),
    priceCalcDialogOpen: false,
    setPriceCalcDialogOpen: (open) => set({ priceCalcDialogOpen: open }),
    search: '',
    setSearch: (search) => set({ search }),
  }))
);
