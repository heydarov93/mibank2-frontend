import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


import {
  IGetDepositsRequest,
  IGetDepositsResponse,
  IUpdateDepositRequest,
  TCreateDepositRequest,
  TCreateDepositResponse,
  TUpdateDepositResponse
} from './types/deposits.types';

import { BASE_URL } from 'api/config/api.config';
import { endpoints } from 'api/endpoints';
import { ETokenType } from 'enums';
import { sessionTokenHandler } from 'utils/auth';

const token = sessionTokenHandler.getToken(ETokenType.ACCESS);

export const depositsApi = createApi({
  reducerPath: 'depositsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    updateDeposit: builder.mutation<
      TUpdateDepositResponse,
      IUpdateDepositRequest
    >({
      query: ({ id, ...body }) => ({
        url: endpoints.productManagement.deposits.updateDeposit,
        params: { id },
        method: 'PUT',
        body: body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    createDeposit: builder.mutation<
      TCreateDepositResponse,
      TCreateDepositRequest
    >({
      query: (data) => ({
        url: endpoints.productManagement.deposits.createDeposit,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteDeposit: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: endpoints.productManagement.deposits.deleteDeposit,
        params: { id },
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getDeposits: builder.query<IGetDepositsResponse, IGetDepositsRequest>({
      query: ({ page, size }) => ({
        url: endpoints.productManagement.deposits.getDeposits,
        method: 'GET',
        params: { page, size },
      }),
    }),
  }),
});

export const {
  useUpdateDepositMutation,
  useCreateDepositMutation,
  useDeleteDepositMutation,
  useGetDepositsQuery,
} = depositsApi;
