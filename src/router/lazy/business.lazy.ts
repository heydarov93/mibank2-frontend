import { lazy } from 'react';

export const BusinessSignUpPage = lazy(() =>
  import('pages').then((module) => ({ default: module.BusinessSignUpPage })),
);

export const BusinessLoginPage = lazy(() =>
  import('pages').then((module) => ({ default: module.BusinessLoginPage })),
);

export const BusinessCreatePasswordPage = lazy(() =>
  import('pages').then((module) => ({
    default: module.BusinessCreatePasswordPage,
  })),
);
