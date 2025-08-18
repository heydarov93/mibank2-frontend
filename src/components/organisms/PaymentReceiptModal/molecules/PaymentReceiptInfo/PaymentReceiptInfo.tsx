import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledTypography } from '../../PaymentReceiptModal.styled';
import { PaymentReceiptRow } from '../../atoms';
import {
  generateReceiptRowData,
  TReceiptKeys,
} from '../../utils/generateReceiptRowData';

import { IPaymentReceipt } from 'models/IPaymentReceipt';

interface PaymentReceiptInfoProps {
  data: IPaymentReceipt;
}

export const PaymentReceiptInfo = ({ data }: PaymentReceiptInfoProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'TransfersPage.paymentReceiptModal',
  });
  const paymentReceiptRowData = useMemo(
    () => generateReceiptRowData(data),
    [data],
  );
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
      {(Object.keys(paymentReceiptRowData) as TReceiptKeys[]).map((rowKey) => (
        <PaymentReceiptRow
          key={rowKey}
          name={t(paymentReceiptRowData[rowKey].label)}
          value={paymentReceiptRowData[rowKey].value}
          containerSx={paymentReceiptRowData[rowKey].containerSx}
          nameSx={paymentReceiptRowData[rowKey].nameSx}
          valueSx={paymentReceiptRowData[rowKey].valueSx}
        />
      ))}
    </Stack>
  );
};
