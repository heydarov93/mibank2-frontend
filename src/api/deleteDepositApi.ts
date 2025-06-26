import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

import { ETokenType } from 'enums';
import { sessionTokenHandler } from 'utils/tokenHandler';

export const deleteDepositApi = createApi({
  reducerPath: 'deleteDepositApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  tagTypes: ['Deposits'],
  endpoints: (builder) => ({
    deleteDeposit: builder.mutation({
      query: (id) => ({
        url: endpoints.productManagement.deposits.deleteDeposit,
        params: { id },
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionTokenHandler.getToken(ETokenType.ACCESS)}`,
        },
      }),
      invalidatesTags: ['Deposits'],
    }),
  }),
});

export const { useDeleteDepositMutation } = deleteDepositApi;
