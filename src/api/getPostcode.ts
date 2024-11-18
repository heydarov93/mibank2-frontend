import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

import { baseQueryCreator } from 'store/baseQueryCreator';

export const getPostcode = createApi({
  reducerPath: 'getPostcode',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    getPostcode: builder.mutation({
      query: (address) => ({
        url: endpoints.userAccountManagement.users.getPostcode,
        method: 'POST',
        body: address,
      }),
    }),
  }),
});

export const { useGetPostcodeMutation } = getPostcode;
