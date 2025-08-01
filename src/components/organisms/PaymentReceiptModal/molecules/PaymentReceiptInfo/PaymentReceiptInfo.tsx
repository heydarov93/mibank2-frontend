import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';

import { StyledTypography } from '../../PaymentReceiptModal.styled';
import { PaymentReceiptRow } from '../../atoms';

import { useTransferTranslations } from 'hooks';
import { IPaymentReceipt } from 'models/IPaymentReceipt';
import { formatCurrency } from 'utils/formatters/currencyFormatter';

export const PaymentReceiptInfo = ({ data }: { data: IPaymentReceipt }) => {
  const { t } = useTranslation('translation');
  const translation = useTransferTranslations(data.transferMethod);
  const date = new Date(data.date);

  return (
    <Stack sx={(theme) => ({ gap: theme.spacing(2.5) })}>
      <StyledTypography sx={(theme) => ({ marginBottom: theme.spacing(1.5) })}>
        <Box sx={(theme) => ({ display: 'flex', gap: theme.spacing(2) })}>
          <Box>{date.toLocaleDateString()}</Box>
          <Box>
            {date.toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Box>
        </Box>
      </StyledTypography>
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
