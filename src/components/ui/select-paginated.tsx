'use client';

import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SelectPaginatedContextValue = {
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
};

const SelectPaginatedContext = React.createContext<
  SelectPaginatedContextValue | undefined
>(undefined);

const useSelectPaginated = () => {
  const context = React.useContext(SelectPaginatedContext);
  if (!context) {
    throw new Error(
      'useSelectPaginated must be used within SelectPaginatedProvider'
    );
  }
  return context;
};

interface SelectPaginatedProps extends React.ComponentProps<typeof Select> {
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
}

const SelectPaginated = React.forwardRef<
  React.ElementRef<typeof Select>,
  SelectPaginatedProps
>(({ children, hasNextPage, isFetching, fetchNextPage, ...props }, ref) => {
  return (
    <SelectPaginatedContext.Provider
      value={{ hasNextPage, isFetching, fetchNextPage }}
    >
      <Select {...props}>{children}</Select>
    </SelectPaginatedContext.Provider>
  );
});
SelectPaginated.displayName = 'SelectPaginated';

const SelectPaginatedContent = React.forwardRef<
  React.ElementRef<typeof SelectContent>,
  React.ComponentProps<typeof SelectContent>
>(({ children, ...props }, ref) => {
  const { ref: inViewRef, inView } = useInView();
  const { hasNextPage, isFetching, fetchNextPage } = useSelectPaginated();

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <SelectContent {...props} ref={ref}>
      {children}
      {hasNextPage && (
        <div
          ref={inViewRef}
          className="flex h-8 items-center justify-center text-sm text-muted-foreground"
        >
          {isFetching ? 'Carregando mais...' : 'Carregar mais'}
        </div>
      )}
    </SelectContent>
  );
});
SelectPaginatedContent.displayName = 'SelectPaginatedContent';

export {
  SelectPaginated,
  SelectPaginatedContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
};
