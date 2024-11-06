import * as yup from 'yup';

import i18n from 'i18n';
const personalPage = 'RegistrationPage';

export const validationDocumentInfoSchema = yup.object().shape({
  passportNumber: yup
    .string()
    .required(i18n.t(`${personalPage}.requiredField`))
    .matches(/^[A-Z0-9]+$/, i18n.t(`${personalPage}.errorPassportNumFormat`))
    .max(20, i18n.t(`${personalPage}.errorPassportNumMaxLen`)),
  issueDate: yup.string().required(i18n.t(`${personalPage}.requiredField`)),
  expirationDate: yup
    .string()
    .required(i18n.t(`${personalPage}.requiredField`)),
});
