import * as yup from 'yup';

import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from 'constants/validationPatternConstants';
import { t } from 'i18n';
import { isValidVerificationCodeLength } from 'utils/helpers/validationHelpers';

export const forgotPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required(' ')
    .matches(VALIDATION_PATTERNS.PASSWORD, ' ')
    .max(
      VALIDATION_LIMITS.PASSWORD_MAX_LENGTH,
      t(`LoginPage.password.errorMaxLen`),
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required(t(`LoginPage.requiredField`))
    .matches(VALIDATION_PATTERNS.PASSWORD, t(`LoginPage.password.errorPattern`))
    .oneOf([yup.ref('password')], t(`SignupPage.confirmPassword.errorMatch`))
    .max(
      VALIDATION_LIMITS.PASSWORD_MAX_LENGTH,
      t(`LoginPage.password.errorMaxLen`),
    ),
  verificationCode: yup
    .string()
    .matches(
      VALIDATION_PATTERNS.DIGITS_ONLY,
      t(`ForgotPassword.OnlyDigitsAllowed`),
    )
    .required(t(`ForgotPassword.requiredField`))
    .test(
      'len',
      t(`ForgotPassword.errorInvalid`),
      isValidVerificationCodeLength,
    ),
});

export type TForgotPasswordValues = yup.InferType<typeof forgotPasswordSchema>;
