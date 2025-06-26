import { TCurrency } from "types/card";

export interface ProductFormData {
  productType: string;
  subtype: string;
  currency: string;
  name: string;
  description: string;
}

export interface CardFormData {
  cashbackRate: number | null;
  monthlyFee: number | null;
  dailyOperationalLimit: number | null;
  foreignTransactionLimit: number | null;
  cardIssuer: string | null;
  cardType: string | null;
}

export interface DepositFormData {
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

export interface DepositBackendData {
  id: number;
  name: string;
  type: string;
  description: string;
  currency: string;
  min: number;
  max: number;
  term: number;
  interestRate: number;
  capitalization: number;
  earlyWithdrawalLimit: number;
  earlyWithdrawalFee: number;
}

export enum ECardType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export enum ECardIssuer {
  VISA = 'Visa',
  MASTERCARD = 'Mastercard',
}

export enum ECardIssueType {
  DIGITAL = 'DIGITAL',
  PLASTIC = 'PLASTIC',
}

export enum ECardStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IssuanceCardData extends CardFormData {
  cardId: number;
  cardName: string;
  issueFee: number | null;
  issueCurrency: TCurrency;
  cardCurrency: string;
  issueType: string | null;
  cardIssuer: ECardIssuer;
}
