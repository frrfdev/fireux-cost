import { useGetUnitsQuery } from '@/features/auth/hooks/use-get-units.query';

import { SelectProps } from '@radix-ui/react-select';
import { SelectItem, SelectPaginatedContent, SelectTrigger, SelectValue } from './ui/select-paginated';
import { SelectPaginated } from './ui/select-paginated';

type UnitSelectProps = SelectProps & {
  onChange?: (value: string) => void;
};

export const UnitSelect = ({ ...props }: UnitSelectProps) => {
  // Example usage
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useGetUnitsQuery();

  const items = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <SelectPaginated
      {...props}
      hasNextPage={hasNextPage}
      isFetching={isFetching || isLoading}
      fetchNextPage={fetchNextPage}
      onValueChange={(value) => {
        props.onChange?.(value);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecione uma unidade" className="text-gray-400" />
      </SelectTrigger>
      <SelectPaginatedContent>
        {items.map((item) => (
          <SelectItem key={item.documentId} value={item.documentId}>
            {item.name}
          </SelectItem>
        ))}
      </SelectPaginatedContent>
    </SelectPaginated>
  );
};
