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
  BACK_OFFICE_EMPLOYEE_SIGN_IN,
  TO_BACK_OFFICE_VERIFICATION,
  TO_BACK_OFFICE,
  TO_BACK_OFFICE_CREATE_PRODUCT,
  TO_BACK_OFFICE_CREATE_EMPLOYEE,
  TO_BACK_OFFICE_VIEW_PRODUCTS,
  BACK_OFFICE_EMPLOYEE_VERIFY_CODE,
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
  BackOfficeEmployeeLoginPage,
  BackOfficeVerificationPage,
} from '../pages';

import { PrivateRoute } from './PrivateRoute';

import { App } from 'App';
import ChooseProductFormWrapper from 'components/organisms/ChooseProductFormWrapper/ChooseProductFormWrapper';
import BackOffice from 'pages/BackOffice/BackOffice';
import BackOfficeVerifyEmployeeCode from 'pages/BackOffice/BackOfficeVerifyEmployeeCode/BackOfficeVerifyEmployeeCode';
import CreateEmployee from 'pages/BackOffice/CreateEmployee';
import BackOfficeVerificationErrorPage from 'pages/BackOfficeVerificationErrorPage/BackOfficeVerificationErrorPage';
import BackOfficeViewProductsPage from 'pages/BackOfficeViewProductsPage/BackOfficeViewProductsPage';
import Homepage from 'pages/Homepage/Homepage';

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
        element: <Homepage />,
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
    path: BACK_OFFICE_EMPLOYEE_SIGN_IN,
    element: <BackOfficeEmployeeLoginPage />,
  },
  {
    path: BACK_OFFICE_EMPLOYEE_VERIFY_CODE,
    element: <BackOfficeVerifyEmployeeCode />,
  },
  {
    path: TO_BACK_OFFICE_VERIFICATION,
    element: <BackOfficeVerificationPage />,
    errorElement: <BackOfficeVerificationErrorPage />,
  },
  {
    path: TO_BACK_OFFICE,
    element: <BackOffice />,
    children: [
      {
        path: TO_BACK_OFFICE_CREATE_EMPLOYEE,
        element: <CreateEmployee />,
      },
      {
        path: TO_BACK_OFFICE_CREATE_PRODUCT,
        element: <ChooseProductFormWrapper />,
      },
      {
        path: TO_BACK_OFFICE_VIEW_PRODUCTS,
        element: <BackOfficeViewProductsPage />,
      },
    ],
  },
]);

export { routes };
