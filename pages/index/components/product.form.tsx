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
import { useGetProducts } from '@/features/product/hooks/use-get-products';
import { ProductIngredientConfigModal } from './product-ingredient-config.modal';
import { useProductFormDragController } from '../hooks/use-product-form-drag-controller';
import { Product, ProductPopulated } from '@/features/product/types/product';

export const convertToProductFormRegister = (product: ProductPopulated) => {
  return {
    ...product,
    priceUnit: product.priceUnit?.documentId ?? '',
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

  const ingredients = form.watch('ingredients');

  const { mutateAsync: storeProduct, isPending } = useStoreProduct();
  const { mutateAsync: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { data: products } = useGetProducts();

  const isManualPrice = form.watch('manualPrice');

  function handleCancel() {
    setProductEditing(null);
    form.reset(INITIAL_VALUES);
  }

  function handleRemoveIngredient(ingredientId: string) {
    const ingredient = products?.data?.find((p) => p.documentId === ingredientId);

    if (!ingredient) return;

    form.setValue(
      'ingredients',
      ingredients.filter((p) => p.product.documentId !== ingredientId)
    );
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
          form.reset(INITIAL_VALUES);
          toast({
            title: 'Successo 😃',
            description: 'O produto foi adicionado com sucesso',
          });
          queryClient.invalidateQueries({ queryKey: ['products'] });
        },
      }
    );
  }

  useProductFormDragController({
    products: products?.data.map(convertToProductFormRegister) ?? [],
    form: form as UseFormReturn<Product>,
  });

  useProductStore.subscribe(
    (state) => state.editProduct,
    (product) => {
      if (product)
        form.reset({
          ...product,
          priceUnit: product.priceUnit ?? '',
        });
      else form.reset(INITIAL_VALUES);
    }
  );

  return (
    <div className="grid grid-cols-3 w-full h-full overflow-hidden">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 h-full shadow-lg p-4">
          <h1 className="text-2xl font-bold">{productEditing ? 'Editar' : 'Novo'} Produto</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidade de Base de Cálculo</FormLabel>
                <FormControl>
                  <UnitSelect {...field} onValueChange={(_, option) => setSelectedUnit(option)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="space-y-4"></Separator>
          <FormField
            control={form.control}
            name="manualPrice"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 text-sm">
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                  {selectedUnit ? (
                    <span>Definir Preço Por {selectedUnit?.name}?</span>
                  ) : (
                    <span className="text-red-500">Você precisa escolher uma unidade</span>
                  )}
                </div>
              </FormItem>
            )}
          />
          {isManualPrice ? (
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço por Unidade (R$)</FormLabel>
                  <p role="button" className="text-xs underline cursor-pointer animate-pulse text-gray-500">
                    Eu não sei o preço, me ajude a calcular
                  </p>
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
          >
            {productEditing ? 'Editar' : 'Criar'}
          </Button>
          <Button type="button" className="w-full" variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
        </div>
      </div>
      <ProductList products={products?.data ?? []}></ProductList>
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
