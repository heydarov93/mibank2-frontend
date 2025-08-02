import { TCurrency } from 'types/types';

export interface IOpenDepositFormData {
  amount: number;
  account: string;
  checkbox?: boolean;
}
export interface IDisplayDeposit {
  id: number;
  name: string;
  augmentable: boolean;
  autoRenewable: boolean;
  capitalization: number;
  currency: TCurrency;
  description: string;
  earlyWithdrawal: boolean;
  earlyWithdrawalFee: number;
  earlyWithdrawalLimit: number;
  interestRate: number;
  max: number;
  min: number;
  term: number;
  type: string;
}
export interface IDepositFormData {
  minimumDepositSum: number;
  maximumDepositSum: number;
  depositTerm?: number | undefined;
  depositInterestRate: number;
  depositCapitalizationRate: number;
  earlyWithdrawal?: boolean | undefined;
  earlyWithdrawalLimit?: number | undefined;
  earlyWithdrawalFee?: number | undefined;
  autoRenewable?: boolean | undefined;
  augmentable?: boolean | undefined;
}