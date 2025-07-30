import * as yup from 'yup';

import { t } from 'config';
import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from 'constants/validation/patterns';
import { removeSpaces } from 'utils/helpers/validationHelpers';

const VALIDATION_KEY = 'BusinessSignUpPage.form.error';
const requiredField = `${VALIDATION_KEY}.required`;

export const businessSignupSchema = yup.object().shape({
  companyName: yup
    .string()
    .trim()
    .transform(removeSpaces)
    .matches(
      VALIDATION_PATTERNS.COMPANY_NAME,
      t(`${VALIDATION_KEY}.invalidPattern`),
    )
    .max(
      VALIDATION_LIMITS.COMPANY_NAME_MAX_LENGTH,
      t(`${VALIDATION_KEY}.maxLen`),
    )
    .required(t(requiredField)),
  nip: yup
    .string()
    .trim()
    .transform(removeSpaces)
    .matches(VALIDATION_PATTERNS.POLISH_NIP, t(`${VALIDATION_KEY}.nipPattern`))
    .required(t(requiredField)),
  companyEmail: yup
    .string()
    .trim()
    .matches(VALIDATION_PATTERNS.EMAIL, t(`${VALIDATION_KEY}.emailPattern`))
    .max(VALIDATION_LIMITS.EMAIL_MAX_LENGTH, t(`${VALIDATION_KEY}.emailMaxLen`))
    .required(t(requiredField)),
  ownerName: yup
    .string()
    .trim()
    .max(100, t(`${VALIDATION_KEY}.maxLen`))
    .matches(
      VALIDATION_PATTERNS.FULL_POLISH_NAME,
      t(`${VALIDATION_KEY}.ownerNamePattern`),
    )
    .required(t(requiredField)),
});

export type TBusinessSignupValues = yup.InferType<typeof businessSignupSchema>;
