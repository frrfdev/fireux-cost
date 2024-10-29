import { Product } from '@/features/auth/types/product';
import invariant from 'tiny-invariant';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useEffect, useRef, useState } from 'react';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { cn } from '@/lib/utils';

type Props = {
  product: Product;
  index: number;
};

export const ProductRowDraggable = ({ product }: Props) => {
  const productRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const productEl = productRef.current;
    invariant(productEl);

    return combine(
      draggable({
        element: productEl,
        getInitialData: () => ({ type: 'product', productId: product.id }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element: productEl,
        getData: ({ input, element }) => {
          // To attach card data to a drop target
          const data = { type: 'product', productId: product.id };

          // Attaches the closest edge (top or bottom) to the data object
          // This data will be used to determine where to drop card relative
          // to the target card.
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ['top', 'bottom'],
          });
        },
      })
    );
  }, []);

  return (
    <li
      key={product.id}
      className={cn('shadow-sm border border-gray-100 rounded-md p-2 bg-white')}
      ref={productRef}
    >
      {product.name}
    </li>
  );
};
