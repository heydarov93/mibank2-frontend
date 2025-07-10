import { lazy } from 'react';

export const BackOfficePage = lazy(() =>
  import('pages').then((module) => ({ default: module.BackOfficePage })),
);

export const EmployeeLoginPage = lazy(() =>
  import('pages').then((module) => ({
    default: module.EmployeeLoginPage,
  })),
);

export const VerifyEmployeeCodePage = lazy(() =>
  import('pages').then((module) => ({
    default: module.VerifyEmployeeCodePage,
  })),
);

export const BackOfficeVerificationPage = lazy(() =>
  import('pages').then((module) => ({
    default: module.BackOfficeVerificationPage,
  })),
);

export const CreateEmployeePage = lazy(() =>
  import('pages').then((module) => ({ default: module.CreateEmployeePage })),
);

export const ViewEmployeesPage = lazy(() =>
  import('pages').then((module) => ({
    default: module.ViewEmployeesPage,
  })),
);

export const ViewProductsPage = lazy(() =>
  import('pages').then((module) => ({
    default: module.ViewProductsPage,
  })),
);

export const ChooseProductFormWrapper = lazy(() =>
  import('components/organisms').then((module) => ({
    default: module.ChooseProductFormWrapper,
  })),
);

export const BackOfficeErrorPage = lazy(() =>
  import('pages').then((module) => ({ default: module.BackOfficeErrorPage })),
);

export const BackOfficeVerificationErrorPage = lazy(() =>
  import('pages').then((module) => ({
    default: module.BackOfficeVerificationErrorPage,
  })),
);
