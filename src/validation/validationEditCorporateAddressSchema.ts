import * as yup from 'yup';

import { REG_EXP } from './regExp';

import i18n from 'i18n';

const personalPage = 'RegistrationPage';

export const validationEditCorporateAddressSchema = yup.object().shape({
  country: yup.string().required(),
  office: yup
    .string()
    .trim()
    .required(i18n.t(`${personalPage}.requiredField`))
    .matches(
      REG_EXP.latinLettersDigitsSpecialRegExp,
      i18n.t(`${personalPage}.errorBuildingAndApartmentFormat`),
    )
    .max(10, i18n.t(`${personalPage}.errorMaxLenBuilding`)),
  city: yup.string().required(i18n.t(`${personalPage}.requiredField`)),
  street: yup
    .string()
    .trim()
    .required(i18n.t(`${personalPage}.requiredField`))
    .matches(REG_EXP.streetRegExp, i18n.t(`${personalPage}.nameErrorPattern`))
    .max(100, i18n.t(`${personalPage}.errorMaxLenStreet`)),
  building: yup
    .string()
    .trim()
    .required(i18n.t(`${personalPage}.requiredField`))
    .matches(
      REG_EXP.latinLettersDigitsSpecialRegExp,
      i18n.t(`${personalPage}.errorBuildingAndApartmentFormat`),
    )
    .max(10, i18n.t(`${personalPage}.errorMaxLenBuilding`)),
  postcode: yup
    .string()
    .trim()
    .required(i18n.t(`${personalPage}.requiredField`))
    .matches(
      REG_EXP.DigitsRegExp,
      i18n.t(`${personalPage}.errorPostcodeFormat`),
    )
    .max(6, i18n.t(`${personalPage}.errorPostcodeMaxLength`))
    .min(6, i18n.t(`${personalPage}.errorPostcodeMinLength`)),
});

export type CorporateAddressFormValues = yup.InferType<
  typeof validationEditCorporateAddressSchema
>;
