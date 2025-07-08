import { IDeposit } from 'models/IDepositInfo';

export interface IGetDepositsRequest {
  page?: number;
  size?: number;
}

export interface IGetDepositsResponse {
  content: IDeposit[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface ICreateDeposit {
  name: string;
  description: string;
  currency: string;
  type?: string;
  min: number;
  max: number;
  term: number;
  interestRate: number;
  capitalization: number;
  earlyWithdrawalLimit: number;
  earlyWithdrawalFee: number;
  earlyWithdrawal?: boolean;
  augmentable?: boolean;
  autoRenewable?: boolean;
}

export interface IUpdateDepositRequest extends ICreateDeposit {
  id: number;
}

export type TCreateDepositRequest = ICreateDeposit;
export type TCreateDepositResponse = ICreateDeposit;
export type TUpdateDepositResponse = ICreateDeposit;
