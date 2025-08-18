import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IUserDeposit } from './types/deposits.types';
import {
  IDepositBase,
  IDepositCreate,
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
    getUserDeposits: builder.query<IDepositBase[], { accountId: string }>({
      query: ({ accountId }) => ({
        url: API_ENDPOINTS.productManagement.userDeposits.getUserDeposits(
          accountId,
        ),
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //!uncommit after BE fix token auth problem
          //Authorization: `Bearer ${token}`
        },
      }),
      providesTags: (_result, _error, { accountId }) => [
        { type: USER_DEPOSIT_TAGS.USER_DEPOSIT, id: accountId },
        { type: USER_DEPOSIT_TAGS.USER_DEPOSIT, id: USER_DEPOSIT_TAGS.LIST },
      ],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),
    getUserDepositsRecent: builder.query<
      IDepositBase[],
      { accountId: string; limit: number }
    >({
      query: ({ accountId, limit = 5 }) => ({
        url: API_ENDPOINTS.productManagement.userDeposits.getUserDepositsRecent(
          accountId,
        ),
        method: 'GET',
        params: { limit },
        headers: {
          'Content-Type': 'application/json',
          //!uncommit after BE fix token auth problem
          //Authorization: `Bearer ${token}`
        },
      }),
      providesTags: (_result, _error, { accountId }) => [
        { type: USER_DEPOSIT_TAGS.USER_DEPOSIT, id: accountId },
        { type: USER_DEPOSIT_TAGS.USER_DEPOSIT, id: USER_DEPOSIT_TAGS.LIST },
      ],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),
    getUserDeposit: builder.query<IDepositBase, { depositId: string }>({
      query: ({ depositId }) => ({
        url: API_ENDPOINTS.productManagement.userDeposits.getUserDeposit(
          depositId,
        ),
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //!uncommit after BE fix token auth problem
          //Authorization: `Bearer ${token}`
        },
      }),
      providesTags: (_result, _error, { depositId }) => [
        { type: USER_DEPOSIT_TAGS.USER_DEPOSIT, id: depositId },
        { type: USER_DEPOSIT_TAGS.USER_DEPOSIT, id: USER_DEPOSIT_TAGS.LIST },
      ],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),
    getUserDepositDetailed: builder.query<IUserDeposit, { depositId: string }>({
      query: ({ depositId }) => ({
        url: API_ENDPOINTS.productManagement.userDeposits.getUserDepositDetailed(
          depositId,
        ),
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //!uncommit after BE fix token auth problem
          //Authorization: `Bearer ${token}`
        },
      }),
      providesTags: (_result, _error, { depositId }) => [
        { type: USER_DEPOSIT_TAGS.USER_DEPOSIT, id: depositId },
        { type: USER_DEPOSIT_TAGS.USER_DEPOSIT, id: USER_DEPOSIT_TAGS.LIST },
      ],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),
    createUserDeposit: builder.mutation<
      IDepositCreate,
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

export const {
  useGetUserDepositsQuery,
  useGetUserDepositsRecentQuery,
  useGetUserDepositQuery,
  useGetUserDepositDetailedQuery,
  useCreateUserDepositMutation,
} = userDepositsApi;
