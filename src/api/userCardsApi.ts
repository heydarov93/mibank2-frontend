import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

import {
  ECardType,
  ECardIssuer,
  ECardIssueType,
  ECardStatus,
  IssuanceCardData,
} from 'models/IProductInfo';

interface GetCardsParams {
  page?: number;
  count?: number;
  cardName?: string;
  cardType?: ECardType;
  cardIssuer?: ECardIssuer;
  issueType?: ECardIssueType;
  cardCurrency?: string;
  cardStatus?: ECardStatus;
}

interface GetCardsResponse {
  data: IssuanceCardData[];
  hasNextPage: boolean;
  lastPageNumber: number;
  totalElements: number;
}

interface IssueUserCardRequest {
  idempotencyKey: string;
  cardId: number;
  userId: number;
  paymentAccount: string;
  linkedAccount: string;
  issuanceFee: number;
  issuanceFeeCurrency: string;
}

export const userCardsApi = createApi({
  reducerPath: 'userCardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  tagTypes: ['Cards'],
  endpoints: (builder) => ({
    getCards: builder.query<GetCardsResponse, GetCardsParams>({
      query: (params) => ({
        url: endpoints.userCards.getCards,
        method: 'GET',
        params: {
          page: 0,
          count: 10,
          ...params,
        },
      }),
      providesTags: ['Cards'],
    }),
    issueUserCard: builder.mutation<string, IssueUserCardRequest>({
      query: (data) => ({
        url: endpoints.userCards.issueUserCard,
        body: data,
        method: 'POST',
        responseHandler: 'text',
      }),
      invalidatesTags: ['Cards'],
    }),
  }),
});

export const {
  useGetCardsQuery,
  useLazyGetCardsQuery,
  useIssueUserCardMutation,
} = userCardsApi;
