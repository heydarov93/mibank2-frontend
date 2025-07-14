import { createApi } from '@reduxjs/toolkit/query/react';

import {
  IAuthenticateEmployeeResponse,
  IGetAuthenticateEmployeeResponse,
  IGetEmployeeListRequest,
  IGetEmployeeListResponse,
  IRegisterEmployeeRequest,
  TAuthenticateEmployeeRequest,
  TDeleteEmployeeRequest,
  TEmployeeTag,
  TRegisterEmployeeResponse,
  TUpdateEmployeeRequest,
  TUpdateEmployeeResponse,
  TValidateEmployeeEmailResponse,
  TValidateOTPRequest,
  TValidateOTPResponse,
} from './employees.types';

import { CACHE_DURATION } from 'api/constants/durations';
import { EMPLOYEE_TAGS } from 'api/constants/tags';
import { endpoints } from 'api/endpoints';
import { baseQueryCreator } from 'store/baseQueryCreator';
import { TId } from 'types/types';

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: baseQueryCreator(),
  tagTypes: Object.values(EMPLOYEE_TAGS) as TEmployeeTag[],
  keepUnusedDataFor: CACHE_DURATION.DEFAULT,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
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
      invalidatesTags: [EMPLOYEE_TAGS.EMAIL],
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
      providesTags: (result) => [
        ...(result?.data || []).map(({ id }) => ({
          type: EMPLOYEE_TAGS.EMPLOYEE,
          id,
        })),
        { type: EMPLOYEE_TAGS.EMPLOYEE, id: EMPLOYEE_TAGS.LIST },
      ],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
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
      providesTags: (_result, _error, { token }) => [
        { type: EMPLOYEE_TAGS.EMPLOYEE, id: token },
      ],
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
      invalidatesTags: (_result, _error, { id }) => [
        { type: EMPLOYEE_TAGS.EMPLOYEE, id },
        { type: EMPLOYEE_TAGS.EMPLOYEE, id: EMPLOYEE_TAGS.LIST },
      ],
    }),
    deleteEmployee: builder.mutation<void, TDeleteEmployeeRequest>({
      query: (id) => ({
        url: endpoints.employees.deleteEmployee(id),
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: EMPLOYEE_TAGS.EMPLOYEE, id },
        { type: EMPLOYEE_TAGS.EMPLOYEE, id: EMPLOYEE_TAGS.LIST },
      ],
    }),
    validateOTP: builder.mutation<TValidateOTPResponse, TValidateOTPRequest>({
      query: (data) => ({
        url: endpoints.employees.validateOTP,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [EMPLOYEE_TAGS.OTP],
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
      invalidatesTags: [
        { type: EMPLOYEE_TAGS.EMPLOYEE, id: EMPLOYEE_TAGS.LIST },
      ],
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
      invalidatesTags: [EMPLOYEE_TAGS.AUTH],
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
