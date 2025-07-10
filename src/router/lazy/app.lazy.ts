import { lazy } from 'react';

export const App = lazy(() =>
  import('App').then((module) => ({ default: module.App })),
);

export const HomePage = lazy(() =>
  import('pages').then((module) => ({ default: module.Homepage })),
);

export const TransfersPage = lazy(() =>
  import('pages').then((module) => ({ default: module.TransfersPage })),
);

export const TransactionsHistoryPage = lazy(() =>
  import('pages').then((module) => ({
    default: module.TransactionsHistoryPage,
  })),
);

export const DepositLearnMorePage = lazy(() =>
  import('pages').then((module) => ({ default: module.DepositLearnMorePage })),
);

export const UnderDevPage = lazy(() =>
  import('pages').then((module) => ({ default: module.UnderDevPage })),
);

export const ErrorPage = lazy(() =>
  import('pages').then((module) => ({ default: module.ErrorPage })),
);
