import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from 'api/config/api.config';
import { clearAllTokens, prepareAuthHeaders } from 'utils/auth';
import { isAuthError } from 'utils/helpers';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: prepareAuthHeaders,
});

export const createBaseQuery = (): BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> => {
  return async (args, api, extraOptions) => {
    const response = await baseQuery(args, api, extraOptions);

    if (response.error && isAuthError(response.error)) {
      clearAllTokens();
    }

    return response;
  };
};
