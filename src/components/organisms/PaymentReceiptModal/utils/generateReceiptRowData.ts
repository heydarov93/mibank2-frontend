import { SxProps, Theme } from '@mui/material/styles';

import { IPaymentReceipt } from 'models/IPaymentReceipt';
import { formatCurrency } from 'utils';

interface IReceiptRowData {
  label: string;
  value: string;
  nameSx?: SxProps<Theme>;
  valueSx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
}

export type TReceiptKeys =
  | 'thirdParty'
  | 'fromAccount'
  | 'toAccount'
  | 'amount'
  | 'fee'
  | 'totalAmount'
  | 'status';

type TReceiptRowCollection = Record<TReceiptKeys, IReceiptRowData>;

export const generateReceiptRowData = (
  paymentData: IPaymentReceipt,
): TReceiptRowCollection => {
  const isReceiver = paymentData.isIncome;
  const isIBAN = paymentData.transferMethod === 'iban';

  return {
    thirdParty: {
      label: isReceiver ? 'sender' : 'receiver',
      value: paymentData.payerName,
    },
    fromAccount: {
      label: isIBAN ? 'fromAccount' : 'fromCard',
      value: paymentData.fromAccount,
    },
    toAccount: {
      label: isIBAN ? 'toAccount' : 'toCard',
      value: paymentData.toAccount,
    },
    amount: {
      label: 'amount',
      value: formatCurrency(paymentData.currency, Number(paymentData.amount)),
    },
    fee: {
      label: 'fee',
      value: formatCurrency(paymentData.currency, Number(paymentData.fee)),
    },
    totalAmount: {
      label: 'totalAmount',
      value: formatCurrency(
        paymentData.currency,
        Number(paymentData.totalAmount),
      ),
      nameSx: (theme) => ({
        color: theme.palette.common.black,
        fontWeight: 500,
      }),
      valueSx: (theme) => ({
        color: theme.palette.common.black,
        fontWeight: 600,
        fontSize: 24,
      }),
    },
    status: {
      label: 'status',
      value: paymentData.status,
      valueSx: (theme) => ({
        color: theme.palette.success.main,
        fontWeight: 500,
      }),
    },
  } as TReceiptRowCollection;
};
