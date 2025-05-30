import * as Yup from 'yup';

import i18n from 'i18n';

const minNameChars = 3;
const maxNameChars = 150;
const minDescChars = 10;
const maxDescChars = 500;

export const productFormSchema = Yup.object({
  productType: Yup.string().required(
    i18n.t('BackOffice.CreateProduct.errorProductRequired'),
  ),
  subtype: Yup.string().required(
    i18n.t('BackOffice.CreateProduct.errorSubtypeRequired'),
  ),
  currency: Yup.string().required(
    i18n.t('BackOffice.CreateProduct.errorCurrencyRequired'),
  ),
  name: Yup.string()
    .min(
      minNameChars,
      i18n.t('BackOffice.CreateProduct.errorProductName', {
        min: minNameChars,
      }),
    )
    .matches(/^[A-Z]/, i18n.t('BackOffice.CreateProduct.errorCapitalName'))
    .required(i18n.t('BackOffice.CreateProduct.errorNameRequired'))
    .max(
      maxNameChars,
      i18n.t('BackOffice.CreateProduct.errorMaxName', { max: maxNameChars }),
    ),
  description: Yup.string()
    .min(
      minDescChars,
      i18n.t('BackOffice.CreateProduct.errorDescription', {
        min: minDescChars,
      }),
    )
    .required(i18n.t('BackOffice.CreateProduct.errorDescriptionRequired'))
    .max(
      maxDescChars,
      i18n.t('BackOffice.CreateProduct.errorMaxDesc', { max: maxDescChars }),
    ),
});
