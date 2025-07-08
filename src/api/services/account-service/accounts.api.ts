import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  ICheckCardIssuanceRequest,
  ICheckCardIssuanceResponse,
  ICreateUserCardAccountRequest,
  ICreateUserCardAccountResponse,
  IGetAccountByCardResponse,
  IGetAccountByTokenResponse,
  IGetUserAccountByIBANResponse,
  ILinkAccountWithCardRequest,
} from './types/accounts.types';

import { BASE_URL } from 'api/config/api.config';
import { endpoints } from 'api/endpoints';
import { ETokenType } from 'enums';
import { localTokenHandler } from 'utils';

const token = localTokenHandler.getToken(ETokenType.ACCESS);

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['IBANAccounts', 'CardAccounts', 'UserAccountsByToken'],
  endpoints: (builder) => ({
    getUserAccountByIBAN: builder.query<
      IGetUserAccountByIBANResponse[],
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: endpoints.accounts.getUserAccountByIBAN,
        params: { userId },
      }),
      providesTags: ['IBANAccounts'],
    }),

    getAccountByCard: builder.query<
      IGetAccountByCardResponse[],
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: endpoints.accounts.getAccountByCard,
        params: { userId },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['CardAccounts'],
    }),

    getAccountByToken: builder.query<
      IGetAccountByTokenResponse,
      { token: string }
    >({
      query: ({ token }) => ({
        url: endpoints.accounts.getAccountByToken,
        method: 'GET',
        params: { token },
      }),
    }),

    linkAccountWithCard: builder.mutation<void, ILinkAccountWithCardRequest>({
      query: (data) => ({
        url: endpoints.accounts.linkAccountWithCard,
        body: data,
        method: 'PATCH',
      }),
    }),

    checkCardIssuance: builder.mutation<
      ICheckCardIssuanceResponse,
      ICheckCardIssuanceRequest
    >({
      query: (data) => ({
        url: endpoints.accounts.checkCardIssuance,
        body: data,
        method: 'POST',
      }),
    }),

    createUserCardAccount: builder.mutation<
      ICreateUserCardAccountResponse,
      ICreateUserCardAccountRequest
    >({
      query: (data) => ({
        url: endpoints.accounts.createUserCardAccount,
        body: data,
        method: 'POST',
      }),
      invalidatesTags: ['IBANAccounts'],
    }),
  }),
});

export const {
  useGetUserAccountByIBANQuery,
  useGetAccountByCardQuery,
  useGetAccountByTokenQuery,
  useLinkAccountWithCardMutation,
  useCheckCardIssuanceMutation,
  useCreateUserCardAccountMutation,
} = accountsApi;
