import { Box, Dialog } from '@mui/material';

import { StyledDialogBody } from './PaymentReceiptModal.styled';

import { ReactComponent as PaymentReceiptCheckBottom } from 'assets/icons/PaymentCheckBottom.svg';
import {
  PaymentReceiptTitle,
  PaymentReceiptInfo,
  PaymentReceiptActions,
} from 'components/molecules';
import { PaymentReceiptInfoProps } from 'components/molecules/PaymentReceiptInfo/PaymentReceiptInfo';
import { PaymentReceiptTitleProps } from 'components/molecules/PaymentReceiptTitle/PaymentReceiptTitle';

interface PaymentReceiptModalProps
  extends PaymentReceiptInfoProps,
    PaymentReceiptTitleProps {
  open: boolean;
}

export const PaymentReceiptModal = ({
  open = true,
  onClose,
  ...receiptInfo
}: PaymentReceiptModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={StyledDialogBody}
      fullWidth
      data-testid="payment-receipt-modal"
    >
      <PaymentReceiptTitle onClose={onClose} />
      <Box sx={{ p: '40px', overflow: 'auto' }}>
        <PaymentReceiptInfo {...receiptInfo} />
        <PaymentReceiptActions sx={{ mt: '40px' }} />
      </Box>
      <Box sx={{ position: 'absolute', bottom: '-21px', width: '100%' }}>
        <PaymentReceiptCheckBottom />
      </Box>
    </Dialog>
  );
};
