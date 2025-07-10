import { ReactNode } from 'react';

import { useAuthGuard } from './hooks/useAuthGuard';

import { BACK_OFFICE_EMPLOYEE_SIGN_IN } from 'constants/routesName';
import { getEmployeeAuthStatus } from 'utils/auth/storageAuthHandler';


interface BackOfficePrivateRouteProps {
  children: ReactNode;
}

export const BackOfficePrivateRoute = ({
  children,
}: BackOfficePrivateRouteProps) => {
  const shouldRedirect = useAuthGuard({
    authCheck: getEmployeeAuthStatus,
    redirectTo: BACK_OFFICE_EMPLOYEE_SIGN_IN,
  });

  if (shouldRedirect) {
    return shouldRedirect;
  }

  return <>{children}</>;
};
