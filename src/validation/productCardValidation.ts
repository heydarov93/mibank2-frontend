import * as yup from 'yup';

import i18n from 'i18n';

export const productCardValidation = yup.object().shape({
  cashbackRate: yup
    .number()
    .required(i18n.t('BackOffice.VisaCard.required'))
    .typeError(i18n.t(`BackOffice.VisaCard.number`))
    .test(
      'decimal-places',
      i18n.t(`BackOffice.VisaCard.decimal`),
      (value) =>
        value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString()),
    ),
  monthlyFee: yup
    .number()
    .required(i18n.t('BackOffice.VisaCard.required'))
    .typeError(i18n.t(`BackOffice.VisaCard.number`))
    .test(
      'decimal-places',
      i18n.t(`BackOffice.VisaCard.decimal`),
      (value) =>
        value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString()),
    ),
  dailyLimit: yup
    .number()
    .required(i18n.t('BackOffice.VisaCard.required'))
    .typeError(i18n.t(`BackOffice.VisaCard.number`))
    .test(
      'decimal-places',
      i18n.t(`BackOffice.VisaCard.decimal`),
      (value) =>
        value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString()),
    ),
  foreignTransactionLimit: yup
    .number()
    .required(i18n.t('BackOffice.VisaCard.required'))
    .typeError(i18n.t(`BackOffice.VisaCard.number`))
    .test(
      'decimal-places',
      i18n.t(`BackOffice.VisaCard.decimal`),
      (value) =>
        value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString()),
    ),
  cardIssuer: yup.string().required(i18n.t('BackOffice.VisaCard.required')),
  cardType: yup.string().required(i18n.t('BackOffice.VisaCard.required')),
});
