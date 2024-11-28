import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

import { baseQueryCreator } from 'store/baseQueryCreator';

export const userInfoApi = createApi({
  reducerPath: 'userInfoApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (data) => ({
        url: `${endpoints.userAccountManagement.users.userInformation}?email=${data.email}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});

export const { useLazyGetUserInfoQuery, useGetUserInfoQuery } = userInfoApi;
