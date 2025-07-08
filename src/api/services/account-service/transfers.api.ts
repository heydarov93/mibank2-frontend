import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IGetTransferFeeRequest,
  IGetTransferFeeResponse,
  ITransferToCardRequest,
  ITransferToCardResponse,
  ITransferToIBANRequest,
  ITransferToIBANResponse,
} from './types/transfers.types';

import { BASE_URL } from 'api/config/api.config';
import { endpoints } from 'api/endpoints';

export const transfersApi = createApi({
  reducerPath: 'transfersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['IBANTransfer', 'CardTransfer'],
  endpoints: (builder) => ({
    transferToIBAN: builder.mutation<
      ITransferToIBANResponse,
      ITransferToIBANRequest
    >({
      query: (data) => ({
        url: endpoints.accounts.transfers.transferToIBAN,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['IBANTransfer'],
    }),

    transferToCard: builder.mutation<
      ITransferToCardResponse,
      ITransferToCardRequest
    >({
      query: (data) => ({
        url: endpoints.accounts.transfers.transferToCard,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CardTransfer'],
    }),

    getTransferFee: builder.query<
      IGetTransferFeeResponse,
      IGetTransferFeeRequest
    >({
      query: ({ amount, isInternal, transferType }) => ({
        url: endpoints.accounts.transfers.getTransferFee,
        params: { amount, isInternal, transferType },
      }),
    }),
  }),
});

export const {
  useTransferToIBANMutation,
  useTransferToCardMutation,
  useGetTransferFeeQuery,
} = transfersApi;
