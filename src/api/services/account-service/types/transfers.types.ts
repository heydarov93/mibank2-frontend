import { TRANSFER_TAGS } from "constants/api/tags";

export interface ITransferToIBANRequest {
  senderIbanNumber: string;
  recipientIbanNumber: string;
  amount: string;
  currency: string;
  message?: string;
}

export interface ITransferToCardRequest {
  senderCardNumber: string;
  recipientCardNumber: string;
  amount: string;
  currency: string;
  message?: string;
}

export interface ITransferToIBANResponse {
  transactionId: string;
  status: string;
  fee: number;
  totalDeduction: number;
  message: string;
}

export interface ITransferToCardResponse {
  transactionId: string;
  status: string;
  fee: number;
  totalDeduction: number;
  message: string;
}

export interface IGetTransferFeeRequest {
  amount: string;
  isInternal: boolean;
  transferType: 'card' | 'iban';
}

export interface IGetTransferFeeResponse {
  amount: number;
  fee: number;
  totalAmount: number;
}

export type TTransferTag = (typeof TRANSFER_TAGS)[keyof typeof TRANSFER_TAGS];
