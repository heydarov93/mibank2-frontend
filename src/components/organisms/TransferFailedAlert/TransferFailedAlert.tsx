import CloseIcon from '@mui/icons-material/Close';
import { Box, Snackbar, SnackbarProps, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ExclamationIcon } from 'assets/icons/ExclamationIcon.svg';

export interface TransferFailedAlertProps extends SnackbarProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

export const TransferFailedAlert = ({
  open,
  onClose,
  message,
  ...snackbarProps
}: TransferFailedAlertProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'TransfersPage.failedAlert',
  });
  const errorText = message || t('defaultErrorText');

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ maxWidth: '532px', width: '100%' }}
      {...snackbarProps}
    >
      <Box sx={{ width: '100%' }}>
        <Stack
          direction="row"
          gap="12px"
          sx={(theme) => ({
            padding: '32px',
            borderRadius: '8px',
            border: `1px solid ${theme.palette.error.main}`,
            backgroundColor: theme.palette.common.white,
            boxShadow: '0 4px 24px 0 rgba(109, 114, 120, 0.1)',
          })}
        >
          <div>
            <ExclamationIcon />
          </div>
          <Stack sx={{ width: '100%', gap: '8px' }}>
            <Stack
              justifyContent="space-between"
              alignItems="center"
              direction="row"
            >
              <Typography fontSize={24} fontWeight={600}>
                {t('title')}
              </Typography>
              <CloseIcon
                data-testid="close-failed-transfer-alert"
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
              {errorText}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Snackbar>
  );
};
