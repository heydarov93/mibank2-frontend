import { RouteObject } from "react-router-dom";

import { TO_BUSINESS_CREATE_PASSWORD, TO_BUSINESS_LOG_IN, TO_BUSINESS_SIGN_UP } from "constants/routesName";
import { BusinessCreatePasswordPage, BusinessLoginPage, BusinessSignUpPage } from "router/lazy/business.lazy";
import { withSuspense } from "router/utils/withSuspense";

export const businessAuthRoutes: RouteObject[] = [
  {
    path: TO_BUSINESS_SIGN_UP,
    element: withSuspense(BusinessSignUpPage),
  },
  {
    path: TO_BUSINESS_LOG_IN,
    element: withSuspense(BusinessLoginPage),
  },
  {
    path: TO_BUSINESS_CREATE_PASSWORD,
    element: withSuspense(BusinessCreatePasswordPage),
  },
];
