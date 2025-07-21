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
  userAccountsApi,
  userDepositsApi,
} from 'api';

export const API_SLICES = [
  userAccountsApi,
  contactsApi,
  employeesApi,
  depositsApi,
  accountsApi,
  transfersApi,
  getUserIdApi,
  exchangeRatesApi,
  productsApi,
  offersApi,
  cardsApi,
  userDepositsApi,
] as const;

export const API_REDUCER_PATHS = API_SLICES.map((slice) => slice.reducerPath)
