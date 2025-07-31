import { RouteObject } from 'react-router-dom';

import {
  TO_DEPOSITS,
  TO_HISTORY,
  TO_PAYMENTS,
  TO_TRANSFERS,
} from 'constants/navigation/routePaths';
import { MyDepositsPage } from 'pages/MyDepositsPage/MyDepositsPage';
import {
  HomePage,
  TransactionsHistoryPage,
  TransfersPage,
  UnderDevPage,
} from 'router/lazy/app.lazy';
import { withSuspense } from 'router/utils/withSuspense';

export const protectedAppRoutes: RouteObject[] = [
  {
    index: true,
    element: withSuspense(HomePage),
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
    path: TO_DEPOSITS,
    element: withSuspense(MyDepositsPage),
  },
];
