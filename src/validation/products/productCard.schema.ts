import * as yup from 'yup';

import { VALIDATION_PATTERNS } from 'constants/validationPatternConstants';
import { t } from 'i18n';
import { isValidDecimalAmount } from 'utils/helpers/validationHelpers';

const VALIDATION_KEY = 'BackOffice.VisaCard';
const requiredField = `${VALIDATION_KEY}.required`;

const decimalValidation = yup
  .number()
  .required(t(requiredField))
  .typeError(t(`${VALIDATION_KEY}.number`))
  .test('decimal-places', t(`${VALIDATION_KEY}.decimal`), (value) =>
    isValidDecimalAmount(value, VALIDATION_PATTERNS.DECIMAL_TWO_PLACES),
  );

export const productCardSchema = yup.object().shape({
  cashbackRate: decimalValidation,
  monthlyFee: decimalValidation,
  dailyOperationalLimit: decimalValidation,
  foreignTransactionLimit: decimalValidation,
  cardIssuer: yup.string().required(t(requiredField)).nullable(),
  cardType: yup.string().required(t(requiredField)).nullable(),
});

export type TProductCardValues = yup.InferType<typeof productCardSchema>;
