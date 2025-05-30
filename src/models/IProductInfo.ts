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

export interface IssuanceCardData extends CardFormData {
  id: number;
  name: string;
  fee: number;
  feeCurrency: string;
  background: string;
  currency: string;
  issueType: string;
  cardIssuer: 'visa' | 'mastercard';
}
