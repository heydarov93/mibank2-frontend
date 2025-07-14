import { createApi } from '@reduxjs/toolkit/query/react';

import {
  IConfirmForgotPasswordRequest,
  TUserAccountTag,
} from './user-acounts.types';

import { CACHE_DURATION } from 'api/constants/durations';
import { USER_ACCOUNT_TAGS } from 'api/constants/tags';
import { endpoints } from 'api/endpoints';
import { ETokenType } from 'enums';
import { IAuth, ILoginData } from 'models/IAuth';
import { IRegistrationForApi } from 'models/IRegistrationForApi';
import { baseQueryCreator } from 'store/baseQueryCreator';
import { getEmail, localTokenHandler } from 'utils/auth';

const email = getEmail();
const token = localTokenHandler.getToken(ETokenType.ACCESS);

export const userAccountsApi = createApi({
  reducerPath: 'userAccountsApi',
  baseQuery: baseQueryCreator(),
  tagTypes: Object.values(USER_ACCOUNT_TAGS) as TUserAccountTag[],
  keepUnusedDataFor: CACHE_DURATION.DEFAULT,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (data) => ({
        url: endpoints.users.getUserDetails(data.email),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
      }),
      providesTags: [USER_ACCOUNT_TAGS.USER_INFO],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),
    authorize: builder.mutation<IAuth, ILoginData>({
      query: (credentials) => ({
        url: endpoints.users.authenticateUser,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.AUTH],
    }),
    sendcode: builder.mutation({
      query: () => ({
        url: endpoints.users.sendLoginCode,
        method: 'GET',
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.CODE],
    }),
    verifyCode: builder.mutation({
      query: (code) => ({
        url: endpoints.users.verifyLoginCode,
        method: 'POST',
        body: code,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.CODE],
    }),
    checkEmail: builder.mutation({
      query: (email) => ({
        url: endpoints.users.checkUserEmail,
        method: 'POST',
        body: email,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.EMAIL],
    }),
    confirmForgotPassword: builder.mutation({
      query: (data: IConfirmForgotPasswordRequest) => ({
        url: endpoints.users.confirmForgotPassword,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.FORGOT_PASSWORD],
    }),
    registerNewUser: builder.mutation({
      query: (data) => ({
        url: endpoints.users.registerUser,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.REGISTRATION],
    }),
    getRefreshToken: builder.mutation({
      query: ({ email, refreshToken }) => ({
        url: endpoints.users.refreshAuthToken,
        method: 'POST',
        body: { email, refreshToken },
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.REFERSH_TOKEN],
    }),
    postRegistrationInfo: builder.mutation({
      query: (data: IRegistrationForApi) => ({
        url: endpoints.users.addUserDetails(email ?? ''),
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.REGISTRATION],
    }),
    getPostcode: builder.mutation({
      query: (address) => ({
        url: endpoints.users.getUserPostcode,
        method: 'POST',
        body: address,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.POST_CODE],
    }),
    getCodeForForgotPassword: builder.mutation({
      query: (data) => ({
        url: endpoints.users.sendForgotPasswordCode,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.FORGOT_PASSWORD],
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
