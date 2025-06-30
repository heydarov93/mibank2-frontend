import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { accountsApi } from './accountsApi';
import { BASE_URL } from './config';
import { endpoints } from './endpoints';

import { IApiResponse } from 'models/commonApi';
import {
  IGetCardsParams,
  IUserBankCardDetailsResponse,
  IGetUserCardsParams,
  IIssueUserCardRequest,
  IUpdatePrimaryPaymentCardRequest,
  IUpdateUserCardStatusRequest,
  TGetCardsResponse,
  TGetUserCardsResponse,
} from 'models/userCardsApi';

export const userCardsApi = createApi({
  reducerPath: 'userCardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  tagTypes: ['userCard', 'userCards', 'Cards'],
  endpoints: (builder) => ({
    getUserCards: builder.query<TGetUserCardsResponse, IGetUserCardsParams>({
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
      IUserBankCardDetailsResponse,
      string | number
    >({
      query: (id) => ({
        url: endpoints.cards.getUserCardDetails(id),
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'userCard', id }],
    }),
    updateUserCardStatus: builder.mutation<
      IApiResponse,
      IUpdateUserCardStatusRequest
    >({
      query: ({ status, id }) => ({
        url: endpoints.cards.updateUserCardStatus(id),
        method: 'PATCH',
        params: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'userCards' },
        { type: 'userCard', id },
      ],
    }),
    updatePrimaryPaymentCard: builder.mutation<
      IApiResponse,
      IUpdatePrimaryPaymentCardRequest
    >({
      query: ({ id, isPrimaryPaymentCard }) => ({
        url: endpoints.cards.updatePrimaryPaymentCard(id),
        method: 'PATCH',
        params: { isPrimaryPaymentCard },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'userCards' },
        { type: 'userCard', id },
      ],
    }),

    getCards: builder.query<TGetCardsResponse, IGetCardsParams>({
      query: (params) => ({
        url: endpoints.cards.getCards,
        method: 'GET',
        params: {
          page: 0,
          count: 10,
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
  }),
});

export const {
  useGetCardsQuery,
  useGetUserCardsQuery,
  useGetUserCardDetailsQuery,
  useLazyGetCardsQuery,
  useIssueUserCardMutation,
  useUpdateUserCardStatusMutation,
  useUpdatePrimaryPaymentCardMutation,
} = userCardsApi;
