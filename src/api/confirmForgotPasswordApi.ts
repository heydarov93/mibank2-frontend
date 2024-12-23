import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

import { IForgotPasswordForApi } from 'models/IForgotPasswordForApi';
import { baseQueryCreator } from 'store/baseQueryCreator';

export const confirmForgotPasswordApi = createApi({
  reducerPath: 'confirmForgotPasswordApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    confirmForgotPassword: builder.mutation({
      query: (data: IForgotPasswordForApi) => ({
        url: endpoints.userAccountManagement.users.confirmForgotPassword,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useConfirmForgotPasswordMutation } = confirmForgotPasswordApi;
