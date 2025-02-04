import * as yup from 'yup';

import i18n from 'i18n';

const lastResortDeposit = 'BackOffice.LastResortDeposit';

export const lastDepositValidation = yup.object().shape({
  minimumDepositSum: yup
    .number()
    .typeError(i18n.t(`${lastResortDeposit}.number`))
    .min(0, i18n.t(`${lastResortDeposit}.zero`))
    .test(
      'decimal-places',
      i18n.t(`${lastResortDeposit}.decimal`),
      (value) =>
        value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString()),
    )
    .required(i18n.t(`${lastResortDeposit}.required`)),
  maximumDepositSum: yup
    .number()
    .typeError(i18n.t(`${lastResortDeposit}.number`))
    .min(
      yup.ref('minimumDepositSum'),
      i18n.t(`${lastResortDeposit}.grThDeposit`),
    )
    .test(
      'decimal-places',
      i18n.t(`${lastResortDeposit}.decimal`),
      (value) =>
        value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString()),
    )
    .required(i18n.t(`${lastResortDeposit}.required`)),
  depositTerm: yup
    .number()
    .typeError(i18n.t(`${lastResortDeposit}.number`))
    .integer(i18n.t(`${lastResortDeposit}.naturalNum`))
    .min(1, i18n.t(`${lastResortDeposit}.atleastOne`))
    .when('productSubtype', {
      is: 'Target deposit',
      then: (schema) => schema.notRequired(),
      otherwise: (schema) =>
        schema.required(i18n.t(`${lastResortDeposit}.required`)),
    }),
  depositInterestRate: yup
    .number()
    .typeError(i18n.t(`${lastResortDeposit}.number`))
    .min(0, i18n.t(`${lastResortDeposit}.positive`))
    .test(
      'decimal-places',
      i18n.t(`${lastResortDeposit}.decimal`),
      (value) =>
        value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString()),
    )
    .required(i18n.t(`${lastResortDeposit}.required`)),
  depositCapitalizationRate: yup
    .number()
    .typeError(i18n.t(`${lastResortDeposit}.number`))
    .min(0, i18n.t(`${lastResortDeposit}.positive`))
    .test(
      'decimal-places',
      i18n.t(`${lastResortDeposit}.decimal`),
      (value) =>
        value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString()),
    )
    .required(i18n.t(`${lastResortDeposit}.required`)),
  earlyWithdrawal: yup.boolean(),
  earlyWithdrawalLimit: yup
    .number()
    .typeError(i18n.t(`${lastResortDeposit}.number`))
    .min(0, i18n.t(`${lastResortDeposit}.positive`))
    .test(
      'decimal-places',
      i18n.t(`${lastResortDeposit}.decimal`),
      (value) =>
        value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString()),
    )
    .when('earlyWithdrawal', {
      is: true,
      then: (schema) =>
        schema.required(i18n.t(`${lastResortDeposit}.earlyWithdrawalVal`)),
      otherwise: (schema) => schema.notRequired(),
    }),
  withdrawalFee: yup
    .number()
    .typeError(i18n.t(`${lastResortDeposit}.number`))
    .min(0, i18n.t(`${lastResortDeposit}.positive`))
    .test(
      'decimal-places',
      i18n.t(`${lastResortDeposit}.decimal`),
      (value) =>
        value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString()),
    )
    .when('earlyWithdrawal', {
      is: true,
      then: (schema) =>
        schema.required(i18n.t(`${lastResortDeposit}.earlyWithdrawalVal`)),
      otherwise: (schema) => schema.notRequired(),
    }),
  autoRenewable: yup.boolean(),
  addOn: yup.boolean(),
});
