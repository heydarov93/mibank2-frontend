import { useGetIBANAccountsQuery } from 'api/accountsApi';
import { useCreateUserDepositMutation } from 'api/createDepositApi';
import { useGetUserIdQuery } from 'api/getUserIdApi';
import { Account, AccountOption } from 'models/IDepositInfo';

export const useUserAccounts = (): {
  accountOptions: AccountOption[];
  isLoading: boolean;
} => {
  const { data: userData, isLoading: isUserDataLoading } = useGetUserIdQuery();
  const { data: userAccountsData, isLoading: isUserAccountsLoading } =
    useGetIBANAccountsQuery(
      {
        userId: Number(userData?.userId),
      },
      {
        skip: !userData?.userId,
      },
    );

  const accountOptions: AccountOption[] =
    userAccountsData?.map((account: Account) => ({
      accountId: account.userAccountId,
      iban: account.ibanNum,
      currency: account.currency,
      balance: String(account.currentAccountBalance),
    })) || [];

  const isLoading =
    isUserDataLoading || Boolean(userData?.userId && isUserAccountsLoading);

  return { accountOptions, isLoading };
};

export const useCreateDeposit = () => useCreateUserDepositMutation();
