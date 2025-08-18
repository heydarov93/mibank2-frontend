import { skipToken } from '@reduxjs/toolkit/query';

import { useGetUserAccountByIBANQuery } from 'api/services/account-service/accounts.api';
import { IDepositBase } from 'api/services/deposit-service/types/user-deposits.types';
import { useGetUserDepositsQuery } from 'api/services/deposit-service/user-deposits.api';
import { useGetUserIdQuery } from 'api/services/user-account-service/get-user-id.api';

export const useUserDeposits = (skipQuery: boolean) => {
  const { data } = useGetUserIdQuery();

  const {
    data: accountsResponse,
    isLoading: isIBANLoading,
    isError: isIBANError,
  } = useGetUserAccountByIBANQuery(
    data && !skipQuery ? { userId: data.userId } : skipToken,
  );

  const {
    data: depositsData,
    isLoading: isDepositLoading,
    isError: iseDepositError,
  } = useGetUserDepositsQuery(
    !skipQuery && accountsResponse && accountsResponse.length > 0
      ? { accountId: accountsResponse[0].userAccountId }
      : skipToken,
  );

  const isLoading = isIBANLoading || isDepositLoading;
  const isError = isIBANError || iseDepositError;

  const deposits: IDepositBase[] | undefined = depositsData?.map((deposit) => ({
    id: deposit.id,
    userId: deposit.userId,
    accountNumber: deposit.accountNumber,
    depositId: deposit.depositId,
    startDate: deposit.startDate,
    endDate: deposit.endDate,
    currentBalance: deposit.currentBalance,
    status: deposit.status,
    timeLeft: deposit.timeLeft,
  }));

  return { data: deposits, isLoading, isError };
};
