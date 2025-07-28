import * as yup from 'yup';

import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from 'constants/validation/patterns';
import { t } from 'i18n';

const VALIDATION_KEY = 'LoginPage';
const passwordField = 'common.form.field.password.error';

export const userSignupSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required(t(`${passwordField}.required`))
    .matches(VALIDATION_PATTERNS.PASSWORD, t(`${passwordField}.errorPattern`))
    .max(
      VALIDATION_LIMITS.PASSWORD_MAX_LENGTH,
      t(`${passwordField}.errorMaxLen`),
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required(t(`${passwordField}.required`))
    .matches(VALIDATION_PATTERNS.PASSWORD, t(`${passwordField}.errorPattern`))
    .oneOf([yup.ref('password')], t(`${passwordField}.errorMatch`))
    .max(
      VALIDATION_LIMITS.CONFIRM_PASSWORD_MAX_LENGTH,
      t(`${passwordField}.errorMaxLen`),
    ),
  checkbox: yup.boolean().oneOf([true]),
});

export const userEmailSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required(t(`${VALIDATION_KEY}.required`))
    .matches(
      VALIDATION_PATTERNS.EMAIL,
      t(`${VALIDATION_KEY}.email.errorPattern`),
    )
    .max(
      VALIDATION_LIMITS.EMAIL_MAX_LENGTH,
      t(`${VALIDATION_KEY}.email.errorMaxLen`),
    ),
});

export type TUserSignupValues = yup.InferType<typeof userSignupSchema>;
