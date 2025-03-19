import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

import { TokenType } from 'models/IAuth';
import { sessionTokenHandler } from 'utils/tokenHandler';

export const updateDepositApi = createApi({
  reducerPath: 'updateDepositApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  endpoints: (builder) => ({
    updateDeposit: builder.mutation({
      query: ({ id, ...body }) => ({
        url: endpoints.productManagement.deposits.updateDeposit,
        params: { id },
        method: 'PUT',
        body: body,
        headers: {
          Authorization: `Bearer ${sessionTokenHandler.getToken(TokenType.ACCESS)}`,
        },
      }),
    }),
  }),
});

export const { useUpdateDepositMutation } = updateDepositApi;
