import dayjs from 'dayjs';

export const currenciesWithLabel: { code: string; label: string }[] = [
  { code: 'PLN', label: '🇵🇱 PLN' },
  { code: 'USD', label: '🇺🇸 USD' },
  { code: 'EUR', label: '🇪🇺 EUR' },
  { code: 'GBP', label: '🇬🇧 GBP' },
  { code: 'CHF', label: '🇨🇭 CHF' },
  { code: 'JPY', label: '🇯🇵 JPY' },
];

export const MAX_DIGITS = 12;

export const formatAmount = (value: string | number): string => {
  if (!value) return '';
  const formattedValue = parseFloat(`${value}`).toFixed(2);
  return formattedValue.length <= MAX_DIGITS
    ? formattedValue
    : formattedValue.slice(0, MAX_DIGITS);
};

export const removeExtraDot = (value: string): string => {
  const formattedValue = formatAmount(value);
  if (formattedValue.length === 12 && formattedValue[11] === '.') {
    return formattedValue.slice(0, 11) + formattedValue.slice(12);
  }
  return formattedValue;
};

export const currentDate = dayjs().format('YYYY-MM-DD');
