import { createApi } from '@reduxjs/toolkit/query/react';

import {
  IConfirmForgotPasswordRequest,
  ILegalEntitySignUpRequest,
  ILegalEntityValidationRequest,
  IRegistrationResponse,
  TUserAccountTag,
} from './user-acounts.types';

import { API_ENDPOINTS } from 'api/config/endpoints.config';
import { createBaseQuery } from 'api/core/base-query';
import { CACHE_DURATION } from 'constants/api/cache';
import { USER_ACCOUNT_TAGS } from 'constants/api/tags';
import { ETokenType } from 'enums';
import { IAuth, ILoginData } from 'models/IAuth';
import { getEmail, localTokenHandler } from 'utils/auth';

const email = getEmail();
const token = localTokenHandler.getToken(ETokenType.ACCESS);

export const userAccountsApi = createApi({
  reducerPath: 'userAccountsApi',
  baseQuery: createBaseQuery(),
  tagTypes: Object.values(USER_ACCOUNT_TAGS) as TUserAccountTag[],
  keepUnusedDataFor: CACHE_DURATION.DEFAULT,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (data) => ({
        url: API_ENDPOINTS.users.getUserDetails(data.email),
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
        url: API_ENDPOINTS.users.authenticateUser,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.AUTH],
    }),
    sendcode: builder.mutation({
      query: () => ({
        url: API_ENDPOINTS.users.sendLoginCode,
        method: 'GET',
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.CODE],
    }),
    verifyCode: builder.mutation({
      query: (code) => ({
        url: API_ENDPOINTS.users.verifyLoginCode,
        method: 'POST',
        body: code,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.CODE],
    }),
    checkEmail: builder.mutation({
      query: (email) => ({
        url: API_ENDPOINTS.users.checkUserEmail,
        method: 'POST',
        body: email,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.EMAIL],
    }),
    confirmForgotPassword: builder.mutation({
      query: (data: IConfirmForgotPasswordRequest) => ({
        url: API_ENDPOINTS.users.confirmForgotPassword,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.FORGOT_PASSWORD],
    }),
    registerNewUser: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.users.registerUser,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.REGISTRATION],
    }),
    getRefreshToken: builder.mutation({
      query: ({ email, refreshToken }) => ({
        url: API_ENDPOINTS.users.refreshAuthToken,
        method: 'POST',
        body: { email, refreshToken },
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.REFERSH_TOKEN],
    }),
    postRegistrationInfo: builder.mutation({
      query: (data: IRegistrationResponse) => ({
        url: API_ENDPOINTS.users.addUserDetails(email ?? ''),
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
        url: API_ENDPOINTS.users.getUserPostcode,
        method: 'POST',
        body: address,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.POST_CODE],
    }),
    getCodeForForgotPassword: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.users.sendForgotPasswordCode,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.FORGOT_PASSWORD],
    }),
    postValidationLegalEntityInfo: builder.mutation({
      query: (data: ILegalEntityValidationRequest) => ({
        url: API_ENDPOINTS.legalEntities.checkLegalEntityUniques,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.LEGAL_ENTITY_VALIDATION],
    }),
    postRegistrationLegalEntityInfo: builder.mutation({
      query: (data: ILegalEntitySignUpRequest) => ({
        url: API_ENDPOINTS.legalEntities.registerLegalEntity,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [USER_ACCOUNT_TAGS.LEGAL_ENTITY_SIGN_UP],
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
  usePostValidationLegalEntityInfoMutation,
  usePostRegistrationLegalEntityInfoMutation,
} = userAccountsApi;
