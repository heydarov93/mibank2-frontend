import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

import { baseQueryCreator } from 'store/baseQueryCreator';

export const authenticateEmployeeApi = createApi({
  reducerPath: 'authenticateEmployeeApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    getAuthenticateEmployee: builder.query({
      query: (data) => ({
        url: endpoints.employeeAccountManagement.employees.authenticatorSetup,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});

export const { useGetAuthenticateEmployeeQuery } = authenticateEmployeeApi;
