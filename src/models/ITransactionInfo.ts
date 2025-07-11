export interface Transaction {
  id: string;
  Type: 'Income' | 'Expense';
  transfer_type: 'card' | 'account';
  currency: string;
  amount: number;
  fee: number;
  total_amount: number;
  datetime: string;
  status: 'successful' | 'pending' | 'failed';
  account_balance_after: number;
  third_party_IBAN: string;
  user_card_name: string;
  user_card_number: string;
  user_id: string;
}

export interface TransformedTransaction {
  id: string;
  sourceNumber: string;
  amount: number;
  transferType: string;
  isIncome: boolean;
  template: string;
  date: string;
  time: string;
  status: string;
  currency: string;
  fee: number;
  accountBalance: number;
  thirdPartyIBAN: string;
}
