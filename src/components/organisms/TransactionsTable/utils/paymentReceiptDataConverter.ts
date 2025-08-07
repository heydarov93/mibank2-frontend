import {
  IPaymentReceipt,
  IPaymentReceiptModalData,
} from 'models/IPaymentReceipt';
import { TCurrency } from 'types/types';

export const paymentReceiptDataConverter = (
  transactionDetails?: IPaymentReceiptModalData,
): IPaymentReceipt | null => {
  if (!transactionDetails) return null;

  const transformedPaymentReceiptInfo: IPaymentReceipt = {
    payerName: transactionDetails.thirdPartyName,
    date: transactionDetails.dateTime,
    fromAccount: transactionDetails.fromNumber,
    toAccount: transactionDetails.toNumber,
    amount: transactionDetails.amount.toString(),
    currency: transactionDetails.currencyCode as TCurrency,
    fee: transactionDetails.fee,
    totalAmount: transactionDetails.totalAmount,
    transferMethod: transactionDetails.transferType.toLowerCase() as
      | 'card'
      | 'iban', // todo create reusabele type
    isIncome: transactionDetails.type === 'INCOME', // todo create reusabele type
    status: transactionDetails.status.toLowerCase() as
      | 'confirmed'
      | 'blocked'
      | 'rejected',
  };

  return transformedPaymentReceiptInfo;
};
