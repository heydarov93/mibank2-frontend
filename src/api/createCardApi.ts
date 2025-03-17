import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

import { TokenType } from 'models/IAuth';
import { sessionTokenHandler } from 'utils/tokenHandler';

export const createCardApi = createApi({
  reducerPath: 'createCardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  endpoints: (builder) => ({
    createCard: builder.mutation({
      query: (data) => ({
        url: endpoints.productManagement.cards.createCard,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionTokenHandler.getToken(TokenType.ACCESS)}`,
        },
      }),
    }),
  }),
});

export const { useCreateCardMutation } = createCardApi;
