import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TContactTag } from './contacts.types';

import { BASE_URL } from 'api/config/api.config';
import { CACHE_DURATION } from 'api/constants/durations';
import { CONTACT_TAGS } from 'api/constants/tags';
import { endpoints } from 'api/endpoints';

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
        url: endpoints.contacts.getContactVersion,
        method: 'GET',
      }),
      providesTags: [CONTACT_TAGS.CONTACT_VERSION],
    }),
    getContacts: builder.query({
      query: () => ({
        url: endpoints.contacts.getContacts,
        method: 'GET',
      }),
      providesTags: [CONTACT_TAGS.CONTACTS],
    }),
  }),
});

export const { useGetContactVersionQuery, useGetContactsQuery } = contactsApi;
