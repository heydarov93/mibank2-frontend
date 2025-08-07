import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IGetTransactionDetailsRequest,
  IGetTransactionDetailsResponse,
  IGetTransactionsRequest,
  IGetTransactionsResponse,
  TTransactionTag,
} from './types/transactions.types';

import { BASE_URL } from 'api/config/api.config';
import { API_ENDPOINTS } from 'api/config/endpoints.config';
import { CACHE_DURATION } from 'constants/api/cache';
import { TRANSACTION_TAGS } from 'constants/api/tags';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: Object.values(TRANSACTION_TAGS) as TTransactionTag[],
  keepUnusedDataFor: CACHE_DURATION.DEFAULT,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getTransactionsByUserId: builder.mutation<
      IGetTransactionsResponse,
      IGetTransactionsRequest
    >({
      query: ({ userId, ...body }) => ({
        url: API_ENDPOINTS.accounts.transactions.getTransactionsByUserId(
          userId,
        ),
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [TRANSACTION_TAGS.LIST], // todo change this
    }),
    getTransactionDetails: builder.query<
      IGetTransactionDetailsResponse,
      IGetTransactionDetailsRequest
    >({
      query: ({ transactionId }) => ({
        url: API_ENDPOINTS.accounts.transactions.getTransactionDetails(
          transactionId,
        ),
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetTransactionsByUserIdMutation,
  useGetTransactionDetailsQuery,
} = transactionsApi;
