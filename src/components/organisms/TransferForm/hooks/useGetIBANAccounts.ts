import { skipToken } from '@reduxjs/toolkit/query';

import { IUserIBANAccount } from './useAccounts';

import { useGetIBANAccountsQuery } from 'api/accountsApi';
import { useGetUserIdQuery } from 'api/getUserIdApi';

export function useGetIBANAccounts(skipQuery: boolean) {
  const { data } = useGetUserIdQuery();

  const {
    data: accountsResponse,
    isLoading,
    isError,
  } = useGetIBANAccountsQuery(
    data && !skipQuery ? { userId: data.userId } : skipToken,
  );

  const accounts: IUserIBANAccount[] | undefined = accountsResponse?.map(
    (account) => ({
      type: 'iban',
      id: account.userAccountId,
      number: account.ibanNum,
      currency: account.currency,
      balance: account.currentAccountBalance,
    }),
  );

  return { data: accounts, isLoading, isError };
}
