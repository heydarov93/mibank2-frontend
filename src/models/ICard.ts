import { ECardIssuer } from 'enums/ECardIssuer';
import { TCurrency } from 'types/types';

export interface ICreateCardFormData {
  cashbackRate: number | null;
  monthlyFee: number | null;
  dailyOperationalLimit: number | null;
  foreignTransactionLimit: number | null;
  cardIssuer: string | null;
  cardType: string | null;
}
export interface IIssuanceCardData extends ICreateCardFormData {
  cardId: number;
  cardName: string;
  issueFee: number | null;
  issueCurrency: TCurrency;
  cardCurrency: string;
  issueType: string | null;
  cardIssuer: ECardIssuer;
}
export interface ICardIssuanceState {
  isCardIssued: boolean;
  isIssuingCard: boolean;
  errorMessage: string;
}
