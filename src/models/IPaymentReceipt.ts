import { TTransferType } from './ITransaction';

import { TCurrency, TTransferMethod } from 'types/types';

export type TPaymentStatus = 'confirmed' | 'blocked' | 'rejected';

export interface IPaymentReceipt {
  payerName: string;
  date: string;
  fromAccount: string;
  toAccount: string;
  amount: string;
  currency: TCurrency;
  fee: number;
  totalAmount: number;
  transferMethod: TTransferMethod;
  isIncome?: boolean;
  status: TPaymentStatus;
}

export interface IPaymentReceiptModalData {
  id: string;
  type: Uppercase<TTransferType>;
  currencyCode: string;
  totalAmount: number;
  dateTime: string;
  transferType: Uppercase<TTransferMethod>;
  amount: number;
  fee: number;
  status: Capitalize<TPaymentStatus>;
  thirdPartyName: string;
  fromNumber: string;
  toNumber: string;
}
