import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

import { IRegistrationForApi } from 'models/IRegistrationForApi';
import { baseQueryCreator } from 'store/baseQueryCreator';

export const postRegistrationInfoApi = createApi({
  reducerPath: 'postRegistrationInfoApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    postRegistrationInfo: builder.mutation({
      query: ({ email, accessToken, ...data }: IRegistrationForApi) => ({
        url: `${endpoints.userAccountManagement.users.postRegistrationInfo}?email=${email}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { usePostRegistrationInfoMutation } = postRegistrationInfoApi;
