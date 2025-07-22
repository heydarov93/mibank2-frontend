import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IGetDepositsRequest,
  IGetDepositsResponse,
  IUpdateDepositRequest,
  TCreateDepositRequest,
  TCreateDepositResponse,
  TDepositTag,
  TUpdateDepositResponse,
} from './types/deposits.types';

import { BASE_URL } from 'api/config/api.config';
import { API_ENDPOINTS } from 'api/config/endpoints.config';
import { CACHE_DURATION } from 'constants/api/cache';
import { DEPOSIT_TAGS } from 'constants/api/tags';
import { ETokenType } from 'enums';
import { sessionTokenHandler } from 'utils/auth';

const token = sessionTokenHandler.getToken(ETokenType.ACCESS);

export const depositsApi = createApi({
  reducerPath: 'depositsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: Object.values(DEPOSIT_TAGS) as TDepositTag[],
  keepUnusedDataFor: CACHE_DURATION.DEFAULT,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    updateDeposit: builder.mutation<
      TUpdateDepositResponse,
      IUpdateDepositRequest
    >({
      query: ({ id, ...body }) => ({
        url: API_ENDPOINTS.productManagement.deposits.updateDeposit,
        params: { id },
        method: 'PUT',
        body: body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: DEPOSIT_TAGS.DEPOSIT, id },
        { type: DEPOSIT_TAGS.DEPOSIT, id: DEPOSIT_TAGS.LIST },
      ],
    }),
    createDeposit: builder.mutation<
      TCreateDepositResponse,
      TCreateDepositRequest
    >({
      query: (data) => ({
        url: API_ENDPOINTS.productManagement.deposits.createDeposit,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [{ type: DEPOSIT_TAGS.DEPOSIT, id: DEPOSIT_TAGS.LIST }],
    }),
    deleteDeposit: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: API_ENDPOINTS.productManagement.deposits.deleteDeposit,
        params: { id },
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: DEPOSIT_TAGS.DEPOSIT, id },
        { type: DEPOSIT_TAGS.DEPOSIT, id: DEPOSIT_TAGS.LIST },
      ],
    }),
    getDeposits: builder.query<IGetDepositsResponse, IGetDepositsRequest>({
      query: ({ page, size }) => ({
        url: API_ENDPOINTS.productManagement.deposits.getDeposits,
        method: 'GET',
        params: { page, size },
      }),
      providesTags: (result) => [
        ...(result?.content || []).map(({ id }) => ({
          type: DEPOSIT_TAGS.DEPOSIT,
          id,
        })),
        { type: DEPOSIT_TAGS.DEPOSIT, id: DEPOSIT_TAGS.LIST },
      ],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),
  }),
});

export const {
  useUpdateDepositMutation,
  useCreateDepositMutation,
  useDeleteDepositMutation,
  useGetDepositsQuery,
} = depositsApi;
