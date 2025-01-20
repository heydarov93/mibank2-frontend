import * as yup from 'yup';

import { REG_EXP } from './regExp';

import i18n from 'i18n';

export const employeeRoles = ['Administrator', 'Employee'];

export const employeeValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required(i18n.t(`This field is required`))
    .test(
      'only-one-capital-letter',
      i18n.t(`Only the first letter must be capital`),
      (value) => {
        if (!value) return true;
        return !REG_EXP.onlyOneCapitalizeLetter.test(value);
      },
    )
    .matches(
      REG_EXP.nameRegExp,
      i18n.t(`Only Latin/Cyrillic letters, space and hyphen are acceptable`),
    )
    .matches(REG_EXP.capitalizeLetters, i18n.t(`First letter must be capital`))
    .min(3, i18n.t(`First Name should be more than 3 characters`))
    .max(40, i18n.t(`First Name should not exceed 40 characters`)),
  lastName: yup
    .string()
    .trim()
    .required(i18n.t(`This field is required`))
    .test(
      'only-one-capital-letter',
      i18n.t(`Only the first letter must be capital`),
      (value) => {
        if (!value) return true;
        return !REG_EXP.onlyOneCapitalizeLetter.test(value);
      },
    )
    .matches(
      REG_EXP.nameRegExp,
      i18n.t(`Only Latin/Cyrillic letters, space and hyphen are acceptable`),
    )
    .matches(REG_EXP.capitalizeLetters, i18n.t(`First letter must be capital`))
    .min(3, i18n.t(`Last Name should be more than 3 characters`))
    .max(40, i18n.t(`Last Name should not exceed 40 characters`)),
  email: yup
    .string()
    .trim()
    .required(i18n.t(`This field is required`))
    .matches(
      REG_EXP.emailRegExp,
      i18n.t(`Please enter your email in format: example@gmail.com`),
    ),
  role: yup.string().required(i18n.t(`This field is required`)),
  dateAdded: yup.string().trim().required(i18n.t(`This field is required`)),
});
