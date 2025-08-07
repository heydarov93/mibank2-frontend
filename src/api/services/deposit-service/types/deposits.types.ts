import { DEPOSIT_TAGS } from 'constants/api/tags';
import { IDisplayDeposit } from 'models/IDeposit';
import { TCurrency } from 'types/types';

export interface IGetDepositsRequest {
  page?: number;
  size?: number;
}

export interface IGetDepositsResponse {
  content: IDisplayDeposit[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface IUserDeposit {
  depositId: number;
  userDepositId: number;
  name: string;
  amount: number;
  currency: TCurrency;
  type: 'Term' | 'Demand' | 'Savings' | 'Target';
  interestRate: number;
  withdrawalFee: number;
  withdrawalLimit: number;
  capitalizationRate: number;
  status: 'active' | 'mature' | 'withdraw' | 'blocked';
  timeLeft: number;
  endDate: string;
  startDate: string;
  accountNumber: string; //Guid
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
export type TDepositTag = (typeof DEPOSIT_TAGS)[keyof typeof DEPOSIT_TAGS];
