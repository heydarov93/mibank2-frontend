import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledTypography } from '../../organisms/PaymentReceiptModal/PaymentReceiptModal.styled';
import { PaymentReceiptRow } from '../PaymentReceiptRow/PaymentReceiptRow';

import { useTranslations } from 'components/organisms/TransferForm/hooks/useTranslations';
import { TCurrency } from 'types/types';
import { formatCurrency } from 'utils/formatters/currencyFormatter';

export interface IPaymentReceipt {
  payerName: string;
  date: string;
  fromAccount: string;
  toAccount: string;
  amount: string;
  currency: TCurrency;
  fee: number;
  totalAmount: number;
  transferMethod: 'card' | 'iban';
}

export const PaymentReceiptInfo = ({ data }: { data: IPaymentReceipt }) => {
  const { t } = useTranslation('translation');
  const translation = useTranslations(data.transferMethod);
  const date = new Date(data.date);

  return (
    <Stack gap="20px">
      <StyledTypography mb="12px">{date.toLocaleDateString()}</StyledTypography>
      <PaymentReceiptRow
        name={t('TransfersPage.paymentReceiptModal.payer')}
        value={data.payerName}
      />
      <PaymentReceiptRow
        name={translation.fromAccount.label}
        value={data.fromAccount}
      />
      <PaymentReceiptRow
        name={translation.toAccount.label}
        value={data.toAccount}
      />
      <PaymentReceiptRow
        name={t('TransfersPage.paymentReceiptModal.service')}
        value={t('TransfersPage.paymentReceiptModal.serviceType')}
      />
      <PaymentReceiptRow
        name={translation.amount.label}
        value={formatCurrency(data.currency, Number(data.amount))}
      />
      <PaymentReceiptRow
        name={t('TransfersPage.paymentReceiptModal.fee')}
        value={formatCurrency(data.currency, data.fee)}
      />
      <PaymentReceiptRow
        name={t('TransfersPage.paymentReceiptModal.totalAmount')}
        value={formatCurrency(data.currency, data.totalAmount)}
        nameSx={{ color: 'black', fontWeight: 500 }}
        valueSx={{ color: 'black', fontWeight: 600, fontSize: 24 }}
      />
      <PaymentReceiptRow
        name={t('TransfersPage.paymentReceiptModal.status')}
        value={t('TransfersPage.paymentReceiptModal.confirmed')}
        valueSx={(theme) => ({
          color: theme.palette.success.main,
          fontWeight: 500,
        })}
      />
    </Stack>
  );
};
