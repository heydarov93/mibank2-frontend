import CloseIcon from '@mui/icons-material/Close';
import { AlertProps } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ExclamationIcon } from 'assets/icons/ExclamationIcon.svg';
import { ReactComponent as SuccessfulTransferIcon } from 'assets/icons/SuccessfulTransferIcon.svg';

export interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  type?: AlertProps['severity'];
  title?: string;
  message?: string;
  children?: ReactElement | string | undefined | never[] | false;
}

export const AlertDialog = ({
  open,
  onClose,
  title,
  message,
  type = 'success',
  children,
}: AlertDialogProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common',
  });
  const alertTitle = title || t(`${type}.title`);
  const alertText = message || t(`${type}.message`);

  return (
    <Dialog
      data-testid="transfer-successful-modal"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: (theme) => ({
          padding: theme.spacing(4),
          borderRadius: '8px',
          maxWidth: '532px',
          width: '100%',
          border: `1px solid ${theme.palette[type].main}`,
          backgroundColor: theme.palette.common.white,
          boxShadow: '0 4px 24px 0 rgba(109, 114, 120, 0.1)',
        }),
      }}
    >
      <Box display="flex" gap={2} justifyContent="space-between">
        <Box>
          {type === 'success' ? (
            <SuccessfulTransferIcon />
          ) : (
            <ExclamationIcon />
          )}
        </Box>
        <Stack>
          <Typography fontSize={24} fontWeight={600}>
            {alertTitle}
          </Typography>
          <Typography
            sx={(theme) => ({
              color: theme.palette.grey[400],
              marginTop: theme.spacing(1),
            })}
          >
            {alertText}
          </Typography>
        </Stack>
        <CloseIcon
          data-testid="close-success-transfer-modal"
          onClick={onClose}
          sx={(theme) => ({
            color: theme.palette.grey[400],
            cursor: 'pointer',
            marginLeft: 'auto',
          })}
        />
      </Box>
      {children}
    </Dialog>
  );
};
