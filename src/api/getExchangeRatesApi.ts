import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

export const getExchangeRatesApi = createApi({
  reducerPath: 'getExchangeRatesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  endpoints: (builder) => ({
    getCurrentRates: builder.query({
      query: () => ({
        url: endpoints.exchangeRates.getCurrentRates,
        method: 'GET',
      }),
    }),
    getPreviousRates: builder.query({
      query: () => ({
        url: endpoints.exchangeRates.getPreviousRates,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCurrentRatesQuery, useGetPreviousRatesQuery } =
  getExchangeRatesApi;
