import { useForm, UseFormReturn } from 'react-hook-form';
import { ProductIngredientsDroppable } from './product-ingredients.droppable';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormLabel, FormItem, FormField, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UnitSelect } from '@/components/unit-select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useStoreProduct } from '@/features/product/hooks/use-store-product';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useProductStore } from '../stores/use-product-store';
import { useUpdateProduct } from '@/features/product/hooks/use-update-product';
import { ProductList } from './product.list';
import { useGetProductsInfinite } from '@/features/product/hooks/use-get-products';
import { ProductIngredientConfigModal } from './product-ingredient-config.modal';
import { useProductFormDragController } from '../hooks/use-product-form-drag-controller';
import { Product, ProductFormRegister, ProductPopulated } from '@/features/product/types/product';
import { ProductPriceCalcDialog } from './product-price-calc-dialog';
import { useJoyrideContext } from '@/providers/joyride-context';
import { useEffect } from 'react';

export const convertToProductFormRegister = (product: ProductPopulated): ProductFormRegister => {
  return {
    ...product,
    priceUnit: product.priceUnit?.documentId ?? '',
    ingredients: product.ingredients.map((i) => ({
      product: i.product.documentId ?? '',
      quantity: i.quantity,
    })),
  };
};

const convertToProduct = (product: ProductPopulated): Product => {
  return {
    ...product,
    priceUnit: product.priceUnit.documentId ?? '',
    ingredients: product.ingredients.map((i) => ({
      product: convertToProduct(i.product),
      quantity: i.quantity,
    })),
  };
};

const productFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome do produto deve ter pelo menos 3 caracteres' }),
  priceUnit: z.string(),
  price: z.coerce.number(),
  manualPrice: z.boolean(),
  ingredients: z.array(
    z.object({
      product: z.object({
        documentId: z.string().optional(),
        name: z.string(),
        priceUnit: z.string(),
        price: z.number(),
        manualPrice: z.boolean().optional(),
        ingredients: z.array(z.any()),
      }),
      quantity: z.number(),
    })
  ),
});

const INITIAL_VALUES = {
  name: '',
  priceUnit: '',
  price: 0,
  manualPrice: false,
  ingredients: [],
};

export const ProductForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: INITIAL_VALUES,
  });

  const setProductEditing = useProductStore((state) => state.setEditProduct);
  const productEditing = useProductStore((state) => state.editProduct);
  const selectedProductIngredient = useProductStore((state) => state.selectedProductIngredient);
  const setSelectedProductIngredient = useProductStore((state) => state.setSelectedProductIngredient);
  const setConfigModalOpen = useProductStore((state) => state.setConfigModalOpen);
  const configModalOpen = useProductStore((state) => state.configModalOpen);
  const selectedUnit = useProductStore((state) => state.selectedUnit);
  const setSelectedUnit = useProductStore((state) => state.setSelectedUnit);
  const priceCalcDialogOpen = useProductStore((state) => state.priceCalcDialogOpen);
  const setPriceCalcDialogOpen = useProductStore((state) => state.setPriceCalcDialogOpen);
  const search = useProductStore((state) => state.search);

  const ingredients = form.watch('ingredients');

  const { mutateAsync: storeProduct, isPending } = useStoreProduct();
  const { mutateAsync: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const {
    data: products,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useGetProductsInfinite({
    pagination: {
      pageSize: 25,
    },
    filters: {
      name: search,
    },
  });

  const isManualPrice = form.watch('manualPrice');

  function handleCancel() {
    setProductEditing(null);
    form.reset(INITIAL_VALUES);
  }

  function handleRemoveIngredient(ingredientId: string) {
    const ingredient = products?.pages
      .flat()
      .map((page) => page.data)
      .flat()
      .find((p) => p.documentId === ingredientId);

    if (!ingredient) return;

    form.setValue(
      'ingredients',
      ingredients.filter((p) => p.product.documentId !== ingredientId)
    );
  }

  function handlePriceCalculate(price: number) {
    form.setValue('price', price);
    setPriceCalcDialogOpen(false);
  }

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    if (productEditing) {
      return await updateProduct(
        {
          documentId: productEditing.documentId ?? '',
          product: {
            ...values,
            ingredients: values.ingredients.map((i) => ({
              product: i.product.documentId ?? '',
              quantity: i.quantity,
            })),
          },
        },
        {
          onSuccess: () => {
            form.reset(INITIAL_VALUES);
            toast({
              title: 'Successo 😃',
              description: 'O produto foi atualizado com sucesso',
            });
            queryClient.invalidateQueries({ queryKey: ['products'] });
            setProductEditing(null);
            setSelectedUnit(null);
            form.setFocus('name');
          },
        }
      );
    }
    await storeProduct(
      {
        ...values,
        ingredients: values.ingredients.map((i) => ({
          product: i.product.documentId ?? '',
          quantity: i.quantity,
        })),
      },
      {
        onSuccess: () => {
          form.setFocus('name', { shouldSelect: true });
          form.reset(INITIAL_VALUES);
          toast({
            title: 'Successo 😃',
            description: 'O produto foi adicionado com sucesso',
          });
          queryClient.invalidateQueries({ queryKey: ['products'] });
          setSelectedUnit(null);
        },
      }
    );
  }

  useProductFormDragController({
    products:
      products?.pages
        .flat()
        .map((page) => page.data)
        .flat()
        .map((p) => ({
          ...p,
          priceUnit: p.priceUnit.documentId ?? '',
          ingredients: p.ingredients.map((i) => ({
            product: convertToProduct(i.product),
            quantity: i.quantity,
          })),
        })) ?? [],
    form: form as UseFormReturn<Product>,
  });

  useProductStore.subscribe(
    (state) => state.editProduct,
    (product) => {
      if (product) {
        form.reset({
          ...product,
          priceUnit: product.priceUnit.documentId ?? '',
          ingredients: product.ingredients.map((i) => ({
            product: convertToProductFormRegister(i.product),
            quantity: i.quantity,
          })),
        });
        setSelectedUnit(product.priceUnit);
      } else form.reset(INITIAL_VALUES);
    }
  );

  // #region JOYRIDE ------------------------------------------------------
  const { stepIndex, setStepIndex } = useJoyrideContext();

  useProductStore.subscribe(
    (state) => state.selectedUnit,
    (selectedUnit) => {
      if (selectedUnit) {
        setStepIndex(stepIndex + 1);
      }
    }
  );

  useEffect(() => {
    if (isManualPrice && stepIndex === 4) {
      setStepIndex(stepIndex + 1);
    }
  }, [isManualPrice, stepIndex]);
  // #endregion ------------------------------------------------------

  return (
    <div className="grid grid-cols-3 w-full h-full overflow-hidden">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 h-full shadow-lg p-4  product-form">
          <h1 className="text-2xl font-bold">{productEditing ? 'Editar' : 'Novo'} Produto</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="product-form-name">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome do produto"
                    {...field}
                    onBlur={() => {
                      if (stepIndex === 1) {
                        setStepIndex(stepIndex + 1);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceUnit"
            render={({ field }) => (
              <FormItem className="product-form-unit">
                <FormLabel>Unidade de Base de Cálculo</FormLabel>
                <FormControl>
                  <UnitSelect
                    {...field}
                    onValueChange={(_, option) => {
                      setSelectedUnit(option);
                      form.setValue('price', 0);
                    }}
                    onOpenChange={(open) => {
                      if (open && stepIndex === 2) {
                        setStepIndex(stepIndex + 1);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {selectedUnit ? (
            <>
              <Separator className="space-y-4"></Separator>
              <FormField
                control={form.control}
                name="manualPrice"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2 text-sm product-form-manual-price">
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                      <span>Definir Custo Por {selectedUnit?.name}?</span>
                    </div>
                  </FormItem>
                )}
              />
            </>
          ) : null}
          {isManualPrice ? (
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço por Unidade (R$)</FormLabel>
                  <button
                    type="button"
                    onClick={() => {
                      setPriceCalcDialogOpen(true);
                      if (stepIndex === 5) {
                        setStepIndex(stepIndex + 1);
                      }
                    }}
                    role="button"
                    className="product-form-price-calc text-xs underline cursor-pointer animate-pulse text-gray-500 user-select-none w-full text-start"
                  >
                    Eu não sei o custo, me ajude a calcular
                  </button>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
        </form>
      </Form>
      <div className="h-full w-full flex flex-col overflow-y-hidden">
        <ProductIngredientsDroppable
          handleEditClick={(product) => {
            setSelectedProductIngredient(product);
            setConfigModalOpen(true);
          }}
          handleRemoveIngredient={handleRemoveIngredient}
          productIngredients={ingredients}
        ></ProductIngredientsDroppable>
        {!isManualPrice ? (
          <div className="p-4 flex justify-between items-center">
            <strong>Total:</strong>
            <span>{`${Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(
              ingredients.reduce((acc, ingredient) => acc + ingredient.product.price * ingredient.quantity, 0)
            )}/${selectedUnit?.acronym ?? 'N.I'}`}</span>
          </div>
        ) : null}
        <div className="p-4 flex flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            isLoading={isPending || isUpdating}
            onClick={form.handleSubmit(onSubmit)}
            disabled={!selectedUnit}
            title={!selectedUnit ? 'Você precisa escolher uma unidade de base de cálculo' : ''}
          >
            {!selectedUnit
              ? 'Você precisa escolher uma unidade de base de cálculo'
              : productEditing
              ? 'Editar'
              : 'Criar'}
          </Button>
          <Button type="button" className="w-full" variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
        </div>
      </div>
      <ProductList
        isLoading={isFetching}
        hasNextPage={hasNextPage}
        loadMore={fetchNextPage}
        products={
          products?.pages
            .flat()
            .map((page) => page.data)
            .flat()
            .filter((p) => !ingredients.find((i) => i.product.documentId === p.documentId)) ?? []
        }
      ></ProductList>
      {selectedUnit ? (
        <ProductPriceCalcDialog
          open={priceCalcDialogOpen}
          onOpenChange={setPriceCalcDialogOpen}
          onCalculate={handlePriceCalculate}
          targetUnit={selectedUnit}
        ></ProductPriceCalcDialog>
      ) : null}
      {selectedProductIngredient ? (
        <ProductIngredientConfigModal
          open={configModalOpen}
          onOpenChange={setConfigModalOpen}
          productIngredient={selectedProductIngredient}
          updateProductIngredient={(updatedProductIngredient) => {
            setSelectedProductIngredient(null);
            form.setValue(
              'ingredients',
              ingredients.map((p) =>
                p.product.documentId === updatedProductIngredient.product.documentId ? updatedProductIngredient : p
              )
            );
          }}
        />
      ) : null}
    </div>
  );
};
