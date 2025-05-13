import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './config';
import { endpoints } from './endpoints';

import { TokenType } from 'models/IAuth';
import { sessionTokenHandler } from 'utils/tokenHandler';

export const getProductsApi = createApi({
  reducerPath: 'getProductsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL(),
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, size, search }) => ({
        url: endpoints.productManagement.products.getProducts,
        method: 'GET',
        params: { page, size, search },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionTokenHandler.getToken(TokenType.ACCESS)}`,
        },
      }),
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsQuery } = getProductsApi;
