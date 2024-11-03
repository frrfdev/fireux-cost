import { ProductPopulated } from '@/features/product/types/product';
import invariant from 'tiny-invariant';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useEffect, useRef, useState } from 'react';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { cn } from '@/lib/utils';
import { Edit, GripVertical, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteDialog } from '@/components/ui/delete-dialog';
import { useDeleteProduct } from '@/features/product/hooks/use-delete-product';
import { useIsMutating, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useProductStore } from '../stores/use-product-store';
import { convertToProductFormRegister } from './product.form';

type Props = {
  product: ProductPopulated;
  index: number;
};

export const ProductRowDraggable = ({ product }: Props) => {
  const productRef = useRef(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const setProductEditing = useProductStore((state) => state.setEditProduct);
  const productEditing = useProductStore((state) => state.editProduct);

  const [_isDragging, setIsDragging] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { mutateAsync: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const isUpdatingProduct = useIsMutating({ mutationKey: ['update-product'] });

  const handleDeleteProduct = async () => {
    await deleteProduct(product);
    queryClient.invalidateQueries({ queryKey: ['products'] });
    setOpenDeleteDialog(false);
    toast({
      title: 'Successo',
      description: 'Produto Removido com Sucesso 😣',
    });
  };

  useEffect(() => {
    const productEl = productRef.current;
    invariant(productEl);

    return combine(
      draggable({
        element: productEl,
        getInitialData: () => ({
          type: 'product',
          productId: product.documentId,
        }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element: productEl,
        getData: ({ input, element }) => {
          const data = { type: 'product', productId: product.documentId };

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
    <div
      key={product.documentId}
      className={cn(
        'shadow-sm border border-gray-100 rounded-md p-2 bg-white grid grid-cols-3 gap-2 items-center justify-between cursor-grab'
      )}
      ref={productRef}
    >
      <div className="flex gap-2 items-center">
        <GripVertical size={16} className="text-gray-400"></GripVertical>
        <span>{product.name}</span>
      </div>
      <span>
        {`${Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(
          product.manualPrice
            ? product.price
            : product.ingredients.reduce((acc, ingredient) => acc + ingredient.product.price * ingredient.quantity, 0)
        )}/${product.priceUnit?.acronym ?? 'N.I'}`}
      </span>
      <DeleteDialog<ProductPopulated>
        isOpen={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteProduct}
        item={product}
        title="Confirmar exclusão do produto"
        description={`Tem certeza que deseja excluir o produto "${product.name}"?`}
      />
      <div className="flex gap-2 justify-end">
        <Button
          variant="default"
          size="icon"
          isLoading={!!isUpdatingProduct && productEditing?.documentId === product.documentId}
          onClick={async () => {
            setProductEditing(convertToProductFormRegister(product));
          }}
        >
          <Edit size={16} className="text-white"></Edit>
        </Button>
        <Button variant="destructive" size="icon" isLoading={isDeleting} onClick={() => setOpenDeleteDialog(true)}>
          <Trash size={16} className="text-white"></Trash>
        </Button>
      </div>
    </div>
  );
};
