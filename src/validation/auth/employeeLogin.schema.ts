import * as yup from 'yup';

import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS
} from 'constants/validationPatternConstants';
import { t } from 'i18n';

const VALIDATION_KEY = 'LoginPage';
const requiredField = `${VALIDATION_KEY}.requiredField`;

export const employeeLoginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required(t(requiredField))
    .matches(
      VALIDATION_PATTERNS.EMAIL,
      t(`${VALIDATION_KEY}.email.errorPattern`),
    )
    .max(
      VALIDATION_LIMITS.EMAIL_MAX_LENGTH,
      t(`${VALIDATION_KEY}.email.errorMaxLen`),
    ),
});

export type TEmployeeLoginValues = yup.InferType<typeof employeeLoginSchema>;
