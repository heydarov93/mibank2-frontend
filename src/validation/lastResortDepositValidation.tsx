import * as yup from 'yup';

import i18n from 'i18n';

const lastResortDeposit = 'BackOffice.LastResortDeposit';
const required = i18n.t(`${lastResortDeposit}.required`);
const amountPattern = /^\d{1,15}(\.\d{1,2})?$/;
const common = yup
  .number()
  .typeError(i18n.t(`${lastResortDeposit}.number`))
  .test(
    'decimal-places',
    i18n.t(`${lastResortDeposit}.decimal`),
    (value) => value === undefined || amountPattern.test(value.toString()),
  );
const earlyWithdrawal = common
  .min(0, i18n.t(`${lastResortDeposit}.positive`))
  .when('earlyWithdrawal', {
    is: true,
    then: (schema) =>
      schema.required(i18n.t(`${lastResortDeposit}.earlyWithdrawalVal`)),
    otherwise: (schema) => schema.notRequired(),
  });

export const lastDepositValidation = yup.object().shape({
  minimumDepositSum: common
    .min(0, i18n.t(`${lastResortDeposit}.zero`))
    .required(required),
  maximumDepositSum: common
    .min(
      yup.ref('minimumDepositSum'),
      i18n.t(`${lastResortDeposit}.grThDeposit`),
    )
    .required(required),
  depositInterestRate: common
    .min(0, i18n.t(`${lastResortDeposit}.zero`))
    .required(required),
  depositCapitalizationRate: common
    .min(0, i18n.t(`${lastResortDeposit}.positive`))
    .required(required),
  depositTerm: yup
    .number()
    .typeError(i18n.t(`${lastResortDeposit}.number`))
    .integer(i18n.t(`${lastResortDeposit}.naturalNum`))
    .min(1, i18n.t(`${lastResortDeposit}.atleastOne`))
    .when('productSubtype', {
      is: 'Target deposit',
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required(required),
    }),
  earlyWithdrawalLimit: earlyWithdrawal,
  earlyWithdrawalFee: earlyWithdrawal,
  earlyWithdrawal: yup.boolean(),
  autoRenewable: yup.boolean(),
  augmentable: yup.boolean(),
});
