import { createBrowserRouter } from 'react-router-dom';

import {
  ErrorPage,
  LoginPage,
  UnderDevPage,
  VerificationPage,
  SignupPageEmail,
  SignupPagePassword,
} from '../pages';

import { PrivateRoute } from './PrivateRoute';

import { App } from 'App';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <UnderDevPage />,
      },
      {
        path: '/payments',
        element: <UnderDevPage />,
      },
      {
        path: '/transfers',
        element: <UnderDevPage />,
      },
      {
        path: '/history',
        element: <UnderDevPage />,
      },
    ],
  },
  {
    path: '/signin',
    element: <LoginPage />,
  },
  {
    path: '/signup-start',
    element: <SignupPageEmail />,
  },
  {
    path: '/signup-end',
    element: <SignupPagePassword />,
  },
  {
    path: '/verification',
    element: <VerificationPage />,
  },
]);

export { routes };
