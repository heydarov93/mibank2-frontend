import * as yup from 'yup';

import i18n from 'i18n';
const personalPage = 'RegistrationPage';

export const validationLegalStatusSchema = yup.object().shape({
  peselNumber: yup
    .number()
    .typeError(i18n.t(`${personalPage}.requiredField`))
    .required(i18n.t(`${personalPage}.requiredField`))
    .test(
      'len',
      i18n.t(`${personalPage}.errorPeselDigits`),
      (val) => val.toString().length === 11,
    ),
  citizenship: yup.string().required(i18n.t(`${personalPage}.requiredField`)),
  taxResidenceCountry: yup
    .string()
    .required(i18n.t(`${personalPage}.requiredField`)),
});
