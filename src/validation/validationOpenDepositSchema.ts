import * as yup from 'yup';

import i18n from 'i18n';

const openDepositPage = 'DepositWindow';

export const openDepositValidationSchema = yup.object().shape({
  amount: yup
    .number()
    .nullable()
    .required(i18n.t(`${openDepositPage}.validation.depositAmountRequired`))
    .min(0, i18n.t(`${openDepositPage}.validation.depositMinAmount`))
    .typeError(i18n.t(`${openDepositPage}.validation.depositTypeError`))
    .test(
      'is-number',
      i18n.t(`${openDepositPage}.validation.depositTypeError`),
      (value) => value === null || !isNaN(value),
    ),
  account: yup
    .string()
    .required(i18n.t(`${openDepositPage}.validation.accountRequired`))
    .trim(),
  checkbox: yup
    .boolean()
    .oneOf(
      [true],
      i18n.t(`${openDepositPage}.validation.termsRequiredCheckbox`),
    ),
});
