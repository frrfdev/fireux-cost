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

const convertToFormRegister = (product: ProductPopulated) => {
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
      await updateProduct(values, {
        onSuccess: () => {
          form.reset(INITIAL_VALUES);
          toast({
            title: 'Successo 😃',
            description: 'O produto foi atualizado com sucesso',
          });
          queryClient.invalidateQueries({ queryKey: ['products'] });
          setProductEditing(null);
        },
      });
    }
    await storeProduct(values, {
      onSuccess: () => {
        form.reset(INITIAL_VALUES);
        toast({
          title: 'Successo 😃',
          description: 'O produto foi adicionado com sucesso',
        });
        queryClient.invalidateQueries({ queryKey: ['products'] });
      },
    });
  }

  useProductFormDragController({
    products: products?.data.map(convertToFormRegister) ?? [],
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
                  <UnitSelect {...field} />
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
                  <span>Definir Preço Por Unidade?</span>
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
                  <FormLabel>Preço por Unidade</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          <Button type="submit" className="w-full" isLoading={isPending || isUpdating}>
            {productEditing ? 'Editar' : 'Criar'}
          </Button>
          <Button type="button" className="w-full" variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
        </form>
      </Form>
      <ProductIngredientsDroppable
        handleEditClick={(product) => {
          setSelectedProductIngredient(product);
          setConfigModalOpen(true);
        }}
        handleRemoveIngredient={handleRemoveIngredient}
        productIngredients={ingredients}
      ></ProductIngredientsDroppable>
      <ProductList products={products?.data.map(convertToFormRegister) ?? []}></ProductList>
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
