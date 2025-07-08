import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IUserDepositResponse,
  TCreateUserDepositRequest,
} from './types/user-deposits.types';

import { BASE_URL } from 'api/config/api.config';
import { endpoints } from 'api/endpoints';
import { ETokenType } from 'enums';
import { localTokenHandler } from 'utils/auth';

const token = localTokenHandler.getToken(ETokenType.ACCESS);

export const userDepositsApi = createApi({
  reducerPath: 'userDepositsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['userDeposit'],
  endpoints: (builder) => ({
    getUserDeposits: builder.query<IUserDepositResponse, { accountId: string }>(
      {
        query: ({ accountId }) => ({
          url: endpoints.productManagement.userDeposits.getUserDeposits(
            accountId,
          ),
          method: 'GET',
          params: { accountId },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
      },
    ),
    createUserDeposit: builder.mutation<
      IUserDepositResponse,
      TCreateUserDepositRequest
    >({
      query: (data) => ({
        url: endpoints.productManagement.userDeposits.createUserDeposit,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetUserDepositsQuery, useCreateUserDepositMutation } =
  userDepositsApi;
