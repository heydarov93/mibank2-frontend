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
  TAccountsTag,
} from './types/accounts.types';

import { BASE_URL } from 'api/config/api.config';
import { API_ENDPOINTS } from 'api/config/endpoints.config';
import { CACHE_DURATION } from 'constants/api/cache';
import { ACCOUNT_TAGS } from 'constants/api/tags';
import { ETokenType } from 'enums';
import { localTokenHandler } from 'utils';

const token = localTokenHandler.getToken(ETokenType.ACCESS);

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: Object.values(ACCOUNT_TAGS) as TAccountsTag[],
  keepUnusedDataFor: CACHE_DURATION.DEFAULT,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getUserAccountByIBAN: builder.query<
      IGetUserAccountByIBANResponse[],
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: API_ENDPOINTS.accounts.getUserAccountByIBAN,
        params: { userId },
      }),
      providesTags: (_result, _error, { userId }) => [
        { type: ACCOUNT_TAGS.IBAN, id: userId },
      ],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),

    getAccountByCard: builder.query<
      IGetAccountByCardResponse[],
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: API_ENDPOINTS.accounts.getAccountByCard,
        params: { userId },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (_result, _error, { userId }) => [
        { type: ACCOUNT_TAGS.CARD, id: userId },
      ],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),

    getAccountByToken: builder.query<
      IGetAccountByTokenResponse,
      { token: string }
    >({
      query: ({ token }) => ({
        url: API_ENDPOINTS.accounts.getAccountByToken,
        method: 'GET',
        params: { token },
      }),
      providesTags: (_result, _error, { token }) => [
        { type: ACCOUNT_TAGS.USER_BY_TOKEN, id: token },
      ],
    }),

    linkAccountWithCard: builder.mutation<void, ILinkAccountWithCardRequest>({
      query: (data) => ({
        url: API_ENDPOINTS.accounts.linkAccountWithCard,
        body: data,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _error, { cardId, accountId }) => [
        { type: ACCOUNT_TAGS.CARD, id: accountId },
        { type: ACCOUNT_TAGS.IBAN, id: accountId },
        { type: ACCOUNT_TAGS.CARD, id: cardId },
        { type: ACCOUNT_TAGS.IBAN, id: cardId },
        ACCOUNT_TAGS.LINK_ACCOUNT,
      ],
    }),

    checkCardIssuance: builder.mutation<
      ICheckCardIssuanceResponse,
      ICheckCardIssuanceRequest
    >({
      query: (data) => ({
        url: API_ENDPOINTS.accounts.checkCardIssuance,
        body: data,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { paymentAccount }) => [
        { type: ACCOUNT_TAGS.CARD, id: paymentAccount },
        ACCOUNT_TAGS.CARD_ISSUANCE,
      ],
    }),

    createUserCardAccount: builder.mutation<
      ICreateUserCardAccountResponse,
      ICreateUserCardAccountRequest
    >({
      query: (data) => ({
        url: API_ENDPOINTS.accounts.createUserCardAccount,
        body: data,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: ACCOUNT_TAGS.CARD, id: userId },
        { type: ACCOUNT_TAGS.IBAN, id: userId },
        ACCOUNT_TAGS.USER_CARD_ACCOUNT,
      ],
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
