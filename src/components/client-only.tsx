export { ClientOnly };

import React from 'react';

type Props = {
  fallback: React.ReactNode;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
};

function ClientOnly(props: Props) {
  const [Component, setComponent] = React.useState<React.ReactNode>(
    () => props.fallback
  );

  React.useEffect(() => {
    setComponent(() => React.lazy(props.component));
  }, []);

  return (
    <React.Suspense fallback={props.fallback}>
      <Component />
    </React.Suspense>
  );
}
