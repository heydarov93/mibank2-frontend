import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

import { baseQueryCreator } from 'store/baseQueryCreator';

export const createDepositApi = createApi({
  reducerPath: 'createDepositApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    createDeposit: builder.mutation({
      query: (data) => ({
        url: endpoints.productManagement.deposits.createDeposit,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateDepositMutation } = createDepositApi;
