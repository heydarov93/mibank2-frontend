import * as yup from 'yup';

import i18n from 'i18n';
const personalPage = 'RegistrationPage';

export const validationAddressSchema = yup.object().shape({
  city: yup.string().required(i18n.t(`${personalPage}.requiredField`)),
});
