import { DepositData, DepositResponseData } from 'models/IProductInfo';

export function mapProductData(productData: DepositResponseData): DepositData {
  return {
    id: productData.id,
    productType: productData?.type?.split(' ').at(1) ?? '',
    productName: productData.name,
    productSubtype: productData.type,
    cardDescription: productData.description,
    cardCurrency: productData.currency,
    minimumDepositSum: productData.min?.toString(),
    maximumDepositSum: productData.max?.toString(),
    depositTerm: productData.term?.toString(),
    depositInterestRate: productData.interestRate?.toString(),
    depositCapitalizationRate: productData.capitalization?.toString(),
    earlyWithdrawalLimit: productData.earlyWithdrawalLimit?.toString(),
    withdrawalFee: productData.earlyWithdrawalFee?.toString(),
  };
}
