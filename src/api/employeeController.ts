import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

export const employeeControllerApi = createApi({
  reducerPath: 'employeeControllerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  endpoints: (builder) => ({
    validateEmail: builder.mutation({
      query: ({ email }) => ({
        url: endpoints.employeeAccountManagement.employees.validateEmail,
        method: 'POST',
        params: { email },
      }),
    }),
    viewEmployee: builder.query({
      query: () => ({
        url: endpoints.employeeAccountManagement.employees.viewEmployee,
        method: 'GET',
      }),
    }),
  }),
});

export const { useValidateEmailMutation, useViewEmployeeQuery } =
  employeeControllerApi;
