import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TokenType } from '../models/IAuth';

import { BASE_URL } from 'api/config';
import { localTokenHandler } from 'utils';

// TODO: add logic for token expired
// import { setTokenExpired } from './reducers/AuthSlice';
// import { setLogOut } from './reducers';

export const baseQueryCreator =
  (): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: BASE_URL(),
      prepareHeaders: (headers) => {
        const accessToken = localTokenHandler.getToken(TokenType.ACCESS);
        const temporaryToken = localTokenHandler.getToken(TokenType.TEMPORARY);
        if (accessToken) {
          headers.set('authorization', `Bearer ${accessToken}`);
        }
        if (temporaryToken) {
          headers.set('Temporary-Token', `${temporaryToken}`);
        }
        return headers;
      },
    });

    const response = await baseQuery(args, api, extraOptions);
    
    //TODO: add logic for token expired
    // if (response?.error) {
    //   const e = response.error;
    //   if (
    //     e.status === 401 ||
    //     e.data === 'Token Invalid' ||
    //     e.data === 'Token Expired'
    //   ) {
    //     // api.dispatch(setLogOut());
    //     e.data === 'Token Expired' && api.dispatch(setTokenExpired());
    //   }
    // }

    return response;
  };
