import React from 'react';
import { PageContextProvider } from './usePageContext';
import type { PageContext } from './types';
import './PageShell.css';
import { Toaster } from '@/components/ui/toaster';

export { PageShell };

function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode;
  pageContext: PageContext;
}) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <div className="h-screen w-screen">{children}</div>
        <Toaster />
      </PageContextProvider>
    </React.StrictMode>
  );
}
