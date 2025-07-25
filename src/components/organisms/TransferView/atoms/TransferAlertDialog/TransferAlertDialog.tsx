import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledButton } from './TransferAlertDialog.styled';

import {
  AlertDialog,
  AlertDialogProps,
} from 'components/organisms/AlertDialog/AlertDialog';

interface TransferAlertDialogProps extends AlertDialogProps {
  onViewReceipt: () => void;
}

export function TransferAlertDialog({
  type,
  open,
  onClose,
  onViewReceipt,
  message,
}: TransferAlertDialogProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'TransfersPage.alert',
  });
  const alertMessage = message || t(`${type}.message`);

  return (
    <AlertDialog
      open={open}
      onClose={onClose}
      type={type}
      title={t(`${type}.title`)}
      message={alertMessage}
    >
      {type === 'success' && (
        <Stack
          direction="row"
          gap="12px"
          justifyContent="flex-end"
          marginTop={3}
        >
          <StyledButton variant="outlined" onClick={onClose}>
            {t(`${type}.close`)}
          </StyledButton>
          <StyledButton variant="contained" onClick={onViewReceipt}>
            {t(`${type}.viewReceipt`)}
          </StyledButton>
        </Stack>
      )}
    </AlertDialog>
  );
}
