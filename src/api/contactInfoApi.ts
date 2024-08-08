import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { endpoints } from './endpoints';
import { BASE_URL } from './environmentVerification';

export const contactInfoApi = createApi({
  reducerPath: 'contactInfoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  endpoints: (builder) => ({
    getVersion: builder.query({
      query: () => endpoints.contactInfo.version,
    }),
    getContacts: builder.query({
      query: () => endpoints.contactInfo.contacts,
    }),
  }),
});

export const { useGetVersionQuery, useGetContactsQuery } = contactInfoApi;
