import { skipToken } from '@reduxjs/toolkit/query';

import { useGetUserCardsQuery } from 'api/services/card-service/cards.api';
import { useGetUserIdQuery } from 'api/services/user-account-service/get-user-id.api';
import { mapUserBankCardResponse } from 'utils/mapper';

export function useGetUserCards() {
  const {
    data: userIdData,
    isLoading: isUserIdLoading,
    isError: isUserIdError,
  } = useGetUserIdQuery();

  const queryArgs = userIdData?.userId
    ? {
        userId: userIdData.userId,
      }
    : skipToken;

  const {
    data: cardsData,
    isLoading,
    isError,
  } = useGetUserCardsQuery(queryArgs);

  return {
    ...cardsData,
    data: cardsData?.data.map((cardResponse) =>
      mapUserBankCardResponse(cardResponse),
    ),
    isLoading: isLoading || isUserIdLoading,
    isError: isError || isUserIdError,
  };
}
