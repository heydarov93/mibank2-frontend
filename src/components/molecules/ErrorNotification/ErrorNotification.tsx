import { AlertTitle, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledAlert, StyledLink } from './ErrorNotification.styled';

import { MODAL_DISPLAY_TIMEOUT } from 'constants/ui/layout';
import { useAppSelector, useAppDispatch } from 'hooks';
import { errorMessage } from 'store/slices/auth';
import { clearError } from 'store/slices/auth/AuthSlice';

export const ErrorNotification = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'ErrorNotification',
  });
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorMessage);
  const open = Boolean(error);

  const errorParts = error ? error.split('.') : [];
  const title = errorParts.length > 1 ? errorParts[0] : '';

  const message =
    errorParts.length > 1
      ? errorParts.slice(1).join('.').split(t('contactUs'))
      : [error];

  const handleClose = () => {
    dispatch(clearError());
  };

  const scrollToContactSection = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={MODAL_DISPLAY_TIMEOUT}
      onClose={handleClose}
    >
      <StyledAlert severity="error">
        {title && <AlertTitle>{title}</AlertTitle>}
        <div>
          {message[0]}
          {message.length > 1 && (
            <StyledLink onClick={scrollToContactSection}>
              {t('contactUs')}
            </StyledLink>
          )}
          {message.length > 1 && message.slice(1).join(t('contactUs'))}
        </div>
      </StyledAlert>
    </Snackbar>
  );
};
