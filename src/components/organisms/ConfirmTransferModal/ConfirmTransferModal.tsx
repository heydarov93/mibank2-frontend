import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  StyledActions,
  StyledCloseButton,
  StyledDetailsBox,
  StyledModal,
  StyledModalContent,
  StyledTitle,
} from './ConfirmTransferModal.styled';

import { SavePaymentWrapper, TransferDetailRow } from 'components/molecules';
import { formatTransferValue } from 'utils/currencyUtils';

interface ConfirmTransferModalProps {
  open: boolean;
  onClose?: () => void;
  from: string;
  to: string;
  amount: number;
  fee: number;
  currency: string;
  transferType: 'card' | 'account';
}

export const ConfirmTransferModal = ({
  open,
  onClose,
  transferType,
  from,
  to,
  amount,
  fee,
  currency,
}: ConfirmTransferModalProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'TransfersPage' });
  const isCard = transferType === 'card';

  // TODO: toValue, fromValue, amount, fee, total will replaced by actual real data
  const formattedValues = {
    fromLabel: t(isCard ? 'card_fromFieldLabel' : 'iban_fromFieldLabel'),
    toLabel: t(isCard ? 'card_toFieldLabel' : 'iban_toFieldName'),
    fromValue: isCard ? `••••${from.slice(-4)}` : from,
    toValue: isCard ? `••••${to.slice(-4)}` : to,
    amount: formatTransferValue(currency, amount),
    fee: formatTransferValue(currency, fee),
    total: formatTransferValue(currency, amount + fee),
  };

  return (
    <StyledModal open={open} onClose={onClose}>
      <StyledModalContent elevation={3} isCard={isCard}>
        <StyledCloseButton onClick={onClose} data-testid="close-icon">
          <CloseIcon />
        </StyledCloseButton>

        <StyledTitle variant="h3" data-testid="modal-title">
          {t('transferModal.title')}
        </StyledTitle>

        <StyledDetailsBox>
          <TransferDetailRow
            label={formattedValues.fromLabel}
            value={formattedValues.fromValue}
          />
          <TransferDetailRow
            label={formattedValues.toLabel}
            value={formattedValues.toValue}
          />
          <TransferDetailRow
            label={t('transferModal.amountText')}
            value={formattedValues.amount}
          />
          <TransferDetailRow
            label={t('transferModal.feeText')}
            value={formattedValues.fee}
          />
        </StyledDetailsBox>

        <TransferDetailRow
          label={t('transferModal.totalText')}
          value={formattedValues.total}
          isTotalRow={true}
        />

        <SavePaymentWrapper />

        <StyledActions>
          <Button variant="outlined" color="primary" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button variant="contained" color="primary">
            {t('confirm')}
          </Button>
        </StyledActions>
      </StyledModalContent>
    </StyledModal>
  );
};
