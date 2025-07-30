import * as yup from 'yup';

import { t } from 'config';
import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from 'constants/validation/patterns';

const VALIDATION_KEY = 'BackOffice.CreateProduct';

export const chooseProductSchema = yup.object({
  productType: yup
    .string()
    .required(t(`${VALIDATION_KEY}.errorProductRequired`)),
  subtype: yup.string().required(t(`${VALIDATION_KEY}.errorSubtypeRequired`)),
  currency: yup.string().required(t(`${VALIDATION_KEY}.errorCurrencyRequired`)),
  name: yup
    .string()
    .min(
      VALIDATION_LIMITS.PRODUCT_NAME_MIN_LENGTH,
      t(`${VALIDATION_KEY}.errorProductName`, {
        min: VALIDATION_LIMITS.PRODUCT_NAME_MIN_LENGTH,
      }),
    )
    .matches(
      VALIDATION_PATTERNS.CAPITALIZE_FIRST_LETTER,
      t(`${VALIDATION_KEY}.errorCapitalName`),
    )
    .required(t(`${VALIDATION_KEY}.errorNameRequired`))
    .max(
      VALIDATION_LIMITS.PRODUCT_NAME_MAX_LENGTH,
      t(`${VALIDATION_KEY}.errorMaxName`, {
        max: VALIDATION_LIMITS.PRODUCT_NAME_MAX_LENGTH,
      }),
    ),
  description: yup
    .string()
    .min(
      VALIDATION_LIMITS.PRODUCT_DESCRIPTION_MIN_LENGTH,
      t(`${VALIDATION_KEY}.errorDescription`, {
        min: VALIDATION_LIMITS.PRODUCT_DESCRIPTION_MIN_LENGTH,
      }),
    )
    .required(t(`${VALIDATION_KEY}.errorDescriptionRequired`))
    .max(
      VALIDATION_LIMITS.PRODUCT_DESCRIPTION_MAX_LENGTH,
      t(`${VALIDATION_KEY}.errorMaxDesc`, {
        max: VALIDATION_LIMITS.PRODUCT_DESCRIPTION_MAX_LENGTH,
      }),
    ),
});

export type TChooseProductValues = yup.InferType<typeof chooseProductSchema>;
