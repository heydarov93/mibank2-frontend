import {
  IGetUserCardDetailsResponse,
  IUserBankCardResponse,
} from 'api/services/card-service/cards.types';
import { IUserBankCard } from 'models/IUser';
import {
  TCardIssuer,
  TCardStatus,
  TCardIssueType,
  TCurrency,
  TCardType,
} from 'types/types';

export function mapUserBankCardResponse(
  cardResponse: IUserBankCardResponse,
): Omit<IUserBankCard, 'cvv' | 'iban' | 'swift'> {
  return {
    id: cardResponse.userCardId,
    name: cardResponse.cardName,
    currency: cardResponse.cardCurrency as TCurrency,
    issueType: cardResponse.cardType.toLowerCase() as TCardIssueType,
    type: cardResponse.cardType.toLowerCase() as TCardType,
    issuer: cardResponse.cardIssuer.toLowerCase() as TCardIssuer,
    number: Number(cardResponse.cardNumber),
    holder: cardResponse.cardholderName,
    expirationDate: cardResponse.cardExpiryDate,
    balance: cardResponse.userCardBalance ?? 0,
    dailyLimit: cardResponse.userDailyLimit,
    issueDate: cardResponse.issueDate,
    cashbackRate: cardResponse.cashbackRate,
    status: cardResponse.userCardStatus.toLowerCase() as TCardStatus,
    isPrimary: cardResponse.primaryPaymentCard,
  };
}

export function mapUserBankCardDetailsResponse(
  cardDetailsResponse: IGetUserCardDetailsResponse,
): IUserBankCard {
  return {
    ...mapUserBankCardResponse(cardDetailsResponse.userCardResponse),
    iban: cardDetailsResponse.ibanNumber,
    swift: cardDetailsResponse.swiftNumber,
    cvv: cardDetailsResponse.cvv,
  };
}
