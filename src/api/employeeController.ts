import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

import { baseQueryCreator } from 'store/baseQueryCreator';

export const employeeControllerApi = createApi({
  reducerPath: 'employeeControllerApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    validateEmail: builder.mutation({
      query: ({ email }) => ({
        url: endpoints.employeeAccountManagement.employees.validateEmail,
        method: 'POST',
        params: { email },
      }),
    }),
    viewEmployee: builder.query({
      query: ({ page, size }) => ({
        url: endpoints.employeeAccountManagement.employees.viewEmployee,
        method: 'GET',
        params: { page, size },
      }),
    }),
  }),
});

export const { useValidateEmailMutation, useViewEmployeeQuery } =
  employeeControllerApi;
