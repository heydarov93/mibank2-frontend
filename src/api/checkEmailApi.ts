import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

import { baseQueryCreator } from 'store/baseQueryCreator';

export const checkEmailApi = createApi({
  reducerPath: 'checkEmailApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    checkEmail: builder.mutation({
      query: (email) => ({
        url: endpoints.userAccountManagement.users.checkEmail,
        method: 'POST',
        body: email,
      }),
    }),
  }),
});

export const { useCheckEmailMutation } = checkEmailApi;
