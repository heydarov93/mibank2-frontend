import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from 'api/config/api.config';
import { endpoints } from 'api/endpoints';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getContactVersion: builder.query<{ id: number }, null>({
      query: () => ({
        url: endpoints.contacts.getContactVersion,
        method: 'GET',
      }),
    }),
    getContacts: builder.query({
      query: () => ({
        url: endpoints.contacts.getContacts,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetContactVersionQuery, useGetContactsQuery } = contactsApi;
