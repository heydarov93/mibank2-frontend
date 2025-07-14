import { ACCOUNT_TAGS } from "api/constants/tags";

export interface IGetUserAccountByIBANResponse {
  userAccountId: string;
  userId: number;
  productId: number;
  ibanNum: string;
  swiftNum: string;
  currency: string;
  currentAccountBalance: number;
  accountStartDate: string;
  accountStatus: string;
  bankDepartment: string;
  lastTransaction: string;
  version: number;
}

export interface IGetAccountByCardResponse {
  userCardId: string;
  cardNumber: string;
  cardholderName: string;
  cardExpiryDate: string;
  userDailyLimit: number;
  userCardStatus: string;
}

export interface ILinkAccountWithCardRequest {
  accountId: string;
  cardId: number;
  currencyCode: string;
}

export interface ICheckCardIssuanceRequest {
  paymentAccount: string;
  issuanceCurrency: string;
  issuanceAmount: number;
}

export interface ICheckCardIssuanceResponse {
  userAccountId: string;
  isEligible: boolean;
}

export interface ICreateUserCardAccountRequest {
  userId: number;
  cardId: number;
  currencyCode: string;
}

export interface ICreateUserCardAccountResponse {
  userAccountId: string;
  userId: number;
  productId: number;
  ibanNum: string;
  swiftNum: string;
  currency: string;
  currentAccountBalance: number;
  accountStartDate: string;
  accountStatus: string;
  bankDepartment: string;
  lastTransaction: string;
}

export interface IGetAccountByToken {
  userAccountId: string;
  userId: number;
  productId: number;
  ibanNum: string;
  swiftNum: string;
  currency: string;
  currentAccountBalance: number;
  accountStartDate: string;
  accountStatus: string;
  bankDepartment: string;
  lastTransaction: string;
  version: string;
}

export interface IGetAccountByTokenResponse {
  accounts: IGetAccountByToken[];
}

export type TAccountsTag = (typeof ACCOUNT_TAGS)[keyof typeof ACCOUNT_TAGS];
