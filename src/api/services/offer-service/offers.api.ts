import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IGetOfferImagesResponse,
  IGetOfferPageResponse,
  IGetOffersParams
} from './offers.types';

import { BASE_URL } from 'api/config/api.config';
import { endpoints } from 'api/endpoints';
import { ETokenType } from 'enums';
import { localTokenHandler } from 'utils';

const token = localTokenHandler.getToken(ETokenType.ACCESS);

export const offersApi = createApi({
  reducerPath: 'offersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Offers', 'OfferImages'],
  endpoints: (builder) => ({
    getOfferPage: builder.query<IGetOfferPageResponse, IGetOffersParams>({
      query: ({ page, size }) => ({
        url: endpoints.offers.getOfferPage,
        method: 'GET',
        params: { page, size },
      }),
      providesTags: ['Offers'],
    }),
    getOfferImages: builder.query<IGetOfferImagesResponse, void>({
      query: () => ({
        url: endpoints.offers.getOfferImages,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['OfferImages'],
    }),
  }),
});

export const { useGetOfferPageQuery, useGetOfferImagesQuery } = offersApi;
