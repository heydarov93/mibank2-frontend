import { RouteObject } from 'react-router-dom';

import {
  TO_BACK_OFFICE_CREATE_EMPLOYEE,
  TO_BACK_OFFICE_CREATE_PRODUCT,
  TO_BACK_OFFICE_VIEW_EMPLOYEES,
  TO_BACK_OFFICE_VIEW_PRODUCTS,
} from 'constants/navigation/routePaths';
import {
  ViewEmployeesPage,
  ViewProductsPage,
  ChooseProductFormWrapper,
  CreateEmployeePage,
} from 'router/lazy/backOffice.lazy';
import { withSuspense } from 'router/utils/withSuspense';

export const protectedBackOfficeRoutes: RouteObject[] = [
  {
    path: TO_BACK_OFFICE_CREATE_EMPLOYEE,
    element: withSuspense(CreateEmployeePage),
  },
  {
    path: TO_BACK_OFFICE_VIEW_EMPLOYEES,
    element: withSuspense(ViewEmployeesPage),
  },
  {
    path: TO_BACK_OFFICE_CREATE_PRODUCT,
    element: withSuspense(ChooseProductFormWrapper),
  },
  {
    path: TO_BACK_OFFICE_VIEW_PRODUCTS,
    element: withSuspense(ViewProductsPage),
  },
];
