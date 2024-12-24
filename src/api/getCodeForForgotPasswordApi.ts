import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

import { baseQueryCreator } from 'store/baseQueryCreator';

export const getCodeForForgotPasswordApi = createApi({
  reducerPath: 'getCodeForForgotPassword',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    getCodeForForgotPassword: builder.mutation({
      query: (data) => ({
        url: endpoints.userAccountManagement.users.forgotPassword,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetCodeForForgotPasswordMutation } =
  getCodeForForgotPasswordApi;
