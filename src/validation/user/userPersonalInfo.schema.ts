import * as yup from 'yup';

import { t } from 'config';
import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from 'constants/validation/patterns';
import {
  hasOnlyOneCapitalLetter,
  isValidPhoneLength,
} from 'utils/helpers/validationHelpers';

const VALIDATION_KEY = 'RegistrationPage';
const requiredField = `${VALIDATION_KEY}.requiredField`;

export const userPersonalInfoSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(t(requiredField))
    .test(
      'only-one-capital-letter',
      t(`${VALIDATION_KEY}.errorDoubleCapitalName`),
      hasOnlyOneCapitalLetter,
    )
    .matches(VALIDATION_PATTERNS.NAME, t(`${VALIDATION_KEY}.nameErrorPattern`))
    .matches(
      VALIDATION_PATTERNS.CAPITALIZE_LETTERS,
      t(`${VALIDATION_KEY}.errorNonCapitalName`),
    )

    .max(
      VALIDATION_LIMITS.FIRST_NAME_MAX_LENGTH,
      t(`${VALIDATION_KEY}.errorMaxLenName`),
    ),
  surname: yup
    .string()
    .trim()
    .required(t(requiredField))
    .test(
      'only-one-capital-letter',
      t(`${VALIDATION_KEY}.errorDoubleCapitalName`),
      hasOnlyOneCapitalLetter,
    )
    .matches(VALIDATION_PATTERNS.NAME, t(`${VALIDATION_KEY}.nameErrorPattern`))
    .matches(
      VALIDATION_PATTERNS.CAPITALIZE_LETTERS,
      t(`${VALIDATION_KEY}.errorNonCapitalName`),
    )
    .max(
      VALIDATION_LIMITS.LAST_NAME_MAX_LENGTH,
      t(`${VALIDATION_KEY}.errorMaxLenSurname`),
    ),
  dateOfBirth: yup.string().trim().required(t(requiredField)),
  phoneNumber: yup
    .string()
    .required(t(requiredField))
    .test(
      'len',
      t(`${VALIDATION_KEY}.phoneNumber.errorInvalid`),
      isValidPhoneLength,
    ),
});

export type TUserPersonalInfoValues = yup.InferType<
  typeof userPersonalInfoSchema
>;
