import { Edit, Plus, Trash } from 'lucide-react';
import invariant from 'tiny-invariant';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ProductIngredient } from '@/features/product/types/product-ingredient';
import { Button } from '@/components/ui/button';

export const EmptyProductIngredientsDroppable = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-gray-300 p-4">
      <h3>
        <Plus size={80} />
      </h3>
      <p className="text-lg font-bold uppercase text-center">Adicione os ingredientes do seu produto aqui</p>
    </div>
  );
};

type Props = {
  productIngredients: ProductIngredient[];
  handleRemoveIngredient: (ingredientId: string) => void;
  handleEditClick: (productIngredient: ProductIngredient) => void;
};

export const ProductIngredientsDroppable = ({ productIngredients, handleRemoveIngredient, handleEditClick }: Props) => {
  const columnRef = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const columnEl = columnRef.current;
    invariant(columnEl); // Ensure the column element exists

    // Set up the drop target for the column element
    return dropTargetForElements({
      element: columnEl,
      onDragStart: () => setIsDraggedOver(true),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
      getData: () => ({ columnId: '1' }),
      getIsSticky: () => true,
    });
  }, []);

  return (
    <div className="h-full w-full p-4 overflow-hidden">
      <h2 className="text-center font-bold text-2xl mb-2">Ingredientes</h2>
      <div
        className={cn(
          'h-full w-full flex flex-col justify-center items-center text-gray-300 border-4 border-dashed border-gray-300 rounded-md p-4 overflow-hidden',
          isDraggedOver ? 'bg-blue-300/50' : ''
        )}
        ref={columnRef}
      >
        {productIngredients.length ? (
          <div className="flex flex-wrap flex-col gap-4 w-full h-full overflow-y-auto">
            {productIngredients.map((ingredient) => (
              <div
                key={ingredient.product.documentId}
                className="p-2 rounded-md shadow-sm border border-gray-200 h-min w-full text-black flex items-center justify-between"
              >
                <span>{ingredient.product.name}</span>
                <span>{ingredient.quantity}x</span>
                <span>
                  {Intl.NumberFormat('pt-BR', {
                    currency: 'BRL',
                    style: 'currency',
                  }).format(ingredient.quantity * ingredient.product.price)}
                </span>
                <div className="flex gap-2">
                  <Button onClick={() => handleEditClick(ingredient)}>
                    <Edit></Edit>
                  </Button>
                  <Button
                    onClick={() =>
                      ingredient.product.documentId && handleRemoveIngredient(ingredient.product.documentId)
                    }
                  >
                    <Trash></Trash>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyProductIngredientsDroppable></EmptyProductIngredientsDroppable>
        )}
      </div>
    </div>
  );
};
