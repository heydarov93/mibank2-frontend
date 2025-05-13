import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { StyledTitle, StyledText } from './VerifyEmailPage.styled';

import { AuthPageWrapper } from 'components/organisms';
import { TO_WELCOME } from 'constants/routesName';

export const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t: tPage } = useTranslation('translation', {
    keyPrefix: 'VerifyEmailPage',
  });

  useEffect(() => {
    if (!location.state?.email) {
      navigate(TO_WELCOME);
    }
  }, []);

  if (!location.state?.email) {
    return null;
  }

  return (
    <AuthPageWrapper>
      <StyledTitle>{tPage('title')}</StyledTitle>
      <StyledText>
        {tPage('emailSent')}
        <br />
        <strong>{location.state.email}</strong>
      </StyledText>
      <Box display="flex" alignItems="center" gap="2px">
        <Typography>{tPage('notReceived')}</Typography>
        <Button sx={{ fontWeight: 500, fontSize: '16px', padding: '2px 6px' }}>
          {tPage('resend')}
        </Button>
      </Box>
    </AuthPageWrapper>
  );
};
