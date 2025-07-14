import * as yup from 'yup';

import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from 'constants/validation/patterns';
import { t } from 'i18n';
import { isMinimumInteger, isMinimumValue, isNonNegative, isPositiveInteger, isPositiveNumber } from 'utils/helpers/validationHelpers';


const VALIDATION_KEY = 'BackOffice.depositEditFormErrors';

export const editDepositSchema = yup.object().shape({
  name: yup
    .string()
    .required(t(`${VALIDATION_KEY}.depNameReq`))
    .min(
      VALIDATION_LIMITS.PRODUCT_NAME_MIN_LENGTH,
      t(`${VALIDATION_KEY}.depNameChars`, {
        min: VALIDATION_LIMITS.PRODUCT_NAME_MIN_LENGTH,
      }),
    )
    .max(
      VALIDATION_LIMITS.PRODUCT_NAME_MAX_LENGTH,
      t(`${VALIDATION_KEY}.depNameMax`, {
        max: VALIDATION_LIMITS.PRODUCT_NAME_MAX_LENGTH,
      }),
    )
    .matches(
      VALIDATION_PATTERNS.CAPITALIZE_FIRST_LETTER,
      t(`${VALIDATION_KEY}.depNameMatch`),
    ),

  description: yup
    .string()
    .required(t(`${VALIDATION_KEY}.descReq`))
    .min(
      VALIDATION_LIMITS.PRODUCT_DESCRIPTION_MIN_LENGTH,
      t(`${VALIDATION_KEY}.descMin`, {
        min: VALIDATION_LIMITS.PRODUCT_DESCRIPTION_MIN_LENGTH,
      }),
    )
    .max(
      VALIDATION_LIMITS.PRODUCT_DESCRIPTION_MAX_LENGTH,
      t(`${VALIDATION_KEY}.descMax`, {
        max: VALIDATION_LIMITS.PRODUCT_DESCRIPTION_MAX_LENGTH,
      }),
    ),

  currency: yup
    .string()
    .required(t(`${VALIDATION_KEY}.currencyReq`))
    .oneOf(
      ['PLN', 'EUR', 'CHF', 'GBP', 'JPY', 'USD'],
      t(`${VALIDATION_KEY}.currencyReq`),
    ),

  min: yup
    .string()
    .required(t(`${VALIDATION_KEY}.minSum`))
    .matches(
      VALIDATION_PATTERNS.DECIMAL_NUMBER,
      t(`${VALIDATION_KEY}.sumValid`),
    )
    .test(
      'is-positive',
      t(`${VALIDATION_KEY}.minDepositPositive`),
      isPositiveNumber,
    )
    .test('min-value', t(`${VALIDATION_KEY}.minDepositSum`), (value) =>
      isMinimumValue(value, 1),
    )
    .test(
      'maxLessThanMin',
      t(`${VALIDATION_KEY}.minMoreThanMax`),
      function (value) {
        const { maximumDepositSum } = this.parent;
        if (!value || !maximumDepositSum) return true;
        return parseFloat(value) < parseFloat(maximumDepositSum);
      },
    ),

  max: yup
    .string()
    .required(t(`${VALIDATION_KEY}.maxReq`))
    .matches(
      VALIDATION_PATTERNS.DECIMAL_NUMBER,
      t(`${VALIDATION_KEY}.validNum`),
    )
    .test('is-positive', t(`${VALIDATION_KEY}.depTermReq`), isPositiveNumber)
    .test('moreThanMin', t(`${VALIDATION_KEY}.maxReq`), function (value) {
      const { minimumDepositSum } = this.parent;
      if (!value || !minimumDepositSum) return true;
      return parseFloat(value) > parseFloat(minimumDepositSum);
    }),

  term: yup
    .string()
    .required(t(`${VALIDATION_KEY}.depTermReq`))
    .matches(
      VALIDATION_PATTERNS.WHOLE_NUMBER,
      t(`${VALIDATION_KEY}.depTermWhole`),
    )
    .test('is-positive', t(`${VALIDATION_KEY}.depTermPos`), isPositiveInteger)
    .test('min-value', t(`${VALIDATION_KEY}.depTermMin`), (value) =>
      isMinimumInteger(value, 1),
    ),
  interestRate: yup
    .string()
    .required(t(`${VALIDATION_KEY}.depInterestRate`))
    .matches(VALIDATION_PATTERNS.DECIMAL_NUMBER, 'Must be a valid number')
    .test(
      'is-positive',
      t(`${VALIDATION_KEY}.depInterestRatePos`),
      isPositiveNumber,
    )
    .test('min-value', t(`${VALIDATION_KEY}.depInterestRateMin`), (value) =>
      isMinimumValue(value, 0.01),
    ),

  capitalization: yup
    .string()
    .required(t(`${VALIDATION_KEY}.depCapRate`))
    .matches(
      VALIDATION_PATTERNS.WHOLE_NUMBER,
      t(`${VALIDATION_KEY}.depTermWhole`),
    )
    .test(
      'is-positive',
      t(`${VALIDATION_KEY}.depCapRatePos`),
      isPositiveInteger,
    )
    .test('min-value', t(`${VALIDATION_KEY}.depCapRateMin`), (value) =>
      isMinimumInteger(value, 1),
    ),

  earlyWithdrawalLimit: yup
    .string()
    .required(t(`${VALIDATION_KEY}.earlyWdReq`))
    .matches(
      VALIDATION_PATTERNS.DECIMAL_NUMBER,
      t(`${VALIDATION_KEY}.validNum`),
    )
    .test(
      'not-negative',
      t(`${VALIDATION_KEY}.earlyWdLimitNeg`),
      isNonNegative,
    ),

  earlyWithdrawalFee: yup
    .string()
    .required(t(`${VALIDATION_KEY}.wdFeeReq`))
    .matches(
      VALIDATION_PATTERNS.DECIMAL_NUMBER,
      t(`${VALIDATION_KEY}.validNum`),
    )
    .test('not-negative', t(`${VALIDATION_KEY}.wdFeeNeg`), isNonNegative),
});

export type TEditDepositValues = yup.InferType<typeof editDepositSchema>;
