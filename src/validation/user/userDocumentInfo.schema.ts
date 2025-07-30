import * as yup from 'yup';

import { t } from 'config';
import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from 'constants/validation/patterns';

const VALIDATION_KEY = 'RegistrationPage';
const requiredField = `${VALIDATION_KEY}.requiredField`;

export const userDocumentInfoSchema = yup.object().shape({
  documentNumber: yup
    .string()
    .required(t(requiredField))
    .matches(
      VALIDATION_PATTERNS.DOCUMENT_NUMBER,
      t(`${VALIDATION_KEY}.errorPassportNumFormat`),
    )
    .min(
      VALIDATION_LIMITS.DOCUMENT_NUMBER_MIN_LENGTH,
      t(`${VALIDATION_KEY}.errorPassportNumMinLen`),
    )
    .max(
      VALIDATION_LIMITS.DOCUMENT_NUMBER_MAX_LENGTH,
      t(`${VALIDATION_KEY}.errorPassportNumMaxLen`),
    ),
  issueDate: yup.string().required(t(requiredField)),
  expirationDate: yup.string().required(t(requiredField)),
});

export const EUDocumentInfoSchema = yup.object().shape({
  documentNumber: yup
    .string()
    .required(t(requiredField))
    .matches(
      VALIDATION_PATTERNS.DOCUMENT_NUMBER,
      t(`${VALIDATION_KEY}.errorIdCardNumFormat`),
    )
    .max(
      VALIDATION_LIMITS.DOCUMENT_NUMBER_MAX_LENGTH,
      t(`${VALIDATION_KEY}.errorIdCardNumMaxLen`),
    )
    .min(
      VALIDATION_LIMITS.DOCUMENT_NUMBER_MIN_LENGTH,
      t(`${VALIDATION_KEY}.errorIdCardNumMinLen`),
    ),
  issueDate: yup.string().required(t(requiredField)),
  expirationDate: yup.string().required(t(requiredField)),
});

export type TUserDocumentInfoValues = yup.InferType<
  typeof userDocumentInfoSchema
>;
