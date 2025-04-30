import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

export const convertCurrencyApi = createApi({
  reducerPath: 'convertCurrencyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  endpoints: (builder) => ({
    convertCurrency: builder.mutation({
      query: (data) => ({
        url: endpoints.exchangeRates.convertCurrency,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useConvertCurrencyMutation } = convertCurrencyApi;
