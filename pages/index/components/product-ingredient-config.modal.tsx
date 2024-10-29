import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ProductIngredient } from '@/features/auth/types/product-ingredient';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
interface ProductIngredientConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productIngredient: ProductIngredient;
  updateProductIngredient: (updatedIngredient: ProductIngredient) => void;
}

const formSchema = z.object({
  quantity: z.number().min(0, 'Quantity must be a positive number'),
});

export const ProductIngredientConfigModal = ({
  open,
  onOpenChange,
  productIngredient,
  updateProductIngredient,
}: ProductIngredientConfigModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: productIngredient.quantity,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateProductIngredient({
      ...productIngredient,
      quantity: values.quantity,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure {productIngredient.name}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save changes</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
