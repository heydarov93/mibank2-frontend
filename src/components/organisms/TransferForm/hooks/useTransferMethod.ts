import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import { ETransferMethod } from '../enums/ETransferMethod';
import { SavedAccount } from '../interfaces/SavedAccount';

type FormLabelKey = (typeof formLabelKeys)[number];
type FormLabels = {
  [key in FormLabelKey]: string;
};

const patterns: Record<ETransferMethod, string> = {
  [ETransferMethod.CARD]: '#### #### #### ####',
  [ETransferMethod.IBAN]: `PL## #### #### #### #### #### ####`,
  [ETransferMethod.OWNCARDS]: '#### #### #### ####',
};

const formLabelKeys = [
  'fromFieldLabel',
  'toFieldLabel',
  'fromFieldPlaceholder',
  'toFieldPlaceholder',

  'amountFieldLabel',
  'amountFieldPlaceholder',
  'messageFieldLabel',
  'messageFieldPlaceholder',
  'cancel',
  'submit',
] as const;

function getFormLabels(
  method: ETransferMethod,
  translate: TFunction,
): FormLabels {
  const labels = {} as FormLabels;

  formLabelKeys.forEach((key) => {
    if (
      [
        'fromFieldLabel',
        'toFieldLabel',
        'fromFieldPlaceholder',
        'toFieldPlaceholder',
      ].includes(key)
    ) {
      labels[key] = translate(`${method.toLowerCase()}_${key}`);
    } else {
      labels[key] = translate(key);
    }
  });

  return labels;
}
// TODO: for mock data using only two temporary arrays for cards and ibans
// with real data we would have source cards and ibans -> user's own
// and target cards and ibans (or nothing) -> previously saved
const mockSavedCards: SavedAccount[] = [
  {
    id: '0',
    label: 'John Doe',
    number: '5487878165485698',
    issuer: 'visa',
  },
  {
    id: '1',
    label: 'Label',
    number: '8798216512688756',
    issuer: 'mastercard',
  },
  {
    id: '2',
    label: 'Jane Doe',
    number: '9512845612167854',
    issuer: 'visa',
  },
];

const mockSavedIBANs: SavedAccount[] = [
  {
    id: '0',
    label: 'Label1',
    number: 'PL46575498542417846541848724',
  },
  {
    id: '1',
    label: 'Label2',
    number: 'PL74654616517798121525445114',
  },
  {
    id: '2',
    label: 'Label3',
    number: 'PL15865464413544574245718469',
  },
];

export function useTransferMethod(method: ETransferMethod) {
  const { t } = useTranslation('translation', { keyPrefix: 'TransfersPage' });
  const isMethodIBAN = method === ETransferMethod.IBAN;

  return {
    labels: getFormLabels(method, t),
    inputPattern: patterns[method],
    savedTargets: isMethodIBAN ? mockSavedIBANs : mockSavedCards,
    savedSources: isMethodIBAN ? mockSavedIBANs : mockSavedCards,
  };
}
