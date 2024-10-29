import { useForm } from 'react-hook-form';
import { ProductIngredientsDroppable } from './product-ingredients.droppable';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductIngredient } from '@/features/auth/types/product-ingredient';
import { UnitSelect } from '@/components/unit-select';

const formSchema = z.object({
  name: z.string(),
  priceUnitId: z.string(),
  price: z.number(),
});

type Props = {
  productIngredients: ProductIngredient[];
  handleRemoveIngredient: (ingredientId: string) => void;
  handleEditClick: (productIngredient: ProductIngredient) => void;
};

export const ProductForm = ({
  productIngredients,
  handleRemoveIngredient,
  handleEditClick,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      priceUnitId: '',
      price: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="grid grid-cols-2 col-span-2 h-full overflow-hidden relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 h-full shadow-lg p-4"
        >
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
          <Button type="submit" className="w-full">
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
