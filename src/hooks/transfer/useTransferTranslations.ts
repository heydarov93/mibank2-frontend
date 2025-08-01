import { useTranslation } from 'react-i18next';

import { TTransferMethod } from 'pages/TransfersPage/TransfersPage';

export const useTransferTranslations = (method: TTransferMethod) => {
  const { t } = useTranslation('translation', { keyPrefix: 'TransfersPage' });

  const isMethodIBAN = method === 'iban';
  const fieldConfig = {
    fromAccount: {
      label: isMethodIBAN ? 'ibanFromFieldLabel' : 'cardFromFieldLabel',
      placeholder: isMethodIBAN
        ? 'ibanFromFieldPlaceholder'
        : 'cardFromFieldPlaceholder',
    },
    toAccount: {
      label: isMethodIBAN ? 'ibanToFieldLabel' : 'cardToFieldLabel',
      placeholder: isMethodIBAN
        ? 'ibanToFieldPlaceholder'
        : 'cardToFieldPlaceholder',
    },
    amount: {
      label: 'amountFieldLabel',
      placeholder: 'amountFieldPlaceholder',
    },
    message: {
      label: 'messageFieldLabel',
      placeholder: 'messageFieldPlaceholder',
    },
    currency: {
      label: 'currencyFieldLabel',
      placeholder: 'currencyFieldPlaceholder',
    },
  };

  type FieldTranslations = {
    [K in keyof typeof fieldConfig]: {
      label: string;
      placeholder: string;
    };
  };

  const translatedFields: FieldTranslations = Object.fromEntries(
    Object.entries(fieldConfig).map(([key, val]) => [
      key,
      {
        label: t(val.label),
        placeholder: t(val.placeholder),
      },
    ]),
  ) as FieldTranslations;

  return {
    ...translatedFields,
    transferAll: t('transferAll'),
    cancel: t('cancel'),
    submit: t('submit'),
  };
}
