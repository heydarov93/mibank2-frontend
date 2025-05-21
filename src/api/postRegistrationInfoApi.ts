import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

import { TokenType } from 'models/IAuth';
import { IRegistrationForApi } from 'models/IRegistrationForApi';
import { baseQueryCreator } from 'store/baseQueryCreator';
import { getEmail, localTokenHandler } from 'utils';

export const postRegistrationInfoApi = createApi({
  reducerPath: 'postRegistrationInfoApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    postRegistrationInfo: builder.mutation({
      query: (data: IRegistrationForApi) => ({
        url: `${endpoints.userAccountManagement.users.postRegistrationInfo}?email=${getEmail()}`,
        headers: {
          Authorization: `Bearer ${localTokenHandler.getToken(TokenType.ACCESS)}`,
        },
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { usePostRegistrationInfoMutation } = postRegistrationInfoApi;
