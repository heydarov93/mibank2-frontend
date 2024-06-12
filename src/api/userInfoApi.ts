import { createApi } from '@reduxjs/toolkit/query/react';

import { IUserInfo } from '../models/IUserInfo';

import { endpoints } from './endpoints';

import { baseQueryCreator } from 'store/baseQueryCreator';

// TODO: remove once BE api is ready
const mockEmail = 'jopoxemuxou-1783@yopmail.com';

export const userInfoApi = createApi({
  reducerPath: 'userInfoApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    getUserInfo: builder.query<IUserInfo, void>({
      query: () =>
        `${endpoints.userAccountManagement.users.userInformation}?email=${mockEmail}`,
    }),
  }),
});

export const { useLazyGetUserInfoQuery, useGetUserInfoQuery } = userInfoApi;
