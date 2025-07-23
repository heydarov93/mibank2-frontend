import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TContactTag } from './contacts.types';

import { BASE_URL } from 'api/config/api.config';
import { API_ENDPOINTS } from 'api/config/endpoints.config';
import { CACHE_DURATION } from 'constants/api/cache';
import { CONTACT_TAGS } from 'constants/api/tags';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: Object.values(CONTACT_TAGS) as TContactTag[],
  keepUnusedDataFor: CACHE_DURATION.DEFAULT,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getContactVersion: builder.query<{ id: number }, null>({
      query: () => ({
        url: API_ENDPOINTS.contacts.getContactVersion,
        method: 'GET',
      }),
      providesTags: [CONTACT_TAGS.CONTACT_VERSION],
    }),
    getContacts: builder.query({
      query: () => ({
        url: API_ENDPOINTS.contacts.getContacts,
        method: 'GET',
      }),
      providesTags: [CONTACT_TAGS.CONTACTS],
    }),
  }),
});

export const { useGetContactVersionQuery, useGetContactsQuery } = contactsApi;
