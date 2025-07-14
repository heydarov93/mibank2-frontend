import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IGetProductsRequest,
  IGetProductsResponse,
  TProductTag,
} from './types/products.types';

import { BASE_URL } from 'api/config/api.config';
import { CACHE_DURATION } from 'api/constants/durations';
import { PRODUCT_TAGS } from 'api/constants/tags';
import { endpoints } from 'api/endpoints';
import { ETokenType } from 'enums';
import { sessionTokenHandler } from 'utils/auth/tokenHandler';

const token = sessionTokenHandler.getToken(ETokenType.ACCESS);

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: Object.values(PRODUCT_TAGS) as TProductTag[],
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getProducts: builder.query<IGetProductsResponse, IGetProductsRequest>({
      query: ({ page, size, search }) => ({
        url: endpoints.productManagement.products.getProducts,
        method: 'GET',
        params: { page, size, search },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: [{ type: PRODUCT_TAGS.PRODUCT, id: PRODUCT_TAGS.LIST }],
      keepUnusedDataFor: CACHE_DURATION.MEDIUM,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
