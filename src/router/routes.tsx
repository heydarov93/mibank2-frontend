import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { AppPrivateRoute } from './AppPrivateRoute';
import { BackOfficePrivateRoute } from './BackOfficePrivateRoute';
import { App, ErrorPage } from './lazy/app.lazy';
import { BackOfficePage, BackOfficeErrorPage } from './lazy/backOffice.lazy';
import { protectedAppRoutes } from './routes/app.routes';
import { authRoutes } from './routes/appAuth.routes';
import { protectedBackOfficeRoutes } from './routes/backOffice.routes';
import { backOfficeAuthRoutes } from './routes/backOfficeAuth.routes';
import { businessAuthRoutes } from './routes/businessAuth.routes';
import { withSuspense } from './utils/withSuspense';

import { LoadingSpinner } from 'components/atoms';
import { TO_BACK_OFFICE, TO_HOME } from 'constants/navigation/routePaths';

export const routes = createBrowserRouter([
  {
    path: TO_HOME,
    element: (
      <AppPrivateRoute>
        <Suspense fallback={<LoadingSpinner />}>
          <App />
        </Suspense>
      </AppPrivateRoute>
    ),
    errorElement: withSuspense(ErrorPage),
    children: protectedAppRoutes,
  },

  {
    path: TO_BACK_OFFICE,
    element: (
      <BackOfficePrivateRoute>
        <Suspense fallback={<LoadingSpinner />}>
          <BackOfficePage />
        </Suspense>
      </BackOfficePrivateRoute>
    ),
    errorElement: withSuspense(BackOfficeErrorPage),
    children: protectedBackOfficeRoutes,
  },

  ...authRoutes,
  ...businessAuthRoutes,
  ...backOfficeAuthRoutes,
]);
