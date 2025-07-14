import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TUserAccountTag } from './user-acounts.types';

import { BASE_URL } from 'api/config/api.config';
import { CACHE_DURATION } from 'api/constants/durations';
import { USER_ACCOUNT_TAGS } from 'api/constants/tags';
import { endpoints } from 'api/endpoints';
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
        url: endpoints.users.getUserId(token ?? ''),
        method: 'GET',
      }),
      providesTags: [{ type: USER_ACCOUNT_TAGS.USER_ID, id: token ?? '' }],
    }),
  }),
});

export const { useGetUserIdQuery } = getUserIdApi;
