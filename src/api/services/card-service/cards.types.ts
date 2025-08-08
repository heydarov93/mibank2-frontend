import { CARD_TAGS } from 'constants/api/tags';
import { ECardIssueType } from 'enums/ECardIssueType';
import { ECardIssuer } from 'enums/ECardIssuer';
import { ECardStatus } from 'enums/ECardStatus';
import { ECardType } from 'enums/ECardType';
import { IIssuanceCardData } from 'models/ICard';
import {
  TCardIssuer,
  TCardIssueType,
  TCardType,
  TCurrency,
  TId,
} from 'types/types';

export interface IPaginatedResponse<T> {
  data: T[];
  hasNextPage: boolean;
  lastPageNumber: number;
  totalElements: number;
}

export interface ICardApiResponse {
  success: boolean;
  message: string;
}

export interface IPaginationParams {
  page?: number;
  count?: number;
}

export interface IGetUserCardsRequest extends IPaginationParams {
  userId: TId;
}

export interface IGetUserCardDetailsResponse {
  userCardResponse: IUserBankCardResponse;
  ibanNumber: string;
  swiftNumber: string;
  cvv: number;
}

export interface IUserBankCardResponse {
  userCardId: string;
  cardName: string;
  cardCurrency: TCurrency;
  cardType: TCardType;
  cashbackRate: number;
  issueType: TCardIssueType;
  cardIssuer: TCardIssuer;
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

export interface ISearchCardsRequest extends IPaginationParams {
  cardName?: string;
  cardType?: ECardType;
  cardIssuer?: ECardIssuer;
  issueType?: ECardIssueType;
  cardCurrency?: string;
  cardStatus?: ECardStatus;
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

export interface ISetPrimaryPaymentCardRequest {
  id: TId;
  isPrimaryPaymentCard: boolean;
}

export interface IUpdateCardStatusRequest {
  id: TId;
  status: TCardStatus;
}

export interface ICreateCard {
  cardName: string;
  cardCurrency: TCurrency;
  cardType: TCardType;
  cashbackRate: number;
  dailyLimit: number;
  issueType: Uppercase<TCardIssueType>;
  cardIssuer: TCardIssuer;
  issueFee: number;
  foreignTransactionLimit: number;
  monthlyFee: number;
  cardStatus: TCardStatus;
}

export type TCardStatus = 'ACTIVE' | 'BLOCKED' | 'EXPIRED';
export type IGetUserCardDetailsRequest = TId;
export type TGetUserCardsResponse = IPaginatedResponse<IUserBankCardResponse>;
export type TSearchCardsResponse = IPaginatedResponse<IIssuanceCardData>;
export type TCreateCardResponse = ICreateCard;
export type TCreateCardRequest = ICreateCard;
export type TCardTag = (typeof CARD_TAGS)[keyof typeof CARD_TAGS];
