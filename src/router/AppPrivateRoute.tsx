import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { TO_WELCOME } from 'constants/routesName';
import { getAuthStatus } from 'utils/auth';

interface AppPrivateRouteProps {
  children: ReactNode;
}

export const AppPrivateRoute = ({ children }: AppPrivateRouteProps) => {
  const isAuthenticated = getAuthStatus();

  if (!isAuthenticated) {
    return <Navigate to={TO_WELCOME} replace />;
  }

  return <>{children}</>;
};
