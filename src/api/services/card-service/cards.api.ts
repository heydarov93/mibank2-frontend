import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { accountsApi } from '../account-service/accounts.api';

import {
  ICardApiResponse,
  IGetUserCardDetailsRequest,
  IGetUserCardDetailsResponse,
  IGetUserCardsRequest,
  IIssueUserCardRequest,
  ISearchCardsRequest,
  ISetPrimaryPaymentCardRequest,
  IUpdateCardStatusRequest,
  TCardTag,
  TCreateCardRequest,
  TCreateCardResponse,
  TGetUserCardsResponse,
  TSearchCardsResponse,
} from './cards.types';

import { BASE_URL } from 'api/config/api.config';
import { CACHE_DURATION } from 'api/constants/durations';
import { CARD_TAGS } from 'api/constants/tags';
import { endpoints } from 'api/endpoints';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'constants/business/pagination';
import { ETokenType } from 'enums';
import { sessionTokenHandler } from 'utils/auth';

const token = sessionTokenHandler.getToken(ETokenType.ACCESS);

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: Object.values(CARD_TAGS) as TCardTag[],
  keepUnusedDataFor: CACHE_DURATION.DEFAULT,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getUserCards: builder.query<TGetUserCardsResponse, IGetUserCardsRequest>({
      query: ({ userId, page, count }) => ({
        url: endpoints.cards.getUserCards,
        method: 'GET',
        params: {
          userId,
          page,
          count,
        },
      }),
      providesTags: (_result, _error, { userId }) => [
        { type: CARD_TAGS.USER_CARDS, id: userId },
      ],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),
    getUserCardDetails: builder.query<
      IGetUserCardDetailsResponse,
      IGetUserCardDetailsRequest
    >({
      query: (id) => ({
        url: endpoints.cards.getUserCardDetails(id),
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [
        { type: CARD_TAGS.USER_CARD_DETAILS, id },
      ],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),
    updateCardStatus: builder.mutation<
      ICardApiResponse,
      IUpdateCardStatusRequest
    >({
      query: ({ status, id }) => ({
        url: endpoints.cards.updateCardStatus(id),
        method: 'PATCH',
        params: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: CARD_TAGS.USER_CARDS },
        { type: CARD_TAGS.USER_CARD_DETAILS, id },
        CARD_TAGS.CARD_STATUS,
      ],
    }),
    setPrimaryPaymentCard: builder.mutation<
      ICardApiResponse,
      ISetPrimaryPaymentCardRequest
    >({
      query: ({ id, isPrimaryPaymentCard }) => ({
        url: endpoints.cards.setPrimaryPaymentCard(id),
        method: 'PATCH',
        params: { isPrimaryPaymentCard },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: CARD_TAGS.USER_CARDS },
        { type: CARD_TAGS.USER_CARD_DETAILS, id },
        CARD_TAGS.PRIMARY_PAYMENT_CARD,
      ],
    }),
    searchCards: builder.query<TSearchCardsResponse, ISearchCardsRequest>({
      query: (params) => ({
        url: endpoints.cards.searchCards,
        method: 'GET',
        params: {
          page: DEFAULT_PAGE_INDEX,
          count: DEFAULT_PAGE_SIZE,
          ...params,
        },
      }),
      providesTags: (result) => [
        CARD_TAGS.SEARCH_CARDS,
        ...(result?.data?.map((card) => ({
          type: CARD_TAGS.USER_CARD_DETAILS,
          id: card.cardId,
        })) || []),
      ],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),
    issueUserCard: builder.mutation<string, IIssueUserCardRequest>({
      query: (data) => ({
        url: endpoints.cards.issueUserCard,
        body: data,
        method: 'POST',
        responseHandler: 'text',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          accountsApi.util.invalidateTags([
            CARD_TAGS.IBAN_ACCOUNTS,
            CARD_TAGS.USER_ACCOUNTS_BY_TOKEN,
          ]),
        );
      },
      invalidatesTags: [CARD_TAGS.SEARCH_CARDS, CARD_TAGS.USER_CARDS],
    }),
    createCard: builder.mutation<TCreateCardResponse, TCreateCardRequest>({
      query: (data) => ({
        url: endpoints.cards.createCard,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [CARD_TAGS.CREATE_CARD, CARD_TAGS.USER_CARDS],
    }),
  }),
});

export const {
  useSearchCardsQuery,
  useGetUserCardsQuery,
  useLazySearchCardsQuery,
  useGetUserCardDetailsQuery,
  useIssueUserCardMutation,
  useSetPrimaryPaymentCardMutation,
  useUpdateCardStatusMutation,
  useCreateCardMutation,
} = cardsApi;
