import { TCurrency } from 'types/types';

const currencies = ['PLN', 'USD', 'EUR', 'CHF', 'GBP', 'JPY'] as const;

export const currencySymbol: Record<TCurrency, string> = {
  CHF: 'Fr',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  PLN: 'zł',
  USD: '$',
};

export default currencies;
