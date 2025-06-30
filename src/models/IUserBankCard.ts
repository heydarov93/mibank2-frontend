import {
  TCardIssuer,
  TCardStatus,
  TCardIssueType,
  TCurrency,
  TCardType,
} from 'types/types';

export interface IUserBankCard {
  id: string | number;
  holder: string;
  name: string;
  issuer: TCardIssuer;
  number: number;
  cvv: number;
  iban: string;
  swift: string;
  balance: number;
  dailyLimit: number;
  currency: TCurrency;
  issueType: TCardIssueType;
  type: TCardType;
  issueDate: string;
  expirationDate: string;
  cashbackRate: number;
  status: TCardStatus;
  isPrimary: boolean;
}
