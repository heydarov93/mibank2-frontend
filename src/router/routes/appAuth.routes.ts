import { RouteObject } from 'react-router-dom';

import {
  TO_CREATE_FORGOT_PASSWORD,
  TO_CREATE_FORGOT_PASSWORD_FINISHED,
  TO_CREATE_PASSWORD,
  TO_FORGOT_PASSWORD,
  TO_LEGAL_ENTITY_VERIFICATION,
  TO_REGISTRATION,
  TO_SIGN_IN,
  TO_SIGN_UP,
  TO_VERIFICATION,
  TO_VERIFY_EMAIL,
  TO_WELCOME,
} from 'constants/routesName';
import {
  CreateForgotPasswordPage,
  CreatePasswordPage,
  ForgotPasswordPage,
  ForgotPasswordConfirmationPage,
  LegalEntityVerificationPage,
  RegistrationPage,
  LoginPage,
  SignUpPage,
  VerificationPage,
  VerifyEmailPage,
  WelcomePage,
} from 'router/lazy/auth.lazy';
import { withSuspense } from 'router/utils/withSuspense';

export const authRoutes: RouteObject[] = [
  {
    path: TO_WELCOME,
    element: withSuspense(WelcomePage),
  },
  {
    path: TO_SIGN_IN,
    element: withSuspense(LoginPage),
  },
  {
    path: TO_SIGN_UP,
    element: withSuspense(SignUpPage),
  },
  {
    path: TO_CREATE_PASSWORD,
    element: withSuspense(CreatePasswordPage),
  },
  {
    path: TO_VERIFY_EMAIL,
    element: withSuspense(VerifyEmailPage),
  },
  {
    path: TO_VERIFICATION,
    element: withSuspense(VerificationPage),
  },
  {
    path: TO_LEGAL_ENTITY_VERIFICATION,
    element: withSuspense(LegalEntityVerificationPage),
  },
  {
    path: TO_REGISTRATION,
    element: withSuspense(RegistrationPage),
  },
  {
    path: TO_FORGOT_PASSWORD,
    element: withSuspense(ForgotPasswordPage),
  },
  {
    path: TO_CREATE_FORGOT_PASSWORD,
    element: withSuspense(CreateForgotPasswordPage),
  },
  {
    path: TO_CREATE_FORGOT_PASSWORD_FINISHED,
    element: withSuspense(ForgotPasswordConfirmationPage),
  },
];
