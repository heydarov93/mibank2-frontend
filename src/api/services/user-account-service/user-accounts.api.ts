import { createApi } from '@reduxjs/toolkit/query/react';

import { IConfirmForgotPasswordRequest } from './user-acounts.types';

import { endpoints } from 'api/endpoints';
import { ETokenType } from 'enums';
import { IAuth, ILoginData } from 'models/IAuth';
import { IRegistrationForApi } from 'models/IRegistrationForApi';
import { baseQueryCreator } from 'store/baseQueryCreator';
import { getEmail, localTokenHandler } from 'utils';

export const userAccountsApi = createApi({
  reducerPath: 'userAccountsApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (data) => ({
        url: endpoints.users.getUserDetails(data.email),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    authorize: builder.mutation<IAuth, ILoginData>({
      query: (credentials) => ({
        url: endpoints.users.authenticateUser,
        method: 'POST',
        body: credentials,
      }),
    }),
    sendcode: builder.mutation({
      query: () => ({
        url: endpoints.users.sendLoginCode,
        method: 'GET',
      }),
    }),
    verifyCode: builder.mutation({
      query: (code) => ({
        url: endpoints.users.verifyLoginCode,
        method: 'POST',
        body: code,
      }),
    }),
    checkEmail: builder.mutation({
      query: (email) => ({
        url: endpoints.users.checkUserEmail,
        method: 'POST',
        body: email,
      }),
    }),
    confirmForgotPassword: builder.mutation({
      query: (data: IConfirmForgotPasswordRequest) => ({
        url: endpoints.users.confirmForgotPassword,
        method: 'POST',
        body: data,
      }),
    }),
    registerNewUser: builder.mutation({
      query: (data) => ({
        url: endpoints.users.registerUser,
        method: 'POST',
        body: data,
      }),
    }),
    getRefreshToken: builder.mutation({
      query: ({ email, refreshToken }) => ({
        url: endpoints.users.refreshAuthToken,
        method: 'POST',
        body: { email, refreshToken },
      }),
    }),
    postRegistrationInfo: builder.mutation({
      query: (data: IRegistrationForApi) => ({
        url: endpoints.users.addUserDetails(getEmail() ?? ''),
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${localTokenHandler.getToken(ETokenType.ACCESS)}`,
        },
      }),
    }),
    getPostcode: builder.mutation({
      query: (address) => ({
        url: endpoints.users.getUserPostcode,
        method: 'POST',
        body: address,
      }),
    }),
    getCodeForForgotPassword: builder.mutation({
      query: (data) => ({
        url: endpoints.users.sendForgotPasswordCode,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
  useAuthorizeMutation,
  useSendcodeMutation,
  useVerifyCodeMutation,
  useCheckEmailMutation,
  useConfirmForgotPasswordMutation,
  useRegisterNewUserMutation,
  useGetRefreshTokenMutation,
  usePostRegistrationInfoMutation,
  useGetPostcodeMutation,
  useGetCodeForForgotPasswordMutation,
} = userAccountsApi;
