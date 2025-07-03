import * as yup from 'yup';

import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from 'constants/validationPatternConstants';
import { t } from 'i18n';
import { isValidDecimalAmount } from 'utils/validationUtils';

const VALIDATION_KEY = 'BackOffice.LastResortDeposit';
const requiredField = t(`${VALIDATION_KEY}.required`);

const amountValidation = yup
  .number()
  .typeError(t(`${VALIDATION_KEY}.number`))
  .test('decimal-places', t(`${VALIDATION_KEY}.decimal`), (value) =>
    isValidDecimalAmount(value, VALIDATION_PATTERNS.DECIMAL_AMOUNT),
  );
const earlyWithdrawalValidation = amountValidation
  .min(0, t(`${VALIDATION_KEY}.positive`))
  .when('earlyWithdrawal', {
    is: true,
    then: (schema) =>
      schema.required(t(`${VALIDATION_KEY}.earlyWithdrawalVal`)),
    otherwise: (schema) => schema.notRequired(),
  });

export const createDepositProductSchema = yup.object().shape({
  minimumDepositSum: amountValidation
    .min(0, t(`${VALIDATION_KEY}.zero`))
    .required(requiredField),
  maximumDepositSum: amountValidation
    .min(yup.ref('minimumDepositSum'), t(`${VALIDATION_KEY}.grThDeposit`))
    .required(requiredField),
  depositInterestRate: amountValidation
    .min(0, t(`${VALIDATION_KEY}.zero`))
    .required(requiredField),
  depositCapitalizationRate: amountValidation
    .min(0, t(`${VALIDATION_KEY}.positive`))
    .required(requiredField),
  depositTerm: yup
    .number()
    .typeError(t(`${VALIDATION_KEY}.number`))
    .integer(t(`${VALIDATION_KEY}.naturalNum`))
    .min(VALIDATION_LIMITS.DEPOSIT_TERM_MIN, t(`${VALIDATION_KEY}.atleastOne`))
    .when('productSubtype', {
      is: 'Target deposit',
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required(requiredField),
    }),
  earlyWithdrawalLimit: earlyWithdrawalValidation,
  earlyWithdrawalFee: earlyWithdrawalValidation,
  earlyWithdrawal: yup.boolean(),
  autoRenewable: yup.boolean(),
  augmentable: yup.boolean(),
});

export type TCreateDepositProductValues = yup.InferType<
  typeof createDepositProductSchema
>;
