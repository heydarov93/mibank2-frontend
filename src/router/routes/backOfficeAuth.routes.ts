import { RouteObject } from 'react-router-dom';

import {
  BACK_OFFICE_EMPLOYEE_SIGN_IN,
  BACK_OFFICE_EMPLOYEE_VERIFY_CODE,
  TO_BACK_OFFICE_VERIFICATION,
} from 'constants/navigation/routePaths';
import {
  EmployeeLoginPage,
  BackOfficeVerificationErrorPage,
  BackOfficeVerificationPage,
  VerifyEmployeeCodePage,
} from 'router/lazy/backOffice.lazy';
import { withSuspense } from 'router/utils/withSuspense';

export const backOfficeAuthRoutes: RouteObject[] = [
  {
    path: BACK_OFFICE_EMPLOYEE_SIGN_IN,
    element: withSuspense(EmployeeLoginPage),
  },
  {
    path: BACK_OFFICE_EMPLOYEE_VERIFY_CODE,
    element: withSuspense(VerifyEmployeeCodePage),
  },
  {
    path: TO_BACK_OFFICE_VERIFICATION,
    element: withSuspense(BackOfficeVerificationPage),
    errorElement: withSuspense(BackOfficeVerificationErrorPage),
  },
];
