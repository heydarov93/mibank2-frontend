import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ReactComponent as SuccessfulTransferIcon } from 'assets/icons/SuccessfulTransferIcon.svg';
import {
  TransferSuccessfulActions,
  TransferSuccessfulActionsProps,
} from 'components/molecules/TransferSuccessfulActions/TransferSuccessfulActions';

export interface TransferSuccessfulModalProps
  extends TransferSuccessfulActionsProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

export const TransferSuccessfulModal = ({
  open,
  onClose,
  onViewReceipt,
  onNewTransfer,
  message,
}: TransferSuccessfulModalProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'TransfersPage.successModal',
  });
  const successText = message || t('defaultSuccessText');

  return (
    <Dialog
      data-testid="transfer-successful-modal"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: (theme) => ({
          padding: '32px',
          borderRadius: '8px',
          maxWidth: '532px',
          width: '100%',
          border: `1px solid ${theme.palette.success.main}66`, // 66 = 40% opacity, same as rgba(x, x, x, 0.4)
          backgroundColor: theme.palette.common.white,
          boxShadow: '0 4px 24px 0 rgba(109, 114, 120, 0.1)',
        }),
      }}
    >
      <Stack direction="row" gap="12px">
        <Box>
          <SuccessfulTransferIcon />
        </Box>

        <Stack gap="8px">
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Typography fontSize={24} fontWeight={600}>
              {t('title')}
            </Typography>
            <CloseIcon
              data-testid="close-success-transfer-modal"
              onClick={onClose}
              sx={(theme) => ({
                color: theme.palette.grey[400],
                cursor: 'pointer',
              })}
            />
          </Stack>
          <Typography
            sx={(theme) => ({
              color: theme.palette.grey[400],
              lineHeight: 1.5,
            })}
          >
            {successText}
          </Typography>
          <TransferSuccessfulActions
            sx={{ mt: '16px' }}
            onViewReceipt={onViewReceipt}
            onNewTransfer={onNewTransfer}
          />
        </Stack>
      </Stack>
    </Dialog>
  );
};
