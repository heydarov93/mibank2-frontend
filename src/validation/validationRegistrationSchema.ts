import * as yup from 'yup';

import { REG_EXP } from './regExp';

import i18n from 'i18n';
const personalPage = 'RegistrationPage';

export const validationRegistrationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(i18n.t(`${personalPage}.requiredField`))
    .matches(REG_EXP.nameRegExp, i18n.t(`${personalPage}.nameErrorPattern`))
    .max(40, i18n.t(`${personalPage}.errorMaxLenName`)),
  surname: yup
    .string()
    .trim()
    .required(i18n.t(`${personalPage}.requiredField`))
    .matches(REG_EXP.nameRegExp, i18n.t(`${personalPage}.nameErrorPattern`))
    .max(80, i18n.t(`${personalPage}.errorMaxLenSurname`)),
  dateOfBirth: yup
    .string()
    .trim()
    .required(i18n.t(`${personalPage}.requiredField`)),
  phoneNumber: yup
    .string()
    .required(i18n.t(`${personalPage}.requiredField`))
    .test(
      'len',
      i18n.t(`${personalPage}.phoneNumber.errorInvalid`),
      (val) => val.toString().length >= 10,
    ),
});
