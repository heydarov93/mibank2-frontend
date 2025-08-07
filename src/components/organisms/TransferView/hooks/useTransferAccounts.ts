import { useCardAccounts } from './useCardAccounts';
import { useIBANAccounts } from './useIBANAccounts';

import { ISavedCardAccount, ISavedIBANAccount } from 'models/IAccount';
import { TTransferMethod } from 'types/types';


export const useTransferAccounts = (method: TTransferMethod) => {
  const isMethodIBAN = method === 'iban';

  const {
    data: ibanAccounts,
    isLoading: isLoadingIBAN,
    isError: isErrorIBAN,
  } = useIBANAccounts(!isMethodIBAN);

  const {
    data: cardAccounts,
    isLoading: isLoadingCard,
    isError: isErrorCard,
  } = useCardAccounts(isMethodIBAN);

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
};
