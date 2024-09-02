import * as yup from 'yup';

import { REG_EXP } from './regExp';

import i18n from 'i18n';

const loginFields = 'LoginPage';

export const validationLoginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required(i18n.t(`${loginFields}.requiredField`))
    .matches(REG_EXP.emailRegExp, i18n.t(`${loginFields}.email.errorPattern`))
    .max(320, i18n.t(`${loginFields}.email.errorMaxLen`)),
  password: yup
    .string()
    .trim()
    .required(i18n.t(`${loginFields}.requiredField`))
    .matches(
      REG_EXP.passwordRegExp,
      i18n.t(`${loginFields}.password.errorPattern`),
    )
    .max(50, i18n.t(`${loginFields}.password.errorMaxLen`)),
  checkbox: yup.boolean().oneOf([true]),
});
