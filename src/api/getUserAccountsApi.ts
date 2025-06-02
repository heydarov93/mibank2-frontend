import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';


export const getUserAccountsApi = createApi({
  reducerPath: 'getUserAccountsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  tagTypes: ['userAccounts'],
  endpoints: (builder) => ({
    getUserAccounts: builder.query({
      query: ({ token }) => ({
        url: endpoints.userAccountManagement.users.getUserAccounts,
        method: 'GET',
        params: { token },
      }),
      providesTags: ['userAccounts'],
    }),
  }),
});

export const { useGetUserAccountsQuery } = getUserAccountsApi;
