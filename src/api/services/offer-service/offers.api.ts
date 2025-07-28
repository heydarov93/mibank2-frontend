import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IGetOfferImagesResponse,
  IGetOfferPageResponse,
  IGetOffersParams,
  TOfferTag,
} from './offers.types';

import { BASE_URL } from 'api/config/api.config';
import { API_ENDPOINTS } from 'api/config/endpoints.config';
import { CACHE_DURATION } from 'constants/api/cache';
import { OFFER_TAGS } from 'constants/api/tags';
import { ETokenType } from 'enums';
import { localTokenHandler } from 'utils';

const token = localTokenHandler.getToken(ETokenType.ACCESS);

export const offersApi = createApi({
  reducerPath: 'offersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: Object.values(OFFER_TAGS) as TOfferTag[],
  keepUnusedDataFor: CACHE_DURATION.DEFAULT,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getOfferPage: builder.query<IGetOfferPageResponse, IGetOffersParams>({
      query: ({ page, size }) => ({
        url: API_ENDPOINTS.offers.getOfferPage,
        method: 'GET',
        params: { page, size },
      }),
      providesTags: [OFFER_TAGS.OFFER],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),
    getOfferImages: builder.query<IGetOfferImagesResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.offers.getOfferImages,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: [OFFER_TAGS.OFFER_IMAGE],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),
  }),
});

export const { useGetOfferPageQuery, useGetOfferImagesQuery } = offersApi;
