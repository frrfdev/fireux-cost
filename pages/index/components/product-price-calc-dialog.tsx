import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UnitSelect } from '@/components/unit-select';
import { Input } from '@/components/ui/input';
import { UnitPriceConversor } from '@/utils/unit';
import { Unit } from '@/features/unit/types/Unit';

const formSchema = z.object({
  price: z.coerce.number(),
  quantity: z.coerce.number(),
  unitId: z.string(),
  unit: z
    .object({
      documentId: z.string(),
      name: z.string(),
      acronym: z.string(),
    })
    .nullable(),
});

type ProductPriceCalcDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetUnit: Unit;
  onCalculate: (price: number) => void;
};

export function ProductPriceCalcDialog({ open, onOpenChange, onCalculate, targetUnit }: ProductPriceCalcDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 0,
      quantity: 0,
      unitId: '',
      unit: null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.unit || !values.unitId) return;
    const price = UnitPriceConversor(values.unit, targetUnit, values.quantity, values.price);
    onCalculate(price ?? 0);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Calcule o preço por {targetUnit.name}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade de produtos comprados</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unitId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qual foi o tipo de unidade de compra?</FormLabel>
                  <FormControl>
                    <UnitSelect
                      {...field}
                      correlation={targetUnit.acronym}
                      onValueChange={(_, option) => form.setValue('unit', option)}
                    />
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
                  <FormLabel>Qual foi o preço total do produto?</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Calculate</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
