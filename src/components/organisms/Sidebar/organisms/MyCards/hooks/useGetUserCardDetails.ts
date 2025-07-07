import { useGetUserCardDetailsQuery } from 'api/userCardsApi';
import { mapUserBankCardDetailsResponse } from 'utils/mapper';

export function useGetUserCardDetails(cardId: number | string) {
  const { data, isLoading, isError } = useGetUserCardDetailsQuery(cardId);

  return {
    data: data && mapUserBankCardDetailsResponse(data),
    isLoading,
    isError,
  };
}
