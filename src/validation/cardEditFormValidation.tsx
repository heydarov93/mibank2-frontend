import * as Yup from 'yup';

import i18n from 'i18n';

export const cardEditFormSchema = Yup.object().shape({
  cardName: Yup.string()
    .min(3, i18n.t('BackOffice.cardEditFormErrors.cardName'))
    .matches(
      /^[A-Z][a-z]*$/,
      i18n.t('BackOffice.cardEditFormErrors.capitalLetter'),
    )
    .required(i18n.t('BackOffice.cardEditFormErrors.cardNameReq')),
  cardDescription: Yup.string()
    .min(10, i18n.t('BackOffice.cardEditFormErrors.description'))
    .required(i18n.t('BackOffice.cardEditFormErrors.provideDescription')),
  cardCurrency: Yup.string().required(
    i18n.t('BackOffice.cardEditFormErrors.cardCurrencyReq'),
  ),
  cardCashbackRate: Yup.string()
    .required(i18n.t('BackOffice.cardEditFormErrors.cashback'))
    .matches(
      /^\d*\.?\d+$/,
      i18n.t('BackOffice.cardEditFormErrors.cashbackRate'),
    ),
  monthlyFee: Yup.string()
    .required(i18n.t('BackOffice.cardEditFormErrors.fee'))
    .matches(/^\d*\.?\d+$/, i18n.t('BackOffice.cardEditFormErrors.feeNumber')),
  dailyOperationalLimit: Yup.string()
    .required(i18n.t('BackOffice.cardEditFormErrors.opLimit'))
    .matches(
      /^\d*\.?\d+$/,
      i18n.t('BackOffice.cardEditFormErrors.opLimitNumber'),
    ),
  foreignTransactionLimit: Yup.string()
    .required(i18n.t('BackOffice.cardEditFormErrors.foreignTransaction'))
    .matches(/^\d*\.?\d+$/, i18n.t('BackOffice.cardEditFormErrors.foreignNum')),
});
