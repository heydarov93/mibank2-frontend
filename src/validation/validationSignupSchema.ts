import * as yup from 'yup';

import { REG_EXP } from './regExp';

import i18n from 'i18n';

const loginFields = 'LoginPage';
const passwordField = 'common.form.field.password.error';

export const validationSignupSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required(i18n.t(`${passwordField}.required`))
    .matches(REG_EXP.passwordRegExp, i18n.t(`${passwordField}.errorPattern`))
    .max(50, i18n.t(`${passwordField}.errorMaxLen`)),
  confirmPassword: yup
    .string()
    .trim()
    .required(i18n.t(`${passwordField}.required`))
    .matches(REG_EXP.passwordRegExp, i18n.t(`${passwordField}.errorPattern`))
    .oneOf([yup.ref('password')], i18n.t(`${passwordField}.errorMatch`))
    .max(50, i18n.t(`${passwordField}.errorMaxLen`)),
  checkbox: yup.boolean().oneOf([true]),
});

export const validationEmailSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required(i18n.t(`${loginFields}.requiredField`))
    .matches(REG_EXP.emailRegExp, i18n.t(`${loginFields}.email.errorPattern`))
    .max(320, i18n.t(`${loginFields}.email.errorMaxLen`)),
});
