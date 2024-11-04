import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UnitSelect } from '@/components/unit-select';
import { Input } from '@/components/ui/input';
import { UnitPriceConversor } from '@/utils/unit';
import { Unit } from '@/features/unit/types/Unit';
import { useJoyrideContext } from '@/providers/joyride-context';

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

export function ProductPriceCalcDialog({
  open,
  onOpenChange,
  onCalculate,
  targetUnit,
}: ProductPriceCalcDialogProps) {
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
    const price = UnitPriceConversor(
      values.unit,
      targetUnit,
      values.quantity,
      values.price
    );
    onCalculate(price ?? 0);
    form.reset();
  }

  // #region JOYRIDE ------------------------------------------------------
  const { stepIndex, setStepIndex } = useJoyrideContext();
  // #endregion ------------------------------------------------------

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={stepIndex <= 0}>
      <DialogContent
        className="sm:max-w-[425px] price-calc-form"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (stepIndex > 0) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Calcule o preço por {targetUnit.name}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 "
            autoFocus={false}
          >
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="price-calc-form-quantity">
                  <FormLabel>Quantidade de produtos comprados</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onBlur={() => {
                        if (stepIndex === 6 && form.getValues('quantity') > 0) {
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
              name="unitId"
              render={({ field }) => (
                <FormItem className="price-calc-form-unit">
                  <FormLabel>Qual foi o tipo de unidade de compra?</FormLabel>
                  <FormControl>
                    <UnitSelect
                      {...field}
                      correlation={targetUnit.acronym}
                      onOpenChange={(open) => {
                        if (open && stepIndex === 7) {
                          setStepIndex(stepIndex + 1);
                        }
                      }}
                      onValueChange={(_, option) => {
                        if (!option) return;
                        form.setValue('unit', option);
                        if (stepIndex === 8) {
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
              name="price"
              render={({ field }) => (
                <FormItem className="price-calc-form-price">
                  <FormLabel>Qual foi o preço total do produto?</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onBlur={() => {
                        if (stepIndex === 9) {
                          setStepIndex(stepIndex + 1);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                className="price-calc-form-submit"
                onClick={() => {
                  if (stepIndex === 10) {
                    setStepIndex(stepIndex + 1);
                  }
                }}
              >
                Calculate
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
