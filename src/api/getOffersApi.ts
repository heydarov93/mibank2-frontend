import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

import { ETokenType } from 'enums';
import { localTokenHandler } from 'utils/auth';

export interface Offer {
  name: string;
  description: string;
  banner: string;
}
interface GetOffersParams {
  page: number;
  size: number;
}

interface GetOffersResponse {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: Offer[];
  number: number;
  numberOfElements: number;
  empty: boolean;
}

interface GetImagesResponse {
  imageFiles: string[];
}

export const getOffersApi = createApi({
  reducerPath: 'getOffersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  tagTypes: ['Offers', 'OfferImages'],
  endpoints: (builder) => ({
    getOffers: builder.query<GetOffersResponse, GetOffersParams>({
      query: ({ page, size }) => ({
        url: endpoints.offers.getOffer,
        method: 'GET',
        params: { page, size },
      }),
      providesTags: ['Offers'],
    }),
    getOfferImages: builder.query<GetImagesResponse, void>({
      query: () => ({
        url: endpoints.offers.getOfferImages,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localTokenHandler.getToken(ETokenType.ACCESS)}`,
        },
      }),
      providesTags: ['OfferImages'],
    }),
  }),
});

export const { useGetOffersQuery, useGetOfferImagesQuery } = getOffersApi;
