import { useGetUserCardDetailsQuery } from 'api/services/card-service/cards.api';
import { mapUserBankCardDetailsResponse } from 'utils/mapper';

export const useUserCardDetails = (cardId: number | string) => {
  const { data, isLoading, isError } = useGetUserCardDetailsQuery(cardId);

  return {
    data: data && mapUserBankCardDetailsResponse(data),
    isLoading,
    isError,
  };
};
