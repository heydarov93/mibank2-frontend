import { useGetUserAccountByIBANQuery } from 'api/services/account-service/accounts.api';
import { useCreateUserDepositMutation } from 'api/services/deposit-service/user-deposits.api';
import { useGetUserIdQuery } from 'api/services/user-account-service/get-user-id.api';
import { Account, AccountOption } from 'models/IDepositInfo';

export const useUserAccounts = (): {
  accountOptions: AccountOption[];
  isLoading: boolean;
} => {
  const { data: userData, isLoading: isUserDataLoading } = useGetUserIdQuery();
  const { data: userAccountsData, isLoading: isUserAccountsLoading } =
    useGetUserAccountByIBANQuery(
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
