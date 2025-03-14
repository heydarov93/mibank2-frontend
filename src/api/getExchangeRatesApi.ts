import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

export const getExchangeRatesApi = createApi({
  reducerPath: 'getExchangeRates',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.nbp.pl/' }),
  endpoints: (builder) => ({
    getExchangeRates: builder.query({
      query: (currentDate: string) => ({
        url: `${endpoints.exchangeRates.getRates}/${currentDate}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetExchangeRatesQuery } = getExchangeRatesApi;
