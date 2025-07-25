import { TCurrency } from "types/types";

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
}
