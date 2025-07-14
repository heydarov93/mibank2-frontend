import { TCurrency } from 'types/types';

export const SUPPORTED_CURRENCIES: readonly TCurrency[] = [
  'PLN',
  'USD',
  'EUR',
  'CHF',
  'GBP',
  'JPY',
];

export const CURRENCY_SYMBOLS: Record<TCurrency, string> = {
  CHF: 'Fr',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  PLN: 'zł',
  USD: '$',
};
