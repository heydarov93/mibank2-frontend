import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TUserAccountTag } from './user-acounts.types';

import { BASE_URL } from 'api/config/api.config';
import { API_ENDPOINTS } from 'api/config/endpoints.config';
import { CACHE_DURATION } from 'constants/api/cache';
import { USER_ACCOUNT_TAGS } from 'constants/api/tags';
import { ETokenType } from 'enums';
import { localTokenHandler } from 'utils/auth/tokenHandler';

const token = localTokenHandler.getToken(ETokenType.ACCESS);

export const getUserIdApi = createApi({
  reducerPath: 'getUserIdApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: Object.values(USER_ACCOUNT_TAGS) as TUserAccountTag[],
  keepUnusedDataFor: CACHE_DURATION.DEFAULT,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getUserId: builder.query<{ userId: number }, void>({
      query: () => ({
        url: API_ENDPOINTS.users.getUserId,
        method: 'GET',
        params: { token },
      }),
      providesTags: (result) =>
        result ? [{ type: USER_ACCOUNT_TAGS.USER_ID, id: result.userId }] : [],
    }),
  }),
});

export const { useGetUserIdQuery } = getUserIdApi;
