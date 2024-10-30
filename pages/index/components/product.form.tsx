import { useForm } from 'react-hook-form';
import { ProductIngredientsDroppable } from './product-ingredients.droppable';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormLabel, FormItem, FormField, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductIngredient } from '@/features/auth/types/product-ingredient';
import { UnitSelect } from '@/components/unit-select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useStoreProduct } from '@/features/product/hooks/use-store-product';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
  name: z.string(),
  priceUnitId: z.string(),
  price: z.coerce.number(),
  manualPrice: z.boolean(),
});

type Props = {
  productIngredients: ProductIngredient[];
  handleRemoveIngredient: (ingredientId: string) => void;
  handleEditClick: (productIngredient: ProductIngredient) => void;
  onSuccess?: () => void;
};

export const ProductForm = ({ productIngredients, handleRemoveIngredient, handleEditClick, onSuccess }: Props) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      priceUnitId: '',
      price: 0,
      manualPrice: false,
    },
  });

  const { mutateAsync: storeProduct, isPending } = useStoreProduct();

  const isManualPrice = form.watch('manualPrice');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await storeProduct(values, {
      onSuccess: () => {
        form.reset();
        toast({
          title: 'Successo 😃',
          description: 'O produto foi adicionado com sucesso',
        });
        queryClient.invalidateQueries({ queryKey: ['products'] });
        onSuccess?.();
      },
    });
  }

  return (
    <div className="grid grid-cols-2 col-span-2 h-full overflow-hidden relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 h-full shadow-lg p-4">
          <h1 className="text-2xl font-bold">Novo Produto</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceUnitId"
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
          <Button type="submit" className="w-full" isLoading={isPending}>
            Criar
          </Button>
        </form>
      </Form>
      <ProductIngredientsDroppable
        handleRemoveIngredient={handleRemoveIngredient}
        handleEditClick={handleEditClick}
        productIngredients={productIngredients}
      ></ProductIngredientsDroppable>
    </div>
  );
};
