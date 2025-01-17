import * as yup from 'yup';

import i18n from 'i18n';

export const employeeRoles = ['Administrator', 'Employee'];

export const employeeValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(i18n.t('validation.firstNameRequired'))
    .matches(/^[a-zA-Z]+$/, i18n.t('validation.firstNameLetters')),
  lastName: yup
    .string()
    .required(i18n.t('validation.lastNameRequired'))
    .matches(/^[a-zA-Z]+$/, i18n.t('validation.lastNameLetters')),
  email: yup
    .string()
    .required(i18n.t('validation.emailRequired'))
    .email(i18n.t('validation.emailInvalid')),
  role: yup
    .string()
    .required(i18n.t('validation.roleRequired'))
    .oneOf(employeeRoles, i18n.t('validation.roleInvalid')),
  dateAdded: yup
    .string()
    .required(i18n.t('validation.dateRequired'))
    .typeError(i18n.t('validation.dateInvalid')),
});
