import { TCardIssuer, TCardIssueType, TCardStatus, TCardType, TCurrency } from "types/types";

export interface IUserInfo {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string;
  status: string | undefined;
  isBlocked: boolean | null;
}
export interface IUser {
  sub: string | undefined;
  name: string | undefined;
  family_name: string | undefined;
  email: string | undefined;
  failedLogins: string | undefined;
  lastFailedTime: string | undefined;
}
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
