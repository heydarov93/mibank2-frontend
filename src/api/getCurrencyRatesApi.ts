import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

export const getCurrencyRatesApi = createApi({
  reducerPath: 'getCurrencyRatesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.nbp.pl/' }),
  endpoints: (builder) => ({
    getCurrencyRates: builder.query({
      query: (date: string) => ({
        url: `${endpoints.exchangeRates.getRates}/${date}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCurrencyRatesQuery } = getCurrencyRatesApi;
