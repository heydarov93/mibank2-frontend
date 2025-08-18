import { TCurrency, TTransactionType, TTransferMethod } from 'types/types';

export type TTransferType = 'income' | 'expense';

export interface IRawTransaction {
  id: string;
  type: Uppercase<TTransferType>;
  currencyCode: string;
  totalAmount: number;
  dateTime: string;
  transferType: Uppercase<TTransferMethod>;
  source: string;
}

export interface ITransformedTransaction {
  id: string;
  sourceNumber: string;
  amount: number;
  transferType: string;
  isIncome: boolean;
  template: string;
  date: string;
  time: string;
  currency: string;
}
export interface IDisplayTransaction {
  cardName: string;
  cardNumber: string;
  amount: string;
  currency: TCurrency;
  date: string;
  type: TTransactionType;
}
export interface ITransferFormData {
  fromAccount: string;
  toAccount: string;
  amount: string;
  currency: TCurrency;
  message?: string;
}
