import { lazy } from 'react';

export const BackOffice = lazy(() =>
  import('pages').then((module) => ({ default: module.BackOffice })),
);

export const BackOfficeEmployeeLoginPage = lazy(() =>
  import('pages').then((module) => ({
    default: module.BackOfficeEmployeeLoginPage,
  })),
);

export const BackOfficeVerifyEmployeeCode = lazy(() =>
  import('pages').then((module) => ({
    default: module.BackOfficeVerifyEmployeeCode,
  })),
);

export const BackOfficeVerificationPage = lazy(() =>
  import('pages').then((module) => ({
    default: module.BackOfficeVerificationPage,
  })),
);

export const CreateEmployee = lazy(() =>
  import('pages').then((module) => ({ default: module.CreateEmployee })),
);

export const BackOfficeViewEmployees = lazy(() =>
  import('pages').then((module) => ({
    default: module.BackOfficeViewEmployees,
  })),
);

export const BackOfficeViewProductsPage = lazy(() =>
  import('pages').then((module) => ({
    default: module.BackOfficeViewProductsPage,
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
