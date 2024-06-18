import { createApi } from '@reduxjs/toolkit/query/react';

import { IUserInfo } from '../models/IUserInfo';

import { endpoints } from './endpoints';

import { baseQueryCreator } from 'store/baseQueryCreator';

export const userInfoApi = createApi({
  reducerPath: 'userInfoApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    getUserInfo: builder.query<IUserInfo, string | undefined>({
      query: (email) =>
        `${endpoints.userAccountManagement.users.userInformation}?email=${email}`,
    }),
  }),
});

export const { useLazyGetUserInfoQuery, useGetUserInfoQuery } = userInfoApi;
