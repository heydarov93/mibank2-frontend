import * as yup from 'yup';

import { citiesInPoland } from 'constants/citiesInPoland';
import { VALIDATION_LIMITS, VALIDATION_PATTERNS } from 'constants/validationPatternConstants';
import { t } from 'i18n';

const VALIDATION_KEY = 'BusinessLoginPage.form.validation';
const requiredField = `${VALIDATION_KEY}.required`;

export const legalAddressRegisterSchema = yup.object().shape({
  country: yup.string().required(t(requiredField)),
  city: yup
    .string()
    .required(t(requiredField))
    .oneOf(
      citiesInPoland.map((city) => city.city),
      t(`${VALIDATION_KEY}.cityNotFound`),
    ),
  street: yup
    .string()
    .required(t(requiredField))
    .max(VALIDATION_LIMITS.STREET_MAX_LENGTH)
    .matches(
      VALIDATION_PATTERNS.STREET_ADDRESS,
      t(`${VALIDATION_KEY}.streetFormat`),
    ),
  building: yup
    .string()
    .required(t(requiredField))
    .max(VALIDATION_LIMITS.BUILDING_MAX_LENGTH)
    .matches(
      VALIDATION_PATTERNS.BUILDING_NUMBER,
      t(`${VALIDATION_KEY}.buildingFormat`),
    ),
  office: yup
    .string()
    .required(t(requiredField))
    .max(VALIDATION_LIMITS.OFFICE_MAX_LENGTH)
    .matches(
      VALIDATION_PATTERNS.OFFICE_NUMBER,
      t(`${VALIDATION_KEY}.officeFormat`),
    ),
  postcode: yup
    .string()
    .required(t(requiredField))
    .matches(
      VALIDATION_PATTERNS.POLISH_POSTCODE,
      t(`${VALIDATION_KEY}.postcodeFormat`),
    ),
});

export type TLegalAddressRegisterValues = yup.InferType<typeof legalAddressRegisterSchema>;
