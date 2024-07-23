import { createApi } from '@reduxjs/toolkit/query/react';

import { IAuth, ILoginData } from '../models/IAuth';

import { endpoints } from './endpoints';

import { baseQueryCreator } from 'store/baseQueryCreator';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    authorize: builder.mutation<IAuth, ILoginData>({
      query: (credentials) => ({
        url: endpoints.userAccountManagement.users.authenticate,
        method: 'POST',
        body: credentials,
      }),
    }),
    sendcode: builder.mutation({
      query: () => ({
        url: endpoints.userAccountManagement.users.sendcode,
        method: 'GET',
      }),
    }),
    verifyCode: builder.mutation({
      query: (code) => ({
        url: endpoints.userAccountManagement.users.verifycode + `?code=${code}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAuthorizeMutation,
  useSendcodeMutation,
  useVerifyCodeMutation,
} = authApi;
