import * as Yup from 'yup';

import i18n from 'i18n';

export const productFormSchema = Yup.object({
  product: Yup.string().required(
    i18n.t('BackOffice.CreateProduct.errorProductRequired'),
  ),
  type: Yup.string().required(
    i18n.t('BackOffice.CreateProduct.errorSubtypeRequired'),
  ),
  currency: Yup.string().required(
    i18n.t('BackOffice.CreateProduct.errorCurrencyRequired'),
  ),
  name: Yup.string()
    .min(3, i18n.t('BackOffice.CreateProduct.errorProductName'))
    .matches(/^[A-Z]/, i18n.t('BackOffice.CreateProduct.errorCapitalName'))
    .required(i18n.t('BackOffice.CreateProduct.errorNameRequired')),
  description: Yup.string()
    .min(10, i18n.t('BackOffice.CreateProduct.errorDescription'))
    .required(i18n.t('BackOffice.CreateProduct.errorDescriptionRequired')),
});
