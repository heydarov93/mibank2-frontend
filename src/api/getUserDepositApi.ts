import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

import { TokenType } from 'models/IAuth';
import { sessionTokenHandler } from 'utils/tokenHandler';

export const getUserDepositApi = createApi({
  reducerPath: 'getUserDepositApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  tagTypes: ['userDeposit'],
  endpoints: (builder) => ({
    getDeposits: builder.query({
      query: ({ id }) => ({
        url: `${endpoints.productManagement.userDeposits.getDeposit}${id}`,
        method: 'GET',
        params: { id },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionTokenHandler.getToken(TokenType.ACCESS)}`,
        },
      }),
      providesTags: ['userDeposit'],
    }),
  }),
});

export const { useGetDepositsQuery } = getUserDepositApi;
