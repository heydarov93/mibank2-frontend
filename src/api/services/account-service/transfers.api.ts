import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IGetTransferFeeRequest,
  IGetTransferFeeResponse,
  ITransferToCardRequest,
  ITransferToCardResponse,
  ITransferToIBANRequest,
  ITransferToIBANResponse,
  TTransferTag,
} from './types/transfers.types';

import { BASE_URL } from 'api/config/api.config';
import { API_ENDPOINTS } from 'api/config/endpoints.config';
import { CACHE_DURATION } from 'constants/api/cache';
import { TRANSFER_TAGS } from 'constants/api/tags';

export const transfersApi = createApi({
  reducerPath: 'transfersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: Object.values(TRANSFER_TAGS) as TTransferTag[],
  keepUnusedDataFor: CACHE_DURATION.DEFAULT,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    transferToIBAN: builder.mutation<
      ITransferToIBANResponse,
      ITransferToIBANRequest
    >({
      query: (data) => ({
        url: API_ENDPOINTS.accounts.transfers.transferToIBAN,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (
        _result,
        _error,
        { senderIbanNumber, recipientIbanNumber },
      ) => [
        { type: TRANSFER_TAGS.IBAN, id: recipientIbanNumber },
        { type: TRANSFER_TAGS.IBAN, id: senderIbanNumber },
        { type: TRANSFER_TAGS.IBAN, id: TRANSFER_TAGS.LIST },
        TRANSFER_TAGS.IBAN,
      ],
    }),

    transferToCard: builder.mutation<
      ITransferToCardResponse,
      ITransferToCardRequest
    >({
      query: (data) => ({
        url: API_ENDPOINTS.accounts.transfers.transferToCard,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (
        _result,
        _error,
        { senderCardNumber, recipientCardNumber },
      ) => [
        { type: TRANSFER_TAGS.CARD, id: senderCardNumber },
        { type: TRANSFER_TAGS.CARD, id: recipientCardNumber },
        { type: TRANSFER_TAGS.CARD, id: TRANSFER_TAGS.LIST },
        TRANSFER_TAGS.CARD,
      ],
    }),

    getTransferFee: builder.query<
      IGetTransferFeeResponse,
      IGetTransferFeeRequest
    >({
      query: ({ amount, isInternal, transferType }) => ({
        url: API_ENDPOINTS.accounts.transfers.getTransferFee,
        method: 'GET',
        params: { amount, isInternal, transferType },
      }),
      providesTags: (_result, _error, { amount, isInternal, transferType }) => [
        {
          type: TRANSFER_TAGS.FEE,
          id: `${amount}-${isInternal}-${transferType}`,
        },
        { type: TRANSFER_TAGS.FEE, id: TRANSFER_TAGS.LIST },
      ],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),
  }),
});

export const {
  useTransferToIBANMutation,
  useTransferToCardMutation,
  useGetTransferFeeQuery,
} = transfersApi;
