import { skipToken } from '@reduxjs/toolkit/query';

import { useGetUserIdQuery } from 'api/getUserIdApi';
import { useGetUserCardsQuery } from 'api/userCardsApi';
import { adaptUserBankCardResponse } from 'utils/userBankCardApiAdapter';

export function useGetUserCards() {
  const {
    data: userIdData,
    isLoading: isUserIdLoading,
    isError: isUserIdError,
  } = useGetUserIdQuery();

  const queryArgs = userIdData?.userId
    ? { userId: userIdData.userId, page: 0, count: 20 }
    : skipToken;

  const {
    data: cardsData,
    isLoading,
    isError,
  } = useGetUserCardsQuery(queryArgs);

  return {
    ...cardsData,
    data: cardsData?.data.map((cardResponse) =>
      adaptUserBankCardResponse(cardResponse),
    ),
    isLoading: isLoading || isUserIdLoading,
    isError: isError || isUserIdError,
  };
}
