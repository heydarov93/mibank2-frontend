import { useGetIBANAccounts } from './useGetIBANAccounts';
import { useGetCardAccounts } from './userGetCardAccounts';

import { TTransferMethod } from 'pages/TransfersPage/TransfersPage';

export type CardIssuer = 'visa' | 'mastercard';

export interface IUserIBANAccount {
  type: 'iban';
  id: string;
  number: string;
  currency: string;
  balance: number;
}

export interface IUserCardAccount {
  type: 'card';
  id: string;
  number: string;
  currency: string;
  balance: number;
  issuer: CardIssuer;
}

export interface ISavedIBANAccount {
  type: 'iban';
  id: string;
  number: string;
  label: string;
}

export interface ISavedCardAccount {
  type: 'card';
  id: string;
  number: string;
  label: string;
  issuer: CardIssuer;
}

export function useAccounts(method: TTransferMethod) {
  const isMethodIBAN = method === 'iban';

  const {
    data: ibanAccounts,
    isLoading: isLoadingIBAN,
    isError: isErrorIBAN,
  } = useGetIBANAccounts(!isMethodIBAN);

  const {
    data: cardAccounts,
    isLoading: isLoadingCard,
    isError: isErrorCard,
  } = useGetCardAccounts(isMethodIBAN);

  // TODO: replace mock data with user's saved accounts/cards
  const mockSavedCards: ISavedCardAccount[] = [
    {
      type: 'card',
      id: '0',
      label: 'John Doe',
      number: '4111111111111111',
      issuer: 'visa',
    },
    {
      type: 'card',
      id: '1',
      label: 'Label',
      number: '5500000000000004',
      issuer: 'mastercard',
    },
    {
      type: 'card',
      id: '2',
      label: 'Jane Doe',
      number: '4000056655665556',
      issuer: 'visa',
    },
  ];

  const mockSavedIBANs: ISavedIBANAccount[] = [
    {
      type: 'iban',
      id: '0',
      label: 'Label1',
      number: 'PL80123200246898084174697414',
    },
    {
      type: 'iban',
      id: '1',
      label: 'Label2',
      number: 'PL51123200247974886034762171',
    },
    {
      type: 'iban',
      id: '2',
      label: 'Label3',
      number: 'PL15123200143232775478665823',
    },
  ];

  if (isMethodIBAN) {
    return {
      fromAccounts: ibanAccounts,
      toAccounts: mockSavedIBANs,
      isLoading: isLoadingIBAN,
      isError: isErrorIBAN,
    };
  } else {
    return {
      fromAccounts: cardAccounts,
      toAccounts: mockSavedCards,
      isLoading: isLoadingCard,
      isError: isErrorCard,
    };
  }
}
