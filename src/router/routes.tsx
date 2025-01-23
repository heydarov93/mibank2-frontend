import { createBrowserRouter } from 'react-router-dom';

import {
  TO_HOME,
  TO_PAYMENTS,
  TO_TRANSFERS,
  TO_HISTORY,
  TO_SIGN_IN,
  TO_SIGN_UP_START,
  TO_SIGN_UP_END,
  TO_SIGN_UP_FINISHED,
  TO_VERIFICATION,
  TO_REGISTRATION,
  TO_CREATE_FORGOT_PASSWORD,
  TO_CREATE_FORGOT_PASSWORD_FINISHED,
  TO_FORGOT_PASSWORD,
  BACK_OFFICE_CREATE_EMPLOYEE,
  TO_BACK_OFFICE_VERIFICATION,
} from '../constants/routesName';
import {
  ErrorPage,
  LoginPage,
  UnderDevPage,
  VerificationPage,
  SignupPageEmail,
  SignupPagePassword,
  RegistrationPage,
  SignupPageFinish,
  CreateFogotPasswordPage,
  ForgotPasswordPageFinished,
  ForgotPasswordPage,
  BackOfficeVerificationPage,
} from '../pages';

import { PrivateRoute } from './PrivateRoute';

import { App } from 'App';
import BackOffice from 'pages/BackOffice/BackOffice';
import BackOfficeVerificationErrorPage from 'pages/BackOfficeVerificationErrorPage/BackOfficeVerificationErrorPage';

const routes = createBrowserRouter([
  {
    path: TO_HOME,
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
        path: TO_PAYMENTS,
        element: <UnderDevPage />,
      },
      {
        path: TO_TRANSFERS,
        element: <UnderDevPage />,
      },
      {
        path: TO_HISTORY,
        element: <UnderDevPage />,
      },
    ],
  },
  {
    path: TO_SIGN_IN,
    element: <LoginPage />,
  },
  {
    path: TO_SIGN_UP_START,
    element: <SignupPageEmail />,
  },
  {
    path: TO_SIGN_UP_END,
    element: <SignupPagePassword />,
  },
  {
    path: TO_SIGN_UP_FINISHED,
    element: <SignupPageFinish />,
  },
  {
    path: TO_VERIFICATION,
    element: <VerificationPage />,
  },
  {
    path: TO_REGISTRATION,
    element: <RegistrationPage />,
  },
  {
    path: TO_CREATE_FORGOT_PASSWORD,
    element: <CreateFogotPasswordPage />,
  },
  {
    path: TO_CREATE_FORGOT_PASSWORD_FINISHED,
    element: <ForgotPasswordPageFinished />,
  },
  {
    path: TO_FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: BACK_OFFICE_CREATE_EMPLOYEE,
    element: <BackOffice />,
  },
  {
    path: TO_BACK_OFFICE_VERIFICATION,
    element: <BackOfficeVerificationPage />,
    errorElement: <BackOfficeVerificationErrorPage />,
  },
]);

export { routes };
