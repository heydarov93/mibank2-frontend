import { useCreateUserDepositMutation } from 'api/createDeposit';
import { useGetUserAccountsQuery } from 'api/getUserAccountsApi';
import { TokenType } from 'models/IAuth';
import { Account, AccountOption } from 'models/IDepositInfo';
import { localTokenHandler } from 'utils';

export const useUserAccounts = (): {
  accountOptions: AccountOption[];
  isLoading: boolean;
} => {
  const token = localTokenHandler.getToken(TokenType.ACCESS);
  const { data, isLoading } = useGetUserAccountsQuery({ token });

  const accountOptions: AccountOption[] =
    data?.accounts?.map((account: Account) => ({
      accountId: account.userAccountId,
      iban: account.ibanNum,
      currency: account.currency,
      balance: account.currentAccountBalance,
    })) || [];

  return { accountOptions, isLoading };
};

export const useCreateDeposit = () => useCreateUserDepositMutation();
