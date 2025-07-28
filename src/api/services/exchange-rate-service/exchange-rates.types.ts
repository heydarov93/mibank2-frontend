import { EXCHANGE_RATE_TAGS } from 'constants/api/tags';
import { TCurrency } from 'types/types';

interface ICurrencyConversionBase {
  fromCurrency: string;
  toCurrency: string;
}

export interface IConvertCurrencyRequest extends ICurrencyConversionBase {
  amount: number;
  fromAmountProvided: boolean;
}

export interface IConvertCurrencyResponse extends ICurrencyConversionBase {
  convertedAmount: number;
}

export interface IExchangeRate {
  currency: string;
  code: TCurrency;
  bid: number;
  ask: number;
}

export interface IExchangeRateTable {
  table: string;
  no: string;
  tradingDate: string;
  effectiveDate: string;
  rates: IExchangeRate[];
}

export type TGetCurrentRatesResponse = IExchangeRateTable[];
export type TGetPreviousRatesResponse = IExchangeRateTable[];
export type TExchangeRateTag =
  (typeof EXCHANGE_RATE_TAGS)[keyof typeof EXCHANGE_RATE_TAGS];
