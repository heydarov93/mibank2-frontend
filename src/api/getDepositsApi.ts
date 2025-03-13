import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

import { TokenType } from 'models/IAuth';
import { sessionTokenHandler } from 'utils/tokenHandler';

export const getDepositsApi = createApi({
  reducerPath: 'getDepositsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  endpoints: (builder) => ({
    getDeposits: builder.query({
      query: ({ page, size }) => ({
        url: endpoints.productManagement.deposits.getDeposits,
        method: 'GET',
        params: { page, size },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionTokenHandler.getToken(TokenType.ACCESS)}`,
        },
      }),
    }),
  }),
});

export const { useGetDepositsQuery } = getDepositsApi;
