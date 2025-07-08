import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from 'api/config/api.config';
import { endpoints } from 'api/endpoints';
import { ETokenType } from 'enums';
import { localTokenHandler } from 'utils/auth/tokenHandler';

const token = localTokenHandler.getToken(ETokenType.ACCESS);

export const getUserIdApi = createApi({
  reducerPath: 'getUserIdApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['UserId'],
  endpoints: (builder) => ({
    getUserId: builder.query<{ userId: number }, void>({
      query: () => ({
        url: endpoints.users.getUserId(token ?? ''),
        method: 'GET',
      }),
      providesTags: ['UserId'],
    }),
  }),
});

export const { useGetUserIdQuery } = getUserIdApi;
