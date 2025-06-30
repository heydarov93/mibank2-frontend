import { IssuanceCardData } from './IProductInfo';
import {
  ECardIssuer,
  ECardIssueType,
  ECardStatus,
  ECardType,
} from './IProductInfo';
import { IPaginationParams, IPaginatedResponse } from './commonApi';

export type TGetUserCardsResponse = IPaginatedResponse<IUserBankCardResponse>;
export type TGetCardsResponse = IPaginatedResponse<IssuanceCardData>;

export interface IGetCardsParams extends IPaginationParams {
  cardName?: string;
  cardType?: ECardType;
  cardIssuer?: ECardIssuer;
  issueType?: ECardIssueType;
  cardCurrency?: string;
  cardStatus?: ECardStatus;
}

export interface IGetUserCardsParams extends IPaginationParams {
  userId: string | number;
}

export interface IUserBankCardDetailsResponse {
  userCardResponse: IUserBankCardResponse;
  ibanNumber: string;
  swiftNumber: string;
  cvv: number;
}

export interface IUserBankCardResponse {
  userCardId: string;
  cardName: string;
  cardCurrency: string;
  cardType: string;
  cashbackRate: number;
  issueType: string;
  cardIssuer: string;
  cardNumber: string;
  cardholderName: string;
  cardExpiryDate: string;
  userDailyLimit: number;
  userCardBalance: number;
  userCardStatus: string;
  issueDate: string;
  primaryPaymentCard: boolean;
}

export interface IUserCardDetailed extends IUserBankCardResponse {
  ibanNumber?: string;
  swiftNumber?: string;
}

export interface IGetCardsParams extends IPaginationParams {
  cardName?: string;
  cardType?: ECardType;
  cardIssuer?: ECardIssuer;
  issueType?: ECardIssueType;
  cardCurrency?: string;
  cardStatus?: ECardStatus;
}

export interface IGetUserCardsParams extends IPaginationParams {
  userId: string | number;
}

export interface IIssueUserCardRequest {
  idempotencyKey: string;
  cardId: number;
  userId: number;
  paymentAccount: string;
  linkedAccount: string;
  issuanceFee: number;
  issuanceFeeCurrency: string;
}

export interface IUpdatePrimaryPaymentCardRequest {
  id: number | string;
  isPrimaryPaymentCard: boolean;
}

export interface IUpdateUserCardStatusRequest {
  id: string | number;
  status: 'ACTIVE' | 'BLOCKED' | 'EXPIRED';
}
