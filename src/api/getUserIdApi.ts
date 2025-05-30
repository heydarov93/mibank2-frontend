import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

import { TokenType } from 'models/IAuth';
import { localTokenHandler } from 'utils/tokenHandler';

export const getUserIdApi = createApi({
  reducerPath: 'getUserIdApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  tagTypes: ['UserId'],
  endpoints: (builder) => ({
    getUserId: builder.query<{ userId: number }, void>({
      query: () => ({
        url: `${endpoints.userAccountManagement.users.userId}?token=${localTokenHandler.getToken(TokenType.ACCESS)}`,
      }),
      providesTags: ['UserId'],
    }),
  }),
});

export const { useGetUserIdQuery } = getUserIdApi;
