import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

import { ETokenType } from 'enums';
import { sessionTokenHandler } from 'utils/auth/tokenHandler';

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
          Authorization: `Bearer ${sessionTokenHandler.getToken(ETokenType.ACCESS)}`,
        },
      }),
    }),
  }),
});

export const { useUpdateDepositMutation } = updateDepositApi;
