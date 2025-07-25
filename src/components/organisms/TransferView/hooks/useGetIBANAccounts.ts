import { skipToken } from '@reduxjs/toolkit/query';

import { IUserIBANAccount } from './useAccounts';

import { useGetUserAccountByIBANQuery } from 'api/services/account-service/accounts.api';
import { useGetUserIdQuery } from 'api/services/user-account-service/get-user-id.api';

export function useGetIBANAccounts(skipQuery: boolean) {
  const { data } = useGetUserIdQuery();

  const {
    data: accountsResponse,
    isLoading,
    isError,
  } = useGetUserAccountByIBANQuery(
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
