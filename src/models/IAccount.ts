import { TCardIssuer } from 'types/types';

export interface IUserIBANAccount {
  type: 'iban';
  id: string;
  number: string;
  currency: string;
  balance: number;
}
export interface IUserCardAccount {
  type: 'card';
  id: string;
  number: string;
  currency: string;
  balance: number;
  issuer: TCardIssuer;
}
export interface ISavedIBANAccount {
  type: 'iban';
  id: string;
  number: string;
  label: string;
}
export interface ISavedCardAccount {
  type: 'card';
  id: string;
  number: string;
  label: string;
  issuer: TCardIssuer;
}
export interface IAccountData {
  accountStartDate: string;
  accountStatus: string;
  bankDepartment: string;
  currency: string;
  currentAccountBalance: number;
  ibanNum: string;
  lastTransaction: string;
  productId: number;
  swiftNum: string;
  userAccountId: string;
  userId: number;
  version: number;
}
export interface IAccountOption {
  accountId: string;
  iban: string;
  currency: string;
  balance: string;
}
export interface IUserCardAccountOption extends IUserCardAccount {
  label: string;
}
export interface IUserIBANAccountOption extends IUserIBANAccount {
  label: string;
}
