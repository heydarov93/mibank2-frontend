export interface ITableHead {
  label: string;
  key: string;
  sortable?: boolean | undefined;
  order?: string;
  onSort?: () => void;
}
export interface ITableBody {
  id: number;
  productName: string;
  productSubtype: string;
  productStatus: string;
  dateAdded: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}
export interface ITableData {
  id: number;
  productType: string;
  productName: string;
  productSubtype: string;
  productStatus: string;
  dateAdded: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  cardDescription: string;
  cardCurrency: string;
  monthlyFee: string;
  dailyOperationalLimit: string;
  foreignTransactionLimit: string;
  cardCashbackRate: string;
  minimumDepositSum: string;
  maximumDepositSum: string;
  depositTerm: string;
  depositInterestRate: string;
  depositCapitalizationRate: string;
  earlyWithdrawalLimit: string;
  withdrawalFee: string;
}