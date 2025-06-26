import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

import { TCurrency } from 'types/types';

export interface Deposit {
  augmentable: boolean;
  autoRenewable: boolean;
  capitalization: number;
  currency: TCurrency;
  description: string;
  earlyWithdrawal: boolean;
  earlyWithdrawalFee: number;
  earlyWithdrawalLimit: number;
  id: number;
  interestRate: number;
  max: number;
  min: number;
  name: string;
  term: number;
  type: string;
}

interface GetDepositsParams {
  page?: number;
  size?: number;
}

interface GetDepositsResponse {
  content: Deposit[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export const getDepositsApi = createApi({
  reducerPath: 'getDepositsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  tagTypes: ['getDeposits'],
  endpoints: (builder) => ({
    getDeposits: builder.query<GetDepositsResponse, GetDepositsParams>({
      query: ({ page, size }) => ({
        url: endpoints.productManagement.deposits.getDeposits,
        method: 'GET',
        params: { page, size },
      }),
      providesTags: ['getDeposits'],
    }),
  }),
});

export const { useGetDepositsQuery } = getDepositsApi;
