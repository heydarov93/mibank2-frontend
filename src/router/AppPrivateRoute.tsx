import { ReactNode } from 'react';

import { useAuthGuard } from './hooks/useAuthGuard';

import { TO_WELCOME } from 'constants/navigation/routePaths';
import { getAuthStatus } from 'utils/auth';

interface AppPrivateRouteProps {
  children: ReactNode;
}

export const AppPrivateRoute = ({ children }: AppPrivateRouteProps) => {
  const shouldRedirect = useAuthGuard({
    authCheck: getAuthStatus,
    redirectTo: TO_WELCOME,
  });

  if (shouldRedirect) {
    return shouldRedirect;
  }

  return <>{children}</>;
};
