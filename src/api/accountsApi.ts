import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

import { TokenType } from 'models/IAuth';
import { localTokenHandler } from 'utils';

interface IBANAccountResponse {
  userAccountId: string;
  userId: number;
  productId: number;
  ibanNum: string;
  swiftNum: string;
  currency: string;
  currentAccountBalance: number;
  accountStartDate: string;
  accountStatus: string;
  bankDepartment: string;
  lastTransaction: string;
  version: number;
}

interface ICardAccountResponse {
  userCardId: string;
  cardNumber: string;
  cardholderName: string;
  cardExpiryDate: string;
  userDailyLimit: number;
  userCardStatus: string;
}

export interface ITransferRequestIBAN {
  senderIbanNumber: string;
  recipientIbanNumber: string;
  amount: string;
  currency: string;
  message?: string;
}

export interface ITransferRequestCard {
  senderCardNumber: string;
  recipientCardNumber: string;
  amount: string;
  currency: string;
  message?: string;
}

export interface ITransferSuccessResponseIBAN {
  transactionId: string;
  status: string;
  fee: number;
  totalDeduction: number;
  message: string;
}

export interface ITransferSuccessResponseCard {
  transactionId: string;
  status: string;
  fee: number;
  totalDeduction: number;
  message: string;
}

interface IFeeRequest {
  amount: string;
  isInternal: boolean;
  transferType: 'card' | 'iban';
}

interface IFeeResponse {
  amount: number;
  fee: number;
  totalAmount: number;
}

interface ILinkAccountWithCardRequest {
  accountId: string;
  cardId: number;
  currencyCode: string;
}

interface ICheckCardIssuanceRequest {
  paymentAccount: string;
  issuanceCurrency: string;
  issuanceAmount: number;
}

interface ICheckCardIssuanceResponse {
  userAccountId: string;
  isEligible: boolean;
}

interface ICreateUserCardAccRequest {
  userId: number;
  cardId: number;
  currencyCode: string;
}

interface ICreateUserCardAccResponse {
  userAccountId: string;
  userId: number;
  productId: number;
  ibanNum: string;
  swiftNum: string;
  currency: string;
  currentAccountBalance: number;
  accountStartDate: string;
  accountStatus: string;
  bankDepartment: string;
  lastTransaction: string;
}

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  tagTypes: ['IBANAccounts', 'CardAccounts', 'UserAccountsByToken'],
  endpoints: (builder) => ({
    getIBANAccounts: builder.query<IBANAccountResponse[], { userId: number }>({
      query: ({ userId }) => ({
        url: endpoints.accounts.iban,
        params: { userId },
      }),
      providesTags: ['IBANAccounts'],
    }),

    getCardAccounts: builder.query<ICardAccountResponse[], { userId: number }>({
      query: ({ userId }) => ({
        url: endpoints.accounts.card,
        params: { userId },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localTokenHandler.getToken(TokenType.ACCESS)}`,
        },
      }),
      providesTags: ['CardAccounts'],
    }),

    transferToIBAN: builder.mutation<
      ITransferSuccessResponseIBAN,
      ITransferRequestIBAN
    >({
      query: (data) => ({
        url: endpoints.accounts.transfer.toIBAN,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['IBANAccounts'],
    }),

    transferToCard: builder.mutation<
      ITransferSuccessResponseCard,
      ITransferRequestCard
    >({
      query: (data) => ({
        url: endpoints.accounts.transfer.toCard,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CardAccounts'],
    }),

    getTransferFee: builder.query<IFeeResponse, IFeeRequest>({
      query: ({ amount, isInternal, transferType }) => ({
        url: endpoints.accounts.transfer.fee,
        params: { amount, isInternal, transferType },
      }),
    }),

    getUserAccountsByToken: builder.query({
      query: ({ token }) => ({
        url: endpoints.accounts.ibanByToken,
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
      ICreateUserCardAccResponse,
      ICreateUserCardAccRequest
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
  useGetIBANAccountsQuery,
  useGetCardAccountsQuery,
  useTransferToIBANMutation,
  useTransferToCardMutation,
  useGetTransferFeeQuery,
  useLinkAccountWithCardMutation,
  useCheckCardIssuanceMutation,
  useCreateUserCardAccountMutation,
} = accountsApi;
