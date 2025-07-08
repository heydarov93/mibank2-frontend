import * as yup from 'yup';

import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from 'constants/validationPatternConstants';
import { t } from 'i18n';
import { hasOnlyOneCapitalLetter } from 'utils/helpers/validationHelpers';

const VALIDATION_KEY = 'BackOffice.addNewEmployee';
const requiredField = 'BackOffice.addNewEmployee.errorFieldRequired';

export const employeeRoles = [
  t(`${VALIDATION_KEY}.admin`),
  t(`${VALIDATION_KEY}.employee`),
];

export const employeeSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required(t(requiredField))
    .test(
      'only-one-capital-letter',
      t(`${VALIDATION_KEY}.errorOnlyCapitalLetter`),
      hasOnlyOneCapitalLetter,
    )
    .matches(VALIDATION_PATTERNS.NAME, t(`${VALIDATION_KEY}.errorLetters`))
    .matches(
      VALIDATION_PATTERNS.CAPITALIZE_LETTERS,
      t(`${VALIDATION_KEY}.errorFirstLetter`),
    )
    .min(
      VALIDATION_LIMITS.NAME_MIN_LENGTH,
      t(`${VALIDATION_KEY}.errorFirstNameMin`),
    )
    .max(
      VALIDATION_LIMITS.NAME_MAX_LENGTH,
      t(`${VALIDATION_KEY}.errorFirstNameMax`),
    ),
  lastName: yup
    .string()
    .trim()
    .required(t(requiredField))
    .test(
      'only-one-capital-letter',
      t(`${VALIDATION_KEY}.errorOnlyCapitalLetter`),
      hasOnlyOneCapitalLetter,
    )
    .matches(VALIDATION_PATTERNS.NAME, t(`${VALIDATION_KEY}.errorLetters`))
    .matches(
      VALIDATION_PATTERNS.CAPITALIZE_LETTERS,
      t(`${VALIDATION_KEY}.errorFirstLetter`),
    )
    .min(
      VALIDATION_LIMITS.NAME_MIN_LENGTH,
      t(`${VALIDATION_KEY}.errorLastNameMin`),
    )
    .max(
      VALIDATION_LIMITS.NAME_MAX_LENGTH,
      t(`${VALIDATION_KEY}.errorLastNameMax`),
    ),
  email: yup
    .string()
    .trim()
    .required(t(requiredField))
    .matches(VALIDATION_PATTERNS.EMAIL, t(`${VALIDATION_KEY}.errorEmail`))
    .max(VALIDATION_LIMITS.EMAIL_MAX_LENGTH),
  role: yup.string().required(t(requiredField)),
  dateAdded: yup.string().trim().required(t(requiredField)),
});

export type TEmployeeValues = yup.InferType<typeof employeeSchema>;
