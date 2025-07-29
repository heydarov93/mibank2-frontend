import * as yup from 'yup';

import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from 'constants/validation/patterns';
import { t } from 'i18n';
import { removeSpaces } from 'utils/helpers/validationHelpers';

const VALIDATION_KEY = 'BusinessSignUpPage.form.error';
const requiredField = `${VALIDATION_KEY}.required`;

export const businessSignupSchema = yup.object().shape({
  companyName: yup
    .string()
    .trim()
    .transform(removeSpaces)
    .required(t(requiredField))
    .matches(
      VALIDATION_PATTERNS.COMPANY_NAME,
      t(`${VALIDATION_KEY}.invalidPattern`),
    )
    .max(
      VALIDATION_LIMITS.COMPANY_NAME_MAX_LENGTH,
      t(`${VALIDATION_KEY}.maxLen`),
    ),
  nip: yup
    .string()
    .trim()
    .transform(removeSpaces)
    .required(t(requiredField))
    .matches(VALIDATION_PATTERNS.POLISH_NIP, t(`${VALIDATION_KEY}.nipPattern`)),
  companyEmail: yup
    .string()
    .trim()
    .required(t(requiredField))
    .matches(VALIDATION_PATTERNS.EMAIL, t(`${VALIDATION_KEY}.emailPattern`))
    .max(
      VALIDATION_LIMITS.EMAIL_MAX_LENGTH,
      t(`${VALIDATION_KEY}.emailMaxLen`),
    ),
  ownerName: yup
    .string()
    .trim()
    .max(100, t(`${VALIDATION_KEY}.maxLen`))
    .test(
      'full-owner-name-validation',
      t(`${VALIDATION_KEY}.ownerNamePattern`),
      function (value) {
        if (!value) return true;

        const errors = [];

        if (!VALIDATION_PATTERNS.FULL_POLISH_ALLOWED_CHARS.test(value)) {
          errors.push(
            this.createError({
              message: t(`${VALIDATION_KEY}.ownerNameCharactersPattern`),
            }),
          );
        }

        if (!VALIDATION_PATTERNS.FULL_POLISH_NAME.test(value)) {
          errors.push(
            this.createError({
              message: t(`${VALIDATION_KEY}.ownerNamePattern`),
            }),
          );
        }

        console.log(errors);
        if (errors.length > 0) {
          throw new yup.ValidationError(errors);
        }

        return true;
      },
    )
    .required(t(requiredField)),
});

export type TBusinessSignupValues = yup.InferType<typeof businessSignupSchema>;
