import { ITableData } from './ITable';

import { EProductFormStepper } from 'enums/EProductFormStepper';

export interface IProductFormData {
  productType: string;
  subtype: string;
  currency: string;
  name: string;
  description: string;
}
export interface IProductStep {
  step: EProductFormStepper;
}
export interface IProductState {
  isDeleteVisible: boolean;
  selectedProduct: Partial<ITableData>;
  confirmationTitle: string;
  confirmationBody: string;
  warningTitle: string;
  warningBody: string;
  isConfirmationWindowVisible: boolean;
  isEditFormVisible: boolean;
  isDepositFormVisible: boolean;
  formData: Partial<ITableData>;
  page: number;
  pageSize: number;
  errorMessage: string;
}
export interface IDepositProductResponse {
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
export interface IDepositProductData {
  id: number;
  productType: string;
  productName: string;
  productSubtype: string;
  cardDescription: string;
  cardCurrency: string;
  minimumDepositSum: string;
  maximumDepositSum: string;
  depositTerm: string;
  depositInterestRate: string;
  depositCapitalizationRate: string;
  earlyWithdrawalLimit: string;
  withdrawalFee: string;
}