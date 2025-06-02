export interface Account {
  accountStartDate: string;
  accountStatus: string;
  bankDepartment: string;
  currency: string;
  currentAccountBalance: number;
  ibanNum: string;
  lastTransaction: string;
  productId: number;
  swiftNum: string;
  userAccountId: string;
  userId: number;
  version: number;
}

export interface AccountOption {
  accountId: string;
  iban: string;
  currency: string;
  balance: string;
}

export interface DepositFormValues {
  amount: number;
  account: string;
  checkbox?: boolean;
}
