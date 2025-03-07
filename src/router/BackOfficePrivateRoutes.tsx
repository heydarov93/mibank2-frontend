import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { BACK_OFFICE_EMPLOYEE_SIGN_IN } from 'constants/routesName';
import { getEmployeeAuthStatus } from 'utils/storageAuthHandler';

interface BackOfficePrivateRoutesProps {
  children: ReactNode;
}

const BackOfficePrivateRoutes = ({
  children,
}: BackOfficePrivateRoutesProps) => {
  const isAuthenticated = getEmployeeAuthStatus();

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={BACK_OFFICE_EMPLOYEE_SIGN_IN} />
  );
};

export default BackOfficePrivateRoutes;
