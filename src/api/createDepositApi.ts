import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

import { ETokenType } from 'enums';
import { sessionTokenHandler } from 'utils/auth/tokenHandler';

export const createDepositApi = createApi({
  reducerPath: 'createDepositApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  endpoints: (builder) => ({
    createDeposit: builder.mutation({
      query: (data) => ({
        url: endpoints.productManagement.deposits.createDeposit,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionTokenHandler.getToken(ETokenType.ACCESS)}`,
        },
      }),
    }),
  }),
});

export const createUserDepositApi = createApi({
  reducerPath: 'createUserDepositApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  tagTypes: ['createUserDeposit'],
  endpoints: (builder) => ({
    createUserDeposit: builder.mutation({
      query: (data) => ({
        url: endpoints.productManagement.userDeposits.createDeposit,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateUserDepositMutation } = createUserDepositApi;
export const { useCreateDepositMutation } = createDepositApi;
