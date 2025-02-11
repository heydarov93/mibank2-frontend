import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';

import { baseQueryCreator } from 'store/baseQueryCreator';

export const validateOtpApi = createApi({
  reducerPath: 'validateOtpApi',
  baseQuery: baseQueryCreator(),
  endpoints: (builder) => ({
    validateOtp: builder.mutation({
      query: (data) => ({
        url: endpoints.employeeAccountManagement.employees.validateOtp,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useValidateOtpMutation } = validateOtpApi;
