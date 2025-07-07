import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { BACK_OFFICE_EMPLOYEE_SIGN_IN } from 'constants/routesName';
import { getEmployeeAuthStatus } from 'utils/auth/storageAuthHandler';

interface BackOfficePrivateRouteProps {
  children: ReactNode;
}

export const BackOfficePrivateRoute = ({
  children,
}: BackOfficePrivateRouteProps) => {
  const isAuthenticated = getEmployeeAuthStatus();

  if (!isAuthenticated) {
    return <Navigate to={BACK_OFFICE_EMPLOYEE_SIGN_IN} replace />;
  }

  return <>{children}</>;
};
