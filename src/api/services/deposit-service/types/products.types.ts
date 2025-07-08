interface ICard {
  cardName: string;
  cardCurrency: string;
  cardType: string;
  cashbackRate: number;
  dailyLimit: number;
  cardIssuer: string;
  foreignTransactionLimit: number;
  monthlyFee: number;
  cardStatus: string;
}

interface IDeposit {
  id: number;
  name: string;
  description: string;
  currency: string;
  type: string;
  min: number;
  max: number;
  term: number;
  interestRate: number;
  capitalization: number;
  earlyWithdrawalLimit: number;
  earlyWithdrawalFee: number;
  earlyWithdrawal: boolean;
  agreement: boolean;
}

export interface IGetProductsRequest {
  page?: number;
  size?: number;
  search?: string;
}

export interface IGetProductsResponse {
  cardList: ICard[];
  depositList: IDeposit[];
}
