import { createBrowserRouter } from 'react-router-dom';

import {
  BACK_OFFICE_EMPLOYEE_SIGN_IN,
  BACK_OFFICE_EMPLOYEE_VERIFY_CODE,
  TO_BACK_OFFICE,
  TO_BACK_OFFICE_CREATE_EMPLOYEE,
  TO_BACK_OFFICE_CREATE_PRODUCT,
  TO_BACK_OFFICE_VERIFICATION,
  TO_BACK_OFFICE_VIEW_EMPLOYEES,
  TO_BACK_OFFICE_VIEW_PRODUCTS,
  TO_BUSINESS_CREATE_PASSWORD,
  TO_BUSINESS_LOG_IN,
  TO_BUSINESS_SIGN_UP,
  TO_CREATE_FORGOT_PASSWORD,
  TO_CREATE_FORGOT_PASSWORD_FINISHED,
  TO_CREATE_PASSWORD,
  TO_DEPOSIT_LEARN_MORE,
  TO_FORGOT_PASSWORD,
  TO_HISTORY,
  TO_HOME,
  TO_LEGAL_ENTITY_VERIFICATION,
  TO_PAYMENTS,
  TO_REGISTRATION,
  TO_SIGN_IN,
  TO_SIGN_UP,
  TO_TRANSFERS,
  TO_VERIFICATION,
  TO_VERIFY_EMAIL,
  TO_WELCOME,
} from '../constants/routesName';
import {
  BackOfficeEmployeeLoginPage,
  BackOfficeVerificationPage,
  BusinessCreatePasswordPage,
  BusinessSignUpPage,
  CreateForgotPasswordPage,
  CreatePasswordPage,
  DepositLearnMorePage,
  ErrorPage,
  ForgotPasswordPage,
  ForgotPasswordPageFinished,
  Homepage,
  LegalEntityVerificationPage,
  RegistrationPage,
  SignInPage,
  SignUpPage,
  TransfersPage,
  TransactionsHistoryPage,
  UnderDevPage,
  VerificationPage,
  VerifyEmailPage,
  WelcomePage,
} from '../pages';

import BackOfficePrivateRoutes from './BackOfficePrivateRoutes';
import { PrivateRoute } from './PrivateRoute';

import { App } from 'App';
import ChooseProductFormWrapper from 'components/organisms/ChooseProductFormWrapper/ChooseProductFormWrapper';
import BackOffice from 'pages/BackOffice/BackOffice';
import BackOfficeVerifyEmployeeCode from 'pages/BackOffice/BackOfficeVerifyEmployeeCode/BackOfficeVerifyEmployeeCode';
import CreateEmployee from 'pages/BackOffice/CreateEmployee';
import BackOfficeErrorPage from 'pages/BackOfficeErrorPage/BackOfficeErrorPage';
import BackOfficeVerificationErrorPage from 'pages/BackOfficeVerificationErrorPage/BackOfficeVerificationErrorPage';
import BackOfficeViewEmployees from 'pages/BackOfficeViewEmployees/BackOfficeViewEmployees';
import BackOfficeViewProductsPage from 'pages/BackOfficeViewProductsPage/BackOfficeViewProductsPage';
import BusinessLoginPage from 'pages/BusinessLoginPage/BusinessLoginPage';

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
        element: <TransfersPage />,
      },
      {
        path: TO_HISTORY,
        element: <TransactionsHistoryPage />,
      },
      {
        path: TO_DEPOSIT_LEARN_MORE,
        element: <DepositLearnMorePage />,
      },
    ],
  },
  {
    path: TO_WELCOME,
    element: <WelcomePage />,
  },
  {
    path: TO_SIGN_IN,
    element: <SignInPage />,
  },
  {
    path: TO_SIGN_UP,
    element: <SignUpPage />,
  },
  {
    path: TO_CREATE_PASSWORD,
    element: <CreatePasswordPage />,
  },
  {
    path: TO_BUSINESS_SIGN_UP,
    element: <BusinessSignUpPage />,
  },
  {
    path: TO_BUSINESS_LOG_IN,
    element: <BusinessLoginPage />,
  },
  {
    path: TO_BUSINESS_CREATE_PASSWORD,
    element: <BusinessCreatePasswordPage />,
  },
  {
    path: TO_VERIFY_EMAIL,
    element: <VerifyEmailPage />,
  },
  {
    path: TO_VERIFICATION,
    element: <VerificationPage />,
  },
  {
    path: TO_LEGAL_ENTITY_VERIFICATION,
    element: <LegalEntityVerificationPage />,
  },
  {
    path: TO_REGISTRATION,
    element: <RegistrationPage />,
  },
  {
    path: TO_CREATE_FORGOT_PASSWORD,
    element: <CreateForgotPasswordPage />,
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
    element: (
      <BackOfficePrivateRoutes>
        <BackOffice />
      </BackOfficePrivateRoutes>
    ),
    errorElement: <BackOfficeErrorPage />,
    children: [
      {
        path: TO_BACK_OFFICE_CREATE_EMPLOYEE,
        element: <CreateEmployee />,
      },
      {
        path: TO_BACK_OFFICE_VIEW_EMPLOYEES,
        element: <BackOfficeViewEmployees />,
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
