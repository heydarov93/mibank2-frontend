import { TCurrency, TTransactionType } from "types/types";

export interface Transaction {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  currencyCode: string;
  totalAmount: number;
  dateTime: string;
  transferType: 'CARD' | 'IBAN';
  source: string;
}

export interface TransformedTransaction {
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

export interface ITransaction {
  cardName: string;
  cardNumber: string;
  amount: string;
  currency: TCurrency;
  date: string;
  type: TTransactionType;
}