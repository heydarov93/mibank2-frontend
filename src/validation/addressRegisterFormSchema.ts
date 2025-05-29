import * as yup from 'yup';

import { citiesInPoland } from 'constants/citiesInPoland';
import i18n from 'i18n';

const key = 'BusinessLoginPage.form.validation';
const requiredField = `${key}.required`;

export const addressRegisterFormSchema = yup.object().shape({
  country: yup.string().required(i18n.t(requiredField)),
  city: yup
    .string()
    .required(i18n.t(requiredField))
    .oneOf(
      citiesInPoland.map((city) => city.city),
      i18n.t(`${key}.cityNotFound`),
    ),
  street: yup
    .string()
    .required(i18n.t(requiredField))
    .max(100)
    .matches(/^[A-Za-z0-9\s\-.,]+$/, i18n.t(`${key}.streetFormat`)),
  building: yup
    .string()
    .required(i18n.t(requiredField))
    .max(50)
    .matches(/^[A-Za-z0-9\s-]+$/, i18n.t(`${key}.buildingFormat`)),
  office: yup
    .string()
    .required(i18n.t(requiredField))
    .max(30)
    .matches(/^[A-Za-z0-9\s-]+$/, i18n.t(`${key}.officeFormat`)),
  postcode: yup
    .string()
    .required(i18n.t(requiredField))
    .matches(/^\d{2}-\d{3}$/, i18n.t(`${key}.postcodeFormat`)),
});
