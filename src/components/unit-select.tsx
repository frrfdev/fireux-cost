import { useGetUnitsQuery } from '@/features/auth/hooks/use-get-units.query';

import { SelectProps } from '@radix-ui/react-select';
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';

type UnitSelectProps = SelectProps;

export const UnitSelect = ({ ...props }: UnitSelectProps) => {
  const { data } = useGetUnitsQuery();
  console.log(data, 'data');

  return (
    <Select {...props}>
      <SelectTrigger className="">
        <SelectValue placeholder="Escolha uma unidade" />
      </SelectTrigger>
      <SelectContent>{}</SelectContent>
    </Select>
  );
};
