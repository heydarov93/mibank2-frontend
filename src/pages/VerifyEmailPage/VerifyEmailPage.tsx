import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  StyledButton,
  StyledFlexRow,
  StyledText,
  StyledTitle,
} from './VerifyEmailPage.styled';

import { BusinessAuthWrapper } from 'components/organisms';
import { TO_WELCOME } from 'constants/navigation/routePaths';

export const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const { t } = useTranslation('translation', {
    keyPrefix: 'VerifyEmailPage',
  });

  useEffect(() => {
    if (!email) {
      navigate(TO_WELCOME);
    }
  }, [email, navigate]);

  if (!email) {
    return null;
  }

  return (
    <BusinessAuthWrapper>
      <StyledTitle variant="h2">{t('title')}</StyledTitle>
      <StyledText variant="body1">
        {t('emailSent')}
        <br />
        <Typography
          component="strong"
          variant="body1"
          sx={{ fontWeight: 'bold' }}
        >
          {email}
        </Typography>
      </StyledText>
      <StyledFlexRow>
        <Typography>{t('notReceived')}</Typography>
        <StyledButton>{t('resend')}</StyledButton>
      </StyledFlexRow>
    </BusinessAuthWrapper>
  );
};
