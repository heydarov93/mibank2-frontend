import { Box, Dialog } from '@mui/material';

import { StyledDialogBody } from './PaymentReceiptModal.styled';

import { ReactComponent as PaymentReceiptCheckBottom } from 'assets/icons/PaymentCheckBottom.svg';
import {
  PaymentReceiptTitle,
  PaymentReceiptInfo,
  PaymentReceiptActions,
} from 'components/molecules';
import { IPaymentReceipt } from 'components/molecules/PaymentReceiptInfo/PaymentReceiptInfo';

interface PaymentReceiptModalProps {
  open: boolean;
  onClose: () => void;
  receiptInfo: IPaymentReceipt;
}

export const PaymentReceiptModal = ({
  open,
  onClose,
  receiptInfo,
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
      <Box sx={{ padding: 5, overflow: 'auto' }}>
        <PaymentReceiptInfo data={receiptInfo} />
        <PaymentReceiptActions sx={{ marginTop: 5 }} />
      </Box>
      <Box sx={{ position: 'absolute', bottom: '-21px', width: '100%' }}>
        <PaymentReceiptCheckBottom />
      </Box>
    </Dialog>
  );
};
