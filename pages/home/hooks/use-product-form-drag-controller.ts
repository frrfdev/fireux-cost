import {
  BaseEventPayload,
  ElementDragPayload,
  ElementDragType,
} from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import { useCallback, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useProductStore } from '../stores/use-product-store';
import { Product } from '@/features/product/types/product';

type UseProductFormDragControllerProps = {
  products: Product[];
  form: UseFormReturn<Product>;
};

export const useProductFormDragController = ({ products, form }: UseProductFormDragControllerProps) => {
  const ingredients = form.watch('ingredients');

  const setSelectedProductIngredient = useProductStore((state) => state.setSelectedProductIngredient);
  const setConfigModalOpen = useProductStore((state) => state.setConfigModalOpen);

  const handleProductDrop = useCallback(
    (source: ElementDragPayload) => {
      const draggedProductId = source.data.productId;

      const draggedProduct = products?.find((product) => product.documentId === draggedProductId);
      if (draggedProduct) {
        const productIngredient = {
          product: draggedProduct,
          quantity: 1,
        };
        setSelectedProductIngredient(productIngredient);
        form.setValue('ingredients', [...ingredients, productIngredient]);
        setConfigModalOpen(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [products, ingredients]
  );

  const handleDrop = useCallback(
    ({ source, location }: BaseEventPayload<ElementDragType>) => {
      const destination = location.current.dropTargets.length;
      if (!destination) return;
      if (source.data.type === 'product') handleProductDrop(source);
    },
    [handleProductDrop]
  );

  useEffect(() => {
    // Only import and initialize drag-and-drop on the client side
    if (typeof window !== 'undefined') {
      import('@atlaskit/pragmatic-drag-and-drop/element/adapter').then(({ monitorForElements }) => {
        return monitorForElements({
          onDrop: handleDrop,
        });
      });
    }
  }, [handleDrop, ingredients]);
};
