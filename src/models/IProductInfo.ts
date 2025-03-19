export interface ProductFormData {
  product: string;
  type: string;
  currency: string;
  name: string;
  description: string;
}

export interface CardFormData {
  cashbackRate: number | null;
  monthlyFee: number | null;
  dailyLimit: number | null;
  foreignTransactionLimit: number | null;
  cardIssuer: string | null;
  cardType: string | null;
}

export interface DepositFormData {
  min: number;
  max: number;
  term?: number | undefined;
  interestRate: number;
  capitalization: number;
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
