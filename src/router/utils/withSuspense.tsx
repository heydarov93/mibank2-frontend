import { ComponentType, Suspense } from 'react';

import { LoadingSpinner } from 'components/atoms';

export const withSuspense = (Component: ComponentType) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);
