import { useGetUnitsQuery } from '@/features/auth/hooks/use-get-units.query';

import { SelectProps } from '@radix-ui/react-select';
import { SelectItem, SelectPaginatedContent, SelectTrigger, SelectValue } from './ui/select-paginated';
import { SelectPaginated } from './ui/select-paginated';

type UnitSelectProps = SelectProps & {
  onChange?: (value: string) => void;
};

export const UnitSelect = ({ ...props }: UnitSelectProps) => {
  // Example usage
  const { data, fetchNextPage, hasNextPage, isFetching } = useGetUnitsQuery();

  const items = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <SelectPaginated
      {...props}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      fetchNextPage={fetchNextPage}
      onValueChange={(value) => {
        props.onChange?.(value);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectPaginatedContent>
        {items.map((item) => (
          <SelectItem key={item.id} value={item.id.toString()}>
            {item.name}
          </SelectItem>
        ))}
      </SelectPaginatedContent>
    </SelectPaginated>
  );
};
