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
      query: ({ page, size, sortDateAdded, sortLastName }) => ({
        url: endpoints.employeeAccountManagement.employees.viewEmployee,
        method: 'GET',
        params: { page, count: size, sortDateAdded, sortLastName },
      }),
    }),
    updateEmployee: builder.mutation({
      query: (data) => ({
        url: `${endpoints.employeeAccountManagement.employees.updateEmployee}/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteEmployee: builder.mutation({
      query: (data) => ({
        url: `${endpoints.employeeAccountManagement.employees.deleteEmployee}/${data.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useValidateEmailMutation,
  useViewEmployeeQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeControllerApi;
