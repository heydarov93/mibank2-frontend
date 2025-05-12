import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledTypography } from '../../organisms/PaymentReceiptModal/PaymentReceiptModal.styled';
import { PaymentReceiptRow } from '../PaymentReceiptRow/PaymentReceiptRow';

import { formatCurrency } from 'utils/currencyUtils';

export interface PaymentReceiptInfoProps {
  date: string;
  payer: string;
  from: string;
  to: string;
  service: string;
  amount: number;
  fee: number;
  currency: string;
}

export const PaymentReceiptInfo = ({
  date,
  payer,
  from,
  to,
  service,
  amount,
  fee,
  currency,
}: PaymentReceiptInfoProps) => {
  const { t } = useTranslation('translation');
  const total = amount + fee;

  return (
    <Stack
      sx={{
        gap: '20px',
      }}
    >
      <StyledTypography mb="12px">{date}</StyledTypography>
      <PaymentReceiptRow
        name={t('TransfersPage.paymentReceiptModal.payer')}
        value={payer}
      />
      <PaymentReceiptRow
        name={t('TransfersPage.paymentReceiptModal.from')}
        value={from}
      />
      <PaymentReceiptRow
        name={t('TransfersPage.paymentReceiptModal.to')}
        value={to}
      />
      <PaymentReceiptRow
        name={t('TransfersPage.paymentReceiptModal.service')}
        value={service}
      />
      <PaymentReceiptRow
        name={t('TransfersPage.paymentReceiptModal.amount')}
        value={formatCurrency(currency, amount)}
      />
      <PaymentReceiptRow
        name={t('TransfersPage.paymentReceiptModal.fee')}
        value={formatCurrency(currency, fee)}
      />
      <PaymentReceiptRow
        name={t('TransfersPage.paymentReceiptModal.total')}
        value={formatCurrency(currency, total)}
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
