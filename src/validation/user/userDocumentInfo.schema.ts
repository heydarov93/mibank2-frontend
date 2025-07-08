import * as yup from 'yup';

import { VALIDATION_LIMITS, VALIDATION_PATTERNS } from 'constants/validationPatternConstants';
import i18n from 'i18n';

const VALIDATION_KEY = 'RegistrationPage';
const requiredField = `${VALIDATION_KEY}.requiredField`;

export const userDocumentInfoSchema = yup.object().shape({
  documentNumber: yup
    .string()
    .required(i18n.t(requiredField))
    .matches(
      VALIDATION_PATTERNS.DOCUMENT_NUMBER,
      i18n.t(`${VALIDATION_KEY}.errorPassportNumFormat`),
    )
    .min(
      VALIDATION_LIMITS.DOCUMENT_NUMBER_MIN_LENGTH,
      i18n.t(`${VALIDATION_KEY}.errorPassportNumMinLen`),
    )
    .max(
      VALIDATION_LIMITS.DOCUMENT_NUMBER_MAX_LENGTH,
      i18n.t(`${VALIDATION_KEY}.errorPassportNumMaxLen`),
    ),
  issueDate: yup.string().required(i18n.t(requiredField)),
  expirationDate: yup.string().required(i18n.t(requiredField)),
});

export const EUDocumentInfoSchema = yup.object().shape({
  documentNumber: yup
    .string()
    .required(i18n.t(requiredField))
    .matches(
      VALIDATION_PATTERNS.DOCUMENT_NUMBER,
      i18n.t(`${VALIDATION_KEY}.errorIdCardNumFormat`),
    )
    .max(
      VALIDATION_LIMITS.DOCUMENT_NUMBER_MAX_LENGTH,
      i18n.t(`${VALIDATION_KEY}.errorIdCardNumMaxLen`),
    )
    .min(
      VALIDATION_LIMITS.DOCUMENT_NUMBER_MIN_LENGTH,
      i18n.t(`${VALIDATION_KEY}.errorIdCardNumMinLen`),
    ),
  issueDate: yup.string().required(i18n.t(requiredField)),
  expirationDate: yup.string().required(i18n.t(requiredField)),
});

export type TUserDocumentInfoValues = yup.InferType<
  typeof userDocumentInfoSchema
>;
