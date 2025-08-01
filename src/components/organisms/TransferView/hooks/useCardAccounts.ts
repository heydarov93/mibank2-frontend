import { skipToken } from '@reduxjs/toolkit/query';

import { IUserCardAccount } from './useTransferAccounts';

import { useGetAccountByCardQuery } from 'api/services/account-service/accounts.api';
import { useGetUserIdQuery } from 'api/services/user-account-service/get-user-id.api';
export const useCardAccounts = (skipQuery: boolean) => {
  const { data } = useGetUserIdQuery();

  const { isLoading, isError } = useGetAccountByCardQuery(
    data && !skipQuery ? { userId: data.userId } : skipToken,
  );

  const accounts: IUserCardAccount[] | undefined = [
    {
      type: 'card',
      id: '546545',
      number: '4556737586899855',
      currency: 'JPY',
      balance: 23,
      issuer: 'visa',
    },
  ];

  return { data: accounts, isLoading, isError };
};
