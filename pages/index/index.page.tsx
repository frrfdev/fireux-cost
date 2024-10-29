import { useCallback, useEffect, useState } from 'react';
import { LayoutPrivate } from '../layout-private';
import { ProductForm } from './components/product.form';
import { ProductList } from './components/product.list';
import { ProductIngredient } from '@/features/auth/types/product-ingredient';
import { ElementDragType } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import { BaseEventPayload } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import { Product } from '@/features/auth/types/product';
import { ProductIngredientConfigModal } from './components/product-ingredient-config.modal';

const products: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    priceUnitId: '1',
    price: 10,
  },
  {
    id: '2',
    name: 'Product 2',
    priceUnitId: '1',
    price: 10,
  },
];

export { Page };

function Page() {
  const [productIngredients, setProductIngredients] = useState<
    ProductIngredient[]
  >([]);
  const [availableProducts, setAvailableProducts] =
    useState<Product[]>(products);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [selectedProductIngredient, setSelectedProductIngredient] =
    useState<ProductIngredient | null>(null);

  const handleDrop = useCallback(
    ({ source, location }: BaseEventPayload<ElementDragType>) => {
      const destination = location.current.dropTargets.length;
      if (!destination) {
        return;
      }
      // Check if the source of the drag is a card to handle card-specific logic
      if (source.data.type === 'product') {
        // Retrieve the ID of the card being dragged
        const draggedProductId = source.data.productId;

        const draggedProduct = availableProducts.find(
          (product) => product.id === draggedProductId
        );
        if (draggedProduct) {
          console.log(draggedProduct, 'draggedProduct');
          const productIngredient = {
            ...draggedProduct,
            quantity: 1,
          };
          setProductIngredients([...productIngredients, productIngredient]);
          setSelectedProductIngredient(productIngredient);
          setConfigModalOpen(true);
          setAvailableProducts(
            availableProducts.filter(
              (product) => product.id !== draggedProductId
            )
          );
        }
      }
    },
    [availableProducts, productIngredients]
  );

  const handleRemoveIngredient = (ingredientId: string) => {
    const ingredient = products.find((p) => p.id === ingredientId);

    if (!ingredient) return;

    setAvailableProducts([...availableProducts, ingredient]);
    setProductIngredients(
      productIngredients.filter((p) => p.id !== ingredientId)
    );
  };

  useEffect(() => {
    // Only import and initialize drag-and-drop on the client side
    if (typeof window !== 'undefined') {
      import('@atlaskit/pragmatic-drag-and-drop/element/adapter').then(
        ({ monitorForElements }) => {
          return monitorForElements({
            onDrop: handleDrop,
          });
        }
      );
    }
  }, [handleDrop, availableProducts, productIngredients]);

  return (
    <LayoutPrivate>
      <div className="grid grid-cols-3 w-full h-full overflow-hidden">
        <ProductForm
          productIngredients={productIngredients}
          handleRemoveIngredient={handleRemoveIngredient}
          handleEditClick={(productIngredient) => {
            setSelectedProductIngredient(productIngredient);
            setConfigModalOpen(true);
          }}
        ></ProductForm>
        <ProductList products={availableProducts}></ProductList>
      </div>

      {selectedProductIngredient ? (
        <ProductIngredientConfigModal
          open={configModalOpen}
          onOpenChange={setConfigModalOpen}
          productIngredient={selectedProductIngredient}
          updateProductIngredient={(updatedProductIngredient) => {
            setSelectedProductIngredient(null);
            setProductIngredients(
              productIngredients.map((p) =>
                p.id === updatedProductIngredient.id
                  ? updatedProductIngredient
                  : p
              )
            );
          }}
        />
      ) : null}
    </LayoutPrivate>
  );
}
