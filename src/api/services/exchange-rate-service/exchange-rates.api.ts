import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IConvertCurrencyRequest,
  IConvertCurrencyResponse,
  TGetCurrentRatesResponse,
  TGetPreviousRatesResponse,
} from './exchange-rates.types';

import { BASE_URL } from 'api/config/api.config';
import { endpoints } from 'api/endpoints';

export const exchangeRatesApi = createApi({
  reducerPath: 'exchangeRatesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getCurrentRates: builder.query<TGetCurrentRatesResponse, null>({
      query: () => ({
        url: endpoints.exchangeRates.getCurrentRates,
        method: 'GET',
      }),
    }),
    getPreviousRates: builder.query<TGetPreviousRatesResponse, null>({
      query: () => ({
        url: endpoints.exchangeRates.getPreviousRates,
        method: 'GET',
      }),
    }),
    convertCurrency: builder.mutation<
      IConvertCurrencyResponse,
      IConvertCurrencyRequest
    >({
      query: (data) => ({
        url: endpoints.exchangeRates.convertCurrency,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCurrentRatesQuery,
  useGetPreviousRatesQuery,
  useConvertCurrencyMutation,
} = exchangeRatesApi;
