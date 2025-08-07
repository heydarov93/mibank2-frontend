import { TRANSACTION_TAGS } from 'constants/api/tags';
import { TSortOrder } from 'types/types';

export interface IGetTransactionsRequest {
  userId: number;
  page: number;
  count: number;
  fromDate?: string;
  toDate?: string;
  transactionType?: 'INCOME' | 'EXPENSE';
  sources?: string[];
  templatesId?: string[];
  dataSortOrder?: TSortOrder;
}

export interface IGetTransactionsList {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  currencyCode: string;
  totalAmount: number;
  dateTime: string;
  transferType: 'CARD' | 'IBAN';
  source: string;
}

export interface IGetTransactionsResponse {
  data: IGetTransactionsList[];
  hasNextPage: boolean;
  lastPageNumber: number;
  totalElements: number;
}

export type TTransactionTag =
  (typeof TRANSACTION_TAGS)[keyof typeof TRANSACTION_TAGS];
