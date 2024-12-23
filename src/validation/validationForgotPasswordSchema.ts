import * as yup from 'yup';

import { REG_EXP } from './regExp';

import i18n from 'i18n';

export const validationForgotPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required(' ')
    .matches(REG_EXP.passwordRegExp, ' ')
    .max(50, i18n.t(`LoginPage.password.errorMaxLen`)),
  confirmPassword: yup
    .string()
    .trim()
    .required(i18n.t(`LoginPage.requiredField`))
    .matches(REG_EXP.passwordRegExp, i18n.t(`LoginPage.password.errorPattern`))
    .oneOf(
      [yup.ref('password')],
      i18n.t(`SignupPage.confirmPassword.errorMatch`),
    )
    .max(50, i18n.t(`LoginPage.password.errorMaxLen`)),
  verificationCode: yup
    .string()
    .matches(/^[0-9]+$/, i18n.t(`ForgotPassword.OnlyDigitsAllowed`))
    .required(i18n.t(`ForgotPassword.requiredField`))
    .test(
      'len',
      i18n.t(`ForgotPassword.errorInvalid`),
      (val) => val.toString().length == 6,
    ),
});
