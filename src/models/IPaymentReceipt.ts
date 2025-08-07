import { TCurrency } from 'types/types';

export interface IPaymentReceipt {
  payerName: string;
  date: string;
  fromAccount: string;
  toAccount: string;
  amount: string;
  currency: TCurrency;
  fee: number;
  totalAmount: number;
  transferMethod: 'card' | 'iban';
  isIncome?: boolean;
  status?: 'confirmed' | 'blocked' | 'rejected';
}

export interface IPaymentReceiptModalData {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  currencyCode: string;
  totalAmount: number;
  dateTime: string;
  transferType: 'CARD' | 'IBAN';
  amount: number;
  fee: number;
  status: 'Confirmed' | 'Blocked' | 'Rejected';
  thirdPartyName: string;
  fromNumber: string;
  toNumber: string;
}
