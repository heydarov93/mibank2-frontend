import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IConvertCurrencyRequest,
  IConvertCurrencyResponse,
  TExchangeRateTag,
  TGetCurrentRatesResponse,
  TGetPreviousRatesResponse,
} from './exchange-rates.types';

import { BASE_URL } from 'api/config/api.config';
import { API_ENDPOINTS } from 'api/config/endpoints.config';
import { CACHE_DURATION } from 'constants/api/cache';
import { EXCHANGE_RATE_TAGS } from 'constants/api/tags';

export const exchangeRatesApi = createApi({
  reducerPath: 'exchangeRatesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: Object.values(EXCHANGE_RATE_TAGS) as TExchangeRateTag[],
  keepUnusedDataFor: CACHE_DURATION.DEFAULT,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getCurrentRates: builder.query<TGetCurrentRatesResponse, null>({
      query: () => ({
        url: API_ENDPOINTS.exchangeRates.getCurrentRates,
        method: 'GET',
      }),
      providesTags: [EXCHANGE_RATE_TAGS.EXCHANGE_RATE],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),
    getPreviousRates: builder.query<TGetPreviousRatesResponse, null>({
      query: () => ({
        url: API_ENDPOINTS.exchangeRates.getPreviousRates,
        method: 'GET',
      }),
      providesTags: [EXCHANGE_RATE_TAGS.EXCHANGE_RATE],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),
    convertCurrency: builder.mutation<
      IConvertCurrencyResponse,
      IConvertCurrencyRequest
    >({
      query: (data) => ({
        url: API_ENDPOINTS.exchangeRates.convertCurrency,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [EXCHANGE_RATE_TAGS.EXCHANGE_RATE],
    }),
  }),
});

export const {
  useGetCurrentRatesQuery,
  useGetPreviousRatesQuery,
  useConvertCurrencyMutation,
} = exchangeRatesApi;
