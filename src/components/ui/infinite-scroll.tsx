import { useIntersectionObserver } from '@/utils/use-intersection-observer';

export type InfiniteScrollProps = {
  children: React.ReactNode;
  loadMore: () => void;
  className?: string;
  isLoading: boolean;
  hasNextPage: boolean;
};

export const InfiniteScroll = ({ children, loadMore, className, isLoading, hasNextPage }: InfiniteScrollProps) => {
  const { loadMoreRef } = useIntersectionObserver({
    options: { threshold: 0.5 },
    callback: (e) => {
      if (e.isIntersecting && hasNextPage) {
        console.log('loadMore');
        loadMore();
      }
    },
  });

  return (
    <div className={className}>
      {children}
      {hasNextPage && (
        <div ref={loadMoreRef} className="h-10  w-full">
          <p className="w-full p-2 text-center">{isLoading ? 'Carregando...' : 'Carregar mais'}</p>
        </div>
      )}
    </div>
  );
};
