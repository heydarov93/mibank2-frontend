import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

import { baseQueryCreator } from 'store/baseQueryCreator';

export const employeeLogInApi = createApi({
  reducerPath: 'employeeLogInApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => ({
        url: endpoints.employeeAccountManagement.employees.authenticateEmployee,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLogInMutation } = employeeLogInApi;
