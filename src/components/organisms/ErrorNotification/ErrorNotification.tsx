import { AlertTitle, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledAlert, StyledLink } from './ErrorNotification.styled';

import { useAppSelector, useAppDispatch } from 'hooks';
import { clearError } from 'store/reducers/AuthSlice';
import { errorMessage } from 'store/selectors';

export const ErrorNotification = () => {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorMessage);
  const open = Boolean(error);

  const errorParts = error ? error.split('.') : [];
  const title = errorParts.length > 1 ? errorParts[0] : '';

  const message =
    errorParts.length > 1
      ? errorParts.slice(1).join('.').split(t('ErrorNotification.contactUs'))
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
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <StyledAlert severity="error">
        {title && <AlertTitle>{title}</AlertTitle>}
        <div>
          {message[0]}
          {message.length > 1 && (
            <StyledLink onClick={scrollToContactSection}>
              {t('ErrorNotification.contactUs')}
            </StyledLink>
          )}
          {message.length > 1 &&
            message.slice(1).join(t('ErrorNotification.contactUs'))}
        </div>
      </StyledAlert>
    </Snackbar>
  );
};
