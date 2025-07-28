import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import {
  AUTH_ERROR_STATUSES,
  TOKEN_ERROR_MESSAGES,
} from 'constants/api/errors';

export const isAuthError = (error: FetchBaseQueryError): boolean => {
  return (
    (typeof error.status === 'number' &&
      AUTH_ERROR_STATUSES.includes(error.status)) ||
    (typeof error.data === 'string' &&
      TOKEN_ERROR_MESSAGES.includes(error.data))
  );
};
