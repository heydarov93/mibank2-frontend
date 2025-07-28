import * as yup from 'yup';

import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from 'constants/validation/patterns';
import { t } from 'i18n';

const VALIDATION_KEY = 'BackOffice.cardEditFormErrors';

export const editCardSchema = yup.object().shape({
  cardName: yup
    .string()
    .min(
      VALIDATION_LIMITS.CARD_NAME_MIN_LENGTH,
      t(`${VALIDATION_KEY}.cardName`),
    )
    .matches(
      VALIDATION_PATTERNS.CAPITALIZE_WORD,
      t(`${VALIDATION_KEY}.capitalLetter`),
    )
    .required(t(`${VALIDATION_KEY}.cardNameReq`)),
  cardDescription: yup
    .string()
    .min(
      VALIDATION_LIMITS.CARD_DESCRIPTION_MIN_LENGTH,
      t(`${VALIDATION_KEY}.description`),
    )
    .required(t(`${VALIDATION_KEY}.provideDescription`)),
  cardCurrency: yup.string().required(t(`${VALIDATION_KEY}.cardCurrencyReq`)),
  cardCashbackRate: yup
    .string()
    .required(t(`${VALIDATION_KEY}.cashback`))
    .matches(
      VALIDATION_PATTERNS.DECIMAL_NUMBER,
      t(`${VALIDATION_KEY}.cashbackRate`),
    ),
  monthlyFee: yup
    .string()
    .required(t(`${VALIDATION_KEY}.fee`))
    .matches(
      VALIDATION_PATTERNS.DECIMAL_NUMBER,
      t(`${VALIDATION_KEY}.feeNumber`),
    ),
  dailyOperationalLimit: yup
    .string()
    .required(t(`${VALIDATION_KEY}.opLimit`))
    .matches(
      VALIDATION_PATTERNS.DECIMAL_NUMBER,
      t(`${VALIDATION_KEY}.opLimitNumber`),
    ),
  foreignTransactionLimit: yup
    .string()
    .required(t(`${VALIDATION_KEY}.foreignTransaction`))
    .matches(
      VALIDATION_PATTERNS.DECIMAL_NUMBER,
      t(`${VALIDATION_KEY}.foreignNum`),
    ),
});

export type TEditCardValues = yup.InferType<typeof editCardSchema>;
