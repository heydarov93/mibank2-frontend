export const currenciesWithLabel: { code: string; label: string }[] = [
  { code: 'PLN', label: '🇵🇱 PLN' },
  { code: 'USD', label: '🇺🇸 USD' },
  { code: 'EUR', label: '🇪🇺 EUR' },
  { code: 'GBP', label: '🇬🇧 GBP' },
  { code: 'CHF', label: '🇨🇭 CHF' },
  { code: 'JPY', label: '🇯🇵 JPY' },
];

export const STATIC_RATES: Record<string, { buy: number; sell: number }> = {
  PLN: { buy: 1, sell: 1 },
  USD: { buy: 3.5, sell: 3.6 },
  EUR: { buy: 3.7, sell: 3.8 },
  GBP: { buy: 4.8, sell: 4.9 },
  CHF: { buy: 4.0, sell: 4.1 },
  JPY: { buy: 0.032, sell: 0.033 },
};

export const MAX_DIGITS = 12;

export const formatAmount = (value: string | number): string => {
  if (!value) return '';
  const formattedValue = parseFloat(`${value}`).toFixed(2);
  return formattedValue.length <= MAX_DIGITS
    ? formattedValue
    : formattedValue.slice(0, MAX_DIGITS);
};
