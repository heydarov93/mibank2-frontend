import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IUserDepositResponse,
  TCreateUserDepositRequest,
  TUserDepositTag,
} from './types/user-deposits.types';

import { BASE_URL } from 'api/config/api.config';
import { API_ENDPOINTS } from 'api/config/endpoints.config';
import { CACHE_DURATION } from 'constants/api/cache';
import { USER_DEPOSIT_TAGS } from 'constants/api/tags';
import { ETokenType } from 'enums';
import { localTokenHandler } from 'utils/auth';

const token = localTokenHandler.getToken(ETokenType.ACCESS);

export const userDepositsApi = createApi({
  reducerPath: 'userDepositsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: Object.values(USER_DEPOSIT_TAGS) as TUserDepositTag[],
  keepUnusedDataFor: CACHE_DURATION.DEFAULT,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getUserDeposits: builder.query<IUserDepositResponse, { accountId: string }>(
      {
        query: ({ accountId }) => ({
          url: API_ENDPOINTS.productManagement.userDeposits.getUserDeposits(
            accountId,
          ),
          method: 'GET',
          params: { accountId },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
        providesTags: (_result, _error, { accountId }) => [
          { type: USER_DEPOSIT_TAGS.USER_DEPOSIT, id: accountId },
          { type: USER_DEPOSIT_TAGS.USER_DEPOSIT, id: USER_DEPOSIT_TAGS.LIST },
        ],
        keepUnusedDataFor: CACHE_DURATION.MEDIUM,
      },
    ),
    createUserDeposit: builder.mutation<
      IUserDepositResponse,
      TCreateUserDepositRequest
    >({
      query: (data) => ({
        url: API_ENDPOINTS.productManagement.userDeposits.createUserDeposit,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { accountId }) => [
        { type: USER_DEPOSIT_TAGS.USER_DEPOSIT, id: accountId },
        { type: USER_DEPOSIT_TAGS.USER_DEPOSIT, id: USER_DEPOSIT_TAGS.LIST },
      ],
    }),
  }),
});

export const { useGetUserDepositsQuery, useCreateUserDepositMutation } =
  userDepositsApi;
