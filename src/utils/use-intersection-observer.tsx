import { useEffect, useRef } from 'react';

type UseIntersectionObserverProps = {
  options: IntersectionObserverInit;
  callback: (entries: IntersectionObserverEntry) => void;
};

export const useIntersectionObserver = ({ options, callback }: UseIntersectionObserverProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      callback(entries[0]);
    }, options);
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [loadMoreRef, options, callback]);

  return { loadMoreRef };
};
