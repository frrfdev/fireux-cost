import { create } from 'zustand';
import { ProductFormRegister, ProductPopulated } from '../types/product';
import { Pagination } from '@/types/pagination';
import { Unit } from '@/features/unit/types/Unit';

type FakeProductApiStore = {
  products: ProductFormRegister[];
  units: Unit[];
  setProducts: (products: ProductFormRegister[]) => void;
  getProducts: (pagination: Pagination) => ProductPopulated[];
  showProduct: (productId: string) => ProductPopulated | null;
  updateProduct: (documentId: string, product: ProductFormRegister) => void;
  deleteProduct: (productId: string) => void;
  createProduct: (product: ProductFormRegister) => void;
  getUnits: (pagination: Pagination) => Unit[];
  populateProduct: (product: ProductFormRegister) => ProductPopulated;
};

export const useFakeProductApiStore = create<FakeProductApiStore>(
  (set, get) => ({
    products: [
      {
        documentId: '1',
        name: 'Pizza',
        priceUnit: '1',
        price: 10,
        manualPrice: true,
        ingredients: [],
      },
      {
        documentId: '2',
        name: 'Pizza2',
        priceUnit: '1',
        price: 0,
        manualPrice: false,
        ingredients: [
          {
            product: '1',
            quantity: 1,
          },
        ],
      },
    ],
    units: [
      {
        documentId: '1',
        name: 'Gramas',
        acronym: 'g',
      },
      {
        documentId: '2',
        name: 'Litros',
        acronym: 'L',
      },
      {
        documentId: '3',
        name: 'Quilogramas',
        acronym: 'kg',
      },
      {
        documentId: '4',
        name: 'Mililitros',
        acronym: 'ml',
      },
      {
        documentId: '5',
        name: 'Miligramas',
        acronym: 'mg',
      },
      {
        documentId: '6',
        name: 'Unidade',
        acronym: 'un.',
      },
    ],
    populateProduct: (product: ProductFormRegister): ProductPopulated => ({
      ...product,
      priceUnit: get().units.find(
        (u) => u.documentId === product?.priceUnit
      ) as Unit,
      ingredients:
        product?.ingredients.map((i) => {
          const product = get().products.find(
            (p) => p.documentId === i.product
          ) as ProductFormRegister;

          console.log('aaa');
          return {
            ...i,
            priceUnit: get().units.find(
              (u) => u.documentId === product.priceUnit
            ) as Unit,
            product: get().populateProduct(product) as ProductPopulated,
          };
        }) ?? [],
    }),
    setProducts: (products) => set({ products }),
    getProducts: (props: Pagination) => {
      if (!props.pagination) return [];
      const { page = 1, pageSize = 10 } = props.pagination;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      return get()
        .products.slice(startIndex, endIndex)
        .map((p) => ({
          ...p,
          priceUnit: get().units.find((u) => u.documentId === p.priceUnit),
          ingredients: p.ingredients.map((i) => {
            const product = get().products.find(
              (p) => p.documentId === i.product
            ) as ProductFormRegister;
            return {
              ...i,
              product: get().populateProduct(product),
            };
          }),
        })) as ProductPopulated[];
    },
    showProduct: (productId: string) => {
      const product = get().products.find(
        (product) => product.documentId === productId
      );

      if (!product) return null;

      return get().populateProduct(product);
    },
    updateProduct: (documentId: string, product: ProductFormRegister) => {
      set((state) => ({
        products: state.products.map((p) =>
          p.documentId === documentId
            ? {
                ...product,
                documentId,
              }
            : p
        ),
      }));
    },
    deleteProduct: (productId: string) => {
      set((state) => ({
        products: state.products.filter((p) => p.documentId !== productId),
      }));
    },
    createProduct: (product: ProductFormRegister) => {
      set((state) => ({
        products: [
          ...state.products,
          {
            ...product,
            documentId: crypto.randomUUID(),
          },
        ],
      }));
    },
    getUnits: (props: Pagination) => {
      if (!props.pagination) return [];
      const { page = 1, pageSize = 10 } = props.pagination;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return get().units.slice(startIndex, endIndex);
    },
  })
);
