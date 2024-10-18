import * as yup from 'yup';

import i18n from 'i18n';

export const validationRegistrationSchema = yup.object().shape({
  phoneNumber: yup
    .number()
    .required(i18n.t(`LoginPage.requiredField`))
    .test(
      'len',
      i18n.t(`RegistrationPage.phoneNumber.errorInvalid`),
      (val) => val.toString().length >= 10,
    ),
});
