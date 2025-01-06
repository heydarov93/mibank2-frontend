import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

import { baseQueryCreator } from 'store/baseQueryCreator';

export const refreshToken = createApi({
  reducerPath: 'refreshToken',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    getRefreshToken: builder.mutation({
      query: ({ email, refreshToken }) => ({
        url: endpoints.userAccountManagement.users.refreshToken,
        method: 'POST',
        body: { email, refreshToken },
      }),
    }),
  }),
});

export const { useGetRefreshTokenMutation } = refreshToken;
