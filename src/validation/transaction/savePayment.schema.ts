import * as yup from 'yup';

import { t } from 'config';
import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from 'constants/validation/patterns';

const VALIDATION_KEY = 'transferModal.validation';

export const savePaymentSchema = yup.object().shape({
  paymentName: yup
    .string()
    .required(t(`${VALIDATION_KEY}.required`))
    .matches(VALIDATION_PATTERNS.LATIN_ONLY, t(`${VALIDATION_KEY}.onlyLatin`))
    .max(
      VALIDATION_LIMITS.PAYMENTNAME_MAX_LENGTH,
      t(`${VALIDATION_KEY}.maxLength`),
    ),
});

export type TSavePaymentValues = yup.InferType<typeof savePaymentSchema>;
