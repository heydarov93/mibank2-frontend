import { Middleware } from '@reduxjs/toolkit';

import {
  accountsApi,
  cardsApi,
  contactsApi,
  depositsApi,
  employeesApi,
  exchangeRatesApi,
  getUserIdApi,
  offersApi,
  productsApi,
  transfersApi,
  transactionsApi,
  userAccountsApi,
  userDepositsApi,
} from 'api';

export const API_MIDDLEWARES: Middleware[] = [
  userAccountsApi.middleware,
  contactsApi.middleware,
  employeesApi.middleware,
  depositsApi.middleware,
  accountsApi.middleware,
  transfersApi.middleware,
  transactionsApi.middleware,
  getUserIdApi.middleware,
  exchangeRatesApi.middleware,
  productsApi.middleware,
  offersApi.middleware,
  cardsApi.middleware,
  userDepositsApi.middleware,
];
