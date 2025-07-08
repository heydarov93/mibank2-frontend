import * as yup from 'yup';

import { t } from 'i18n';

const VALIDATION_KEY = 'DepositWindow.validation';

export const openDepositSchema = yup.object().shape({
  amount: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value,
    )
    .required(t(`${VALIDATION_KEY}.depositAmountRequired`))
    .min(0, t(`${VALIDATION_KEY}.depositMinAmount`))
    .typeError(t(`${VALIDATION_KEY}.depositTypeError`)),
  account: yup
    .string()
    .required(t(`${VALIDATION_KEY}.accountRequired`))
    .trim(),
  checkbox: yup
    .boolean()
    .oneOf([true], t(`${VALIDATION_KEY}.termsRequiredCheckbox`)),
});

export type TOpenDepositValues = yup.InferType<
  typeof openDepositSchema
>;