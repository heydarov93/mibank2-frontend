import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledTitle } from '../../organisms/PaymentReceiptModal/PaymentReceiptModal.styled';

export interface PaymentReceiptTitleProps {
  onClose: () => void;
}

export const PaymentReceiptTitle = ({ onClose }: PaymentReceiptTitleProps) => {
  const { t } = useTranslation('translation');

  return (
    <StyledTitle>
      <Typography sx={{ fontSize: '24px' }}>
        {t('TransfersPage.paymentReceiptModal.title')}
      </Typography>
      <IconButton
        data-testid="payment-receipt-close-button"
        onClick={onClose}
        sx={(theme) => ({
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon sx={{ color: 'white' }} />
      </IconButton>
    </StyledTitle>
  );
};
