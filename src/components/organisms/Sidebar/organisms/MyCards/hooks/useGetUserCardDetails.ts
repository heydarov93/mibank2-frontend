import { useGetUserCardDetailsQuery } from 'api/userCardsApi';
import { adaptUserBankCardDetailsResponse } from 'utils/userBankCardApiAdapter';

export function useGetUserCardDetails(cardId: number | string) {
  const { data, isLoading, isError } = useGetUserCardDetailsQuery(cardId);

  return {
    data: data && adaptUserBankCardDetailsResponse(data),
    isLoading,
    isError,
  };
}
