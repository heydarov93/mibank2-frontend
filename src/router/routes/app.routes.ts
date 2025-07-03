import { RouteObject } from 'react-router-dom';


import {
  TO_DEPOSIT_LEARN_MORE,
  TO_HISTORY,
  TO_PAYMENTS,
  TO_TRANSFERS,
} from 'constants/routesName';
import { DepositLearnMorePage, Homepage, TransactionsHistoryPage, TransfersPage, UnderDevPage } from 'router/lazy/app.lazy';
import { withSuspense } from 'router/utils/withSuspense';

export const protectedAppRoutes: RouteObject[] = [
  {
    index: true,
    element: withSuspense(Homepage),
  },
  {
    path: TO_PAYMENTS,
    element: withSuspense(UnderDevPage),
  },
  {
    path: TO_TRANSFERS,
    element: withSuspense(TransfersPage),
  },
  {
    path: TO_HISTORY,
    element: withSuspense(TransactionsHistoryPage),
  },
  {
    path: TO_DEPOSIT_LEARN_MORE,
    element: withSuspense(DepositLearnMorePage),
  },
];
