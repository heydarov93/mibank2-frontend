import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

import { baseQueryCreator } from 'store/baseQueryCreator';

export const registerNewUserApi = createApi({
  reducerPath: 'createNewUserApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    registerNewUser: builder.mutation({
      query: (data) => ({
        url: endpoints.userAccountManagement.users.registerNewUser,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useRegisterNewUserMutation } = registerNewUserApi;
