import { createApi } from '@reduxjs/toolkit/query/react';

import {
  IAuthenticateEmployeeResponse,
  IGetAuthenticateEmployeeResponse,
  IGetEmployeeListRequest,
  IGetEmployeeListResponse,
  IRegisterEmployeeRequest,
  TAuthenticateEmployeeRequest,
  TDeleteEmployeeRequest,
  TRegisterEmployeeResponse,
  TUpdateEmployeeRequest,
  TUpdateEmployeeResponse,
  TValidateEmployeeEmailResponse,
  TValidateOTPRequest,
  TValidateOTPResponse
} from './employees.types';

import { endpoints } from 'api/endpoints';
import { baseQueryCreator } from 'store/baseQueryCreator';
import { TId } from 'types/types';

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    validateEmployeeEmail: builder.mutation<
      TValidateEmployeeEmailResponse,
      { email: string }
    >({
      query: ({ email }) => ({
        url: endpoints.employees.validateEmployeeEmail,
        method: 'POST',
        params: { email },
      }),
    }),
    getEmployeeList: builder.query<
      IGetEmployeeListResponse,
      IGetEmployeeListRequest
    >({
      query: ({
        page,
        count,
        sortDateAdded,
        sortLastName,
        firstName,
        lastName,
      }) => ({
        url: endpoints.employees.getEmployeeList,
        method: 'GET',
        params: {
          page,
          count,
          sortDateAdded,
          sortLastName,
          firstName,
          lastName,
        },
      }),
    }),
    getAuthenticateEmployee: builder.query<
      IGetAuthenticateEmployeeResponse,
      { token: string }
    >({
      query: ({ token }) => ({
        url: endpoints.employees.setup2FA,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateEmployee: builder.mutation<
      TUpdateEmployeeResponse,
      TUpdateEmployeeRequest
    >({
      query: (data) => ({
        url: endpoints.employees.updateEmployee(data.id as TId),
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteEmployee: builder.mutation<void, TDeleteEmployeeRequest>({
      query: (id) => ({
        url: endpoints.employees.deleteEmployee(id),
        method: 'DELETE',
      }),
    }),
    validateOTP: builder.mutation<TValidateOTPResponse, TValidateOTPRequest>({
      query: (data) => ({
        url: endpoints.employees.validateOTP,
        method: 'POST',
        body: data,
      }),
    }),
    registerEmployee: builder.mutation<
      TRegisterEmployeeResponse,
      IRegisterEmployeeRequest
    >({
      query: (data) => ({
        url: endpoints.employees.registerEmployee,
        method: 'POST',
        body: data,
      }),
    }),
    authenticateEmployee: builder.mutation<
      IAuthenticateEmployeeResponse,
      TAuthenticateEmployeeRequest
    >({
      query: (data) => ({
        url: endpoints.employees.authenticateEmployee,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAuthenticateEmployeeQuery,
  useGetEmployeeListQuery,
  useValidateEmployeeEmailMutation,
  useAuthenticateEmployeeMutation,
  useRegisterEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useValidateOTPMutation,
} = employeesApi;
