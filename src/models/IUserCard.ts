import { TCardIssuer, TCardStatus, TCardType, TCurrency } from 'types/card';

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
  currency: TCurrency;
  type: TCardType;
  issueDate: string;
  expirationDate: string;
  cashbackRate: number;
  status: TCardStatus;
}
