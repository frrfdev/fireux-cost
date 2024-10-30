import { Product } from '@/features/auth/types/product';
import invariant from 'tiny-invariant';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useEffect, useRef, useState } from 'react';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { cn } from '@/lib/utils';
import { GripVertical, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteDialog } from '@/components/ui/delete-dialog';
import { useDeleteProduct } from '@/features/product/hooks/use-delete-product';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  product: Product;
  index: number;
};

export const ProductRowDraggable = ({ product }: Props) => {
  const productRef = useRef(null);
  const queryClient = useQueryClient();

  const [isDragging, setIsDragging] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { mutateAsync: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const handleDeleteProduct = async () => {
    await deleteProduct(product);
    queryClient.invalidateQueries({ queryKey: ['products'] });
    setOpenDeleteDialog(false);
  };

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
          const data = { type: 'product', productId: product.id };

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
      className={cn(
        'shadow-sm border border-gray-100 rounded-md p-2 bg-white flex gap-2 items-center justify-between cursor-grab'
      )}
      ref={productRef}
    >
      <div className="flex gap-2 items-center">
        <GripVertical size={16} className="text-gray-400"></GripVertical>
        <span>{product.name}</span>
      </div>
      <DeleteDialog<Product>
        isOpen={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteProduct}
        item={product}
        title="Confirmar exclusão do produto"
        description={`Tem certeza que deseja excluir o produto "${product.name}"?`}
      />
      <Button variant="destructive" size="icon" isLoading={isDeleting} onClick={() => setOpenDeleteDialog(true)}>
        <Trash size={16} className="text-white"></Trash>
      </Button>
    </li>
  );
};
