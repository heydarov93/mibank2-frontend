import { AlertTitle, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledAlert, StyledLink } from './ErrorNotification.styled';

import { termsLink, policyLink } from 'components/organisms/Footer/constants';
import { useAppSelector, useAppDispatch } from 'hooks';
import { clearError } from 'store/reducers/AuthSlice';
import { errorMessage } from 'store/selectors';
import { generateRandomParam } from 'utils';

export const ErrorNotification = () => {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorMessage);
  const open = Boolean(error);
  const urlTerms = `${termsLink}${generateRandomParam()}`;
  const urlPolicy = `${policyLink}${generateRandomParam()}`;

  const errorParts = error ? error.split('.') : [];
  const title = errorParts.length > 1 ? errorParts[0] : '';

  const message =
    errorParts.length > 1
      ? errorParts.slice(1).join('.').split(t('ErrorNotification.contactUs'))
      : [error];
  const handleClose = () => {
    dispatch(clearError());
  };

  const isMessageTerm = (message: null | string) => {
    if (message && message === t('SignupPage.errorTermsPrivacyRequired')) {
      return (
        <>
          Please, read and agree to our{' '}
          <StyledLink href={urlTerms} target='_blank'>
            Terms of Use
          </StyledLink>{' '}
          and {' '} 
          <StyledLink href={urlPolicy} target='_blank'>
            Privacy Policy
          </StyledLink> to continue
        </>
      );
    }
    return message ? message : null;
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
          {isMessageTerm(message[0])}
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
