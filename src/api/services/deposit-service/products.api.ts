import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IGetProductsRequest,
  IGetProductsResponse
} from './types/products.types';

import { BASE_URL } from 'api/config/api.config';
import { endpoints } from 'api/endpoints';
import { ETokenType } from 'enums';
import { sessionTokenHandler } from 'utils/auth/tokenHandler';

const token = sessionTokenHandler.getToken(ETokenType.ACCESS);

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Products'],
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
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
