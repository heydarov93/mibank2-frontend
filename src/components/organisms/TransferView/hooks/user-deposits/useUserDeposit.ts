import { useGetUserDepositDetailedQuery } from 'api/services/deposit-service/user-deposits.api';

export const useUserDepositDetailed = (depositId: string) => {
  const {
    data: depositData,
    isLoading: isDepositLoading,
    isError: iseDepositError,
  } = useGetUserDepositDetailedQuery({ depositId });

  const isLoading = isDepositLoading;
  const isError = iseDepositError;

  return { data: depositData, isLoading, isError };
};
