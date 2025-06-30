import { skipToken } from '@reduxjs/toolkit/query';

import { IUserCardAccount } from './useAccounts';

import { useGetCardAccountsQuery } from 'api/accountsApi';
import { useGetUserIdQuery } from 'api/getUserIdApi';
export function useGetCardAccounts(skipQuery: boolean) {
  const { data } = useGetUserIdQuery();

  const { isLoading, isError } = useGetCardAccountsQuery(
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
}
