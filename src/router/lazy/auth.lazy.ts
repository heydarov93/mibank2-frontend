import { lazy } from 'react';

export const WelcomePage = lazy(() =>
  import('pages').then((module) => ({ default: module.WelcomePage })),
);

export const LoginPage = lazy(() =>
  import('pages').then((module) => ({ default: module.LoginPage })),
);

export const SignUpPage = lazy(() =>
  import('pages').then((module) => ({ default: module.SignUpPage })),
);

export const CreatePasswordPage = lazy(() =>
  import('pages').then((module) => ({ default: module.CreatePasswordPage })),
);

export const VerifyEmailPage = lazy(() =>
  import('pages').then((module) => ({ default: module.VerifyEmailPage })),
);

export const VerificationPage = lazy(() =>
  import('pages').then((module) => ({ default: module.VerificationPage })),
);

export const RegistrationPage = lazy(() =>
  import('pages').then((module) => ({ default: module.RegistrationPage })),
);

export const ForgotPasswordPage = lazy(() =>
  import('pages').then((module) => ({ default: module.ForgotPasswordPage })),
);

export const CreateForgotPasswordPage = lazy(() =>
  import('pages').then((module) => ({
    default: module.CreateForgotPasswordPage,
  })),
);

export const ForgotPasswordConfirmationPage = lazy(() =>
  import('pages').then((module) => ({
    default: module.ForgotPasswordConfirmationPage,
  })),
);

export const LegalEntityVerificationPage = lazy(() =>
  import('pages').then((module) => ({
    default: module.LegalEntityVerificationPage,
  })),
);
