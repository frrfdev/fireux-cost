import React from 'react';
import { PageContextProvider } from './usePageContext';
import type { PageContext } from './types';
import './PageShell.css';
import { Toaster } from '@/components/ui/toaster';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorHandler } from '@/utils/error';
import { AxiosError } from 'axios';

export { PageShell };

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      ErrorHandler(error as AxiosError);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      ErrorHandler(error as AxiosError);
    },
  }),
});

function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <div className="h-screen w-screen">
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </div>
        <Toaster />
      </PageContextProvider>
    </React.StrictMode>
  );
}
