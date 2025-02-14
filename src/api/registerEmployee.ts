import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

import { baseQueryCreator } from 'store/baseQueryCreator';

export const registerEmployeeApi = createApi({
  reducerPath: 'registerEmployeeApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    registerEmployee: builder.mutation({
      query: (data) => ({
        url: endpoints.employeeAccountManagement.employees.registerEmployee,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useRegisterEmployeeMutation } = registerEmployeeApi;
