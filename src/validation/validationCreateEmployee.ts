import * as yup from 'yup';

import { REG_EXP } from './regExp';

import i18n from 'i18n';

export const employeeRoles = [
  i18n.t('BackOffice.addNewEmployee.admin'),
  i18n.t('BackOffice.addNewEmployee.employee'),
];

export const employeeValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required(i18n.t(`BackOffice.addNewEmployee.errorFieldRequired`))
    .test(
      'only-one-capital-letter',
      i18n.t(`BackOffice.addNewEmployee.errorOnlyCapitalLetter`),
      (value) => {
        if (!value) return true;
        return !REG_EXP.onlyOneCapitalizeLetter.test(value);
      },
    )
    .matches(
      REG_EXP.nameRegExp,
      i18n.t(`BackOffice.addNewEmployee.errorLetters`),
    )
    .matches(
      REG_EXP.capitalizeLetters,
      i18n.t(`BackOffice.addNewEmployee.errorFirstLetter`),
    )
    .min(3, i18n.t(`BackOffice.addNewEmployee.errorFirstNameMin`))
    .max(40, i18n.t(`BackOffice.addNewEmployee.errorFirstNameMax`)),
  lastName: yup
    .string()
    .trim()
    .required(i18n.t(`BackOffice.addNewEmployee.errorFieldRequired`))
    .test(
      'only-one-capital-letter',
      i18n.t(`BackOffice.addNewEmployee.errorOnlyCapitalLetter`),
      (value) => {
        if (!value) return true;
        return !REG_EXP.onlyOneCapitalizeLetter.test(value);
      },
    )
    .matches(
      REG_EXP.nameRegExp,
      i18n.t(`BackOffice.addNewEmployee.errorLetters`),
    )
    .matches(
      REG_EXP.capitalizeLetters,
      i18n.t(`BackOffice.addNewEmployee.errorFirstLetter`),
    )
    .min(3, i18n.t(`BackOffice.addNewEmployee.errorLastNameMin`))
    .max(40, i18n.t(`BackOffice.addNewEmployee.errorLastNameMax`)),
  email: yup
    .string()
    .trim()
    .required(i18n.t(`BackOffice.addNewEmployee.errorFieldRequired`))
    .matches(
      REG_EXP.emailRegExp,
      i18n.t(`BackOffice.addNewEmployee.errorEmail`),
    ),
  role: yup
    .string()
    .required(i18n.t(`BackOffice.addNewEmployee.errorFieldRequired`)),
  dateAdded: yup
    .string()
    .trim()
    .required(i18n.t(`BackOffice.addNewEmployee.errorFieldRequired`)),
});
