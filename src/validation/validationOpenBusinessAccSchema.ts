import * as yup from 'yup';

import i18n from 'i18n';

export const selectsSchema = yup.object().shape({
  currency: yup
    .string()
    .required(i18n.t('OpenBusinessAccountModal.errors.requiredField')),
  cardIssuer: yup
    .string()
    .required(i18n.t('OpenBusinessAccountModal.errors.requiredField')),
  issueType: yup
    .string()
    .required(i18n.t('OpenBusinessAccountModal.errors.requiredField')),
});

export const validationOpenBusinessAccSchema = yup
  .object()
  .shape({
    addressConfirmed: yup
      .bool()
      .oneOf([true], i18n.t('OpenBusinessAccountModal.errors.confirmAddress')),
    termsAccepted: yup
      .bool()
      .oneOf([true], i18n.t('OpenBusinessAccountModal.errors.termsAccepted')),
  })
  .concat(selectsSchema);
