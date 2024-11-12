import * as yup from 'yup';

import { REG_EXP } from './regExp';

import i18n from 'i18n';
const personalPage = 'RegistrationPage';

export const validationAddressSchema = yup.object().shape({
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
      REG_EXP.latinLettersAndDigitsRegExp,
      i18n.t(`${personalPage}.errorBuildingAndApartmentFormat`),
    )
    .max(10, i18n.t(`${personalPage}.errorMaxLenBuilding`)),
  apartment: yup
    .string()
    .trim()
    .required(i18n.t(`${personalPage}.requiredField`))
    .matches(
      REG_EXP.latinLettersAndDigitsRegExp,
      i18n.t(`${personalPage}.errorBuildingAndApartmentFormat`),
    )
    .max(10, i18n.t(`${personalPage}.errorMaxLenApartment`)),
});
