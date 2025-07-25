import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { StyledAlert } from './InfoAlert.styled';

import { ReactComponent as ExclamationIcon } from 'assets/icons/ExclamationIcon.svg';
import { ReactComponent as SuccessIcon } from 'assets/icons/SuccessfulCreation.svg';

export interface InfoAlertProps extends SnackbarProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  type?: 'success' | 'error';
  withBackdrop?: boolean;
}

export const InfoAlert = ({
  open,
  onClose,
  message,
  title,
  type = 'success',
  withBackdrop,
  ...snackbarProps
}: InfoAlertProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common',
  });
  const alertTitle = title || t(`${type}.title`);
  const alertText = message || t(`${type}.message`);

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      {...snackbarProps}
      sx={{
        ...(withBackdrop && {
          '&': {
            top: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.3)',
          },
        }),
        ...snackbarProps.sx,
      }}
    >
      <StyledAlert
        onClose={onClose}
        severity={type}
        iconMapping={{
          success: <SuccessIcon data-testid="success-icon" />,
          error: <ExclamationIcon data-testid="error-icon" />,
        }}
        sx={(theme) => ({
          border: `1px solid ${theme.palette[type].main}`,
          maxWidth: '532px',
          width: '100%',
        })}
      >
        <Typography
          fontSize={24}
          fontWeight={600}
          color="common.black"
          lineHeight={1}
        >
          {alertTitle}
        </Typography>
        <Typography fontSize={16} color="grey.400" marginTop={1}>
          {alertText}
        </Typography>
      </StyledAlert>
    </Snackbar>
  );
};
