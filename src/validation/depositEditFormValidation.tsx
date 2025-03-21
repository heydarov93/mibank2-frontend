import * as Yup from 'yup';

import i18n from 'i18n';

const minNameChars = 3;
const maxNameChars = 150;
const minDescChars = 10;
const maxDescChars = 500;

const depositEditValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(i18n.t('BackOffice.depositEditFormErrors.depNameReq'))
    .min(
      minNameChars,
      i18n.t('BackOffice.depositEditFormErrors.depNameChars', {
        min: minNameChars,
      }),
    )
    .max(
      maxNameChars,
      i18n.t('BackOffice.depositEditFormErrors.depNameMax', {
        max: maxNameChars,
      }),
    )
    .matches(/^[A-Z]/, i18n.t('BackOffice.depositEditFormErrors.depNameMatch')),

  description: Yup.string()
    .required(i18n.t('BackOffice.depositEditFormErrors.descReq'))
    .min(
      minDescChars,
      i18n.t('BackOffice.depositEditFormErrors.descMin', { min: minDescChars }),
    )
    .max(
      maxDescChars,
      i18n.t('BackOffice.depositEditFormErrors.descMax', { max: maxDescChars }),
    ),

  currency: Yup.string()
    .required(i18n.t('BackOffice.depositEditFormErrors.currencyReq'))
    .oneOf(
      ['PLN', 'EUR', 'CHF', 'GBP', 'JPY', 'USD'],
      i18n.t('BackOffice.depositEditFormErrors.currencyReq'),
    ),

  min: Yup.string()
    .required(i18n.t('BackOffice.depositEditFormErrors.minSum'))
    .matches(/^\d*\.?\d+$/, i18n.t('BackOffice.depositEditFormErrors.sumValid'))
    .test(
      'is-positive',
      i18n.t('BackOffice.depositEditFormErrors.minDepositPositive'),
      (value) => value !== undefined && parseFloat(value) > 0,
    )
    .test(
      'min-value',
      i18n.t('BackOffice.depositEditFormErrors.minDepositSum'),
      (value) => value !== undefined && parseFloat(value) >= 1,
    )
    .test(
      'maxLessThanMin',
      i18n.t('BackOffice.depositEditFormErrors.minMoreThanMax'),
      function (value) {
        const { maximumDepositSum } = this.parent;
        if (!value || !maximumDepositSum) return true;
        return parseFloat(value) < parseFloat(maximumDepositSum);
      },
    ),

  max: Yup.string()
    .required(i18n.t('BackOffice.depositEditFormErrors.maxReq'))
    .matches(/^\d*\.?\d+$/, i18n.t('BackOffice.depositEditFormErrors.validNum'))
    .test(
      'is-positive',
      i18n.t('BackOffice.depositEditFormErrors.depTermReq'),
      (value) => value !== undefined && parseFloat(value) > 0,
    )
    .test(
      'moreThanMin',
      i18n.t('BackOffice.depositEditFormErrors.maxReq'),
      function (value) {
        const { minimumDepositSum } = this.parent;
        if (!value || !minimumDepositSum) return true;
        return parseFloat(value) > parseFloat(minimumDepositSum);
      },
    ),

  term: Yup.string()
    .required(i18n.t('BackOffice.depositEditFormErrors.depTermReq'))
    .matches(/^\d+$/, i18n.t('BackOffice.depositEditFormErrors.depTermWhole'))
    .test(
      'is-positive',
      i18n.t('BackOffice.depositEditFormErrors.depTermPos'),
      (value) => value !== undefined && parseInt(value) > 0,
    )
    .test(
      'min-value',
      i18n.t('BackOffice.depositEditFormErrors.depTermMin'),
      (value) => value !== undefined && parseInt(value) >= 1,
    ),
  interestRate: Yup.string()
    .required(i18n.t('BackOffice.depositEditFormErrors.depInterestRate'))
    .matches(/^\d*\.?\d+$/, 'Must be a valid number')
    .test(
      'is-positive',
      i18n.t('BackOffice.depositEditFormErrors.depInterestRatePos'),
      (value) => value !== undefined && parseFloat(value) > 0,
    )
    .test(
      'min-value',
      i18n.t('BackOffice.depositEditFormErrors.depInterestRateMin'),
      (value) => value !== undefined && parseFloat(value) >= 0.01,
    ),

  capitalization: Yup.string()
    .required(i18n.t('BackOffice.depositEditFormErrors.depCapRate'))
    .matches(/^\d+$/, i18n.t('BackOffice.depositEditFormErrors.depTermWhole'))
    .test(
      'is-positive',
      i18n.t('BackOffice.depositEditFormErrors.depCapRatePos'),
      (value) => value !== undefined && parseInt(value) > 0,
    )
    .test(
      'min-value',
      i18n.t('BackOffice.depositEditFormErrors.depCapRateMin'),
      (value) => value !== undefined && parseInt(value) >= 0.1,
    ),

  earlyWithdrawalLimit: Yup.string()
    .required(i18n.t('BackOffice.depositEditFormErrors.earlyWdReq'))
    .matches(/^\d*\.?\d+$/, i18n.t('BackOffice.depositEditFormErrors.validNum'))
    .test(
      'not-negative',
      i18n.t('BackOffice.depositEditFormErrors.earlyWdLimitNeg'),
      (value) => value !== undefined && parseFloat(value) >= 0,
    ),

  earlyWithdrawalFee: Yup.string()
    .required(i18n.t('BackOffice.depositEditFormErrors.wdFeeReq'))
    .matches(/^\d*\.?\d+$/, i18n.t('BackOffice.depositEditFormErrors.validNum'))
    .test(
      'not-negative',
      i18n.t('BackOffice.depositEditFormErrors.wdFeeNeg'),
      (value) => value !== undefined && parseFloat(value) >= 0,
    ),
});

export default depositEditValidationSchema;
