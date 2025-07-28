import * as yup from 'yup';

import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from 'constants/validation/patterns';
import { t } from 'i18n';

const VALIDATION_KEY = 'RegistrationPage';
const requiredField = `${VALIDATION_KEY}.requiredField`;

export const editCorporateAddressSchema = yup.object().shape({
  country: yup.string().required(),
  office: yup
    .string()
    .trim()
    .required(t(requiredField))
    .matches(
      VALIDATION_PATTERNS.LATIN_ONLY_SPECIAL,
      t(`${VALIDATION_KEY}.errorBuildingAndApartmentFormat`),
    )
    .max(
      VALIDATION_LIMITS.OFFICE_MAX_LENGTH,
      t(`${VALIDATION_KEY}.errorMaxLenBuilding`),
    ),
  city: yup.string().required(t(requiredField)),
  street: yup
    .string()
    .trim()
    .required(t(requiredField))
    .matches(
      VALIDATION_PATTERNS.STREET,
      t(`${VALIDATION_KEY}.nameErrorPattern`),
    )
    .max(
      VALIDATION_LIMITS.STREET_MAX_LENGTH,
      t(`${VALIDATION_KEY}.errorMaxLenStreet`),
    ),
  building: yup
    .string()
    .trim()
    .required(t(requiredField))
    .matches(
      VALIDATION_PATTERNS.LATIN_ONLY_SPECIAL,
      t(`${VALIDATION_KEY}.errorBuildingAndApartmentFormat`),
    )
    .max(
      VALIDATION_LIMITS.BULDING_MAX_LENGTH,
      t(`${VALIDATION_KEY}.errorMaxLenBuilding`),
    ),
  postcode: yup
    .string()
    .trim()
    .required(t(requiredField))
    .matches(
      VALIDATION_PATTERNS.DIGITS_SPECIAL,
      t(`${VALIDATION_KEY}.errorPostcodeFormat`),
    )
    .max(
      VALIDATION_LIMITS.POSTCODE_LENGTH,
      t(`${VALIDATION_KEY}.errorPostcodeMaxLength`),
    )
    .min(
      VALIDATION_LIMITS.POSTCODE_LENGTH,
      t(`${VALIDATION_KEY}.errorPostcodeMinLength`),
    ),
});

export type TEditCorporateAddressValues = yup.InferType<
  typeof editCorporateAddressSchema
>;
