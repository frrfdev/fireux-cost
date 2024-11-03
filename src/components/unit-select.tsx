import { useGetUnitsQuery } from '@/features/auth/hooks/use-get-units.query';

import { SelectProps } from '@radix-ui/react-select';
import { SelectItem, SelectPaginatedContent, SelectTrigger, SelectValue } from './ui/select-paginated';
import { SelectPaginated } from './ui/select-paginated';
import { UNIT_CORRELATION } from '@/utils/unit';

type UnitSelectProps = SelectProps & {
  onChange?: (value: string) => void;
  correlation?: string;
};

export const UnitSelect = ({ ...props }: UnitSelectProps) => {
  // Example usage
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useGetUnitsQuery();

  const items = data?.pages.flatMap((page) => page.data) ?? [];

  const filteredItems =
    (props.correlation
      ? UNIT_CORRELATION.find((unit) => unit.includes(props.correlation ?? ''))
          ?.map((unit) => items.find((item) => item.acronym === unit))
          .filter((item) => !!item)
      : items) ?? [];

  return (
    <SelectPaginated
      {...props}
      hasNextPage={hasNextPage}
      isFetching={isFetching || isLoading}
      fetchNextPage={fetchNextPage}
      onValueChange={(value) => {
        props.onChange?.(value);
        props.onValueChange?.(value, items.find((item) => item.documentId === value) ?? null);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecione uma unidade" className="text-gray-400" />
      </SelectTrigger>
      <SelectPaginatedContent>
        {filteredItems.map((item) => (
          <SelectItem key={item.documentId} value={item.documentId}>
            {item.name}
          </SelectItem>
        ))}
      </SelectPaginatedContent>
    </SelectPaginated>
  );
};
