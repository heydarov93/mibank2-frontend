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
  TCreateCardRequest,
  TCreateCardResponse,
  TGetUserCardsResponse,
  TSearchCardsResponse,
} from './cards.types';

import { BASE_URL } from 'api/config/api.config';
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
  tagTypes: ['userCard', 'userCards', 'Cards'],
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
        { type: 'userCards', id: userId },
      ],
    }),
    getUserCardDetails: builder.query<
      IGetUserCardDetailsResponse,
      IGetUserCardDetailsRequest
    >({
      query: (id) => ({
        url: endpoints.cards.getUserCardDetails(id),
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'userCard', id }],
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
        { type: 'userCards' },
        { type: 'userCard', id },
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
        { type: 'userCards' },
        { type: 'userCard', id },
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
      providesTags: [{ type: 'Cards', id: 'GET cards' }],
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
            'IBANAccounts',
            'UserAccountsByToken',
          ]),
        );
      },
      invalidatesTags: ['Cards'],
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
