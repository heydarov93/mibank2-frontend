import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  MainContainer,
  TitleText,
  SecondaryText,
} from './BackOfficeVerificationErrorPage.styled';

import ReloadButton from 'components/atoms/ReloadButton/ReloadButton';

const BackOfficeVerificationErrorPage = () => {
  const { t } = useTranslation('translation');

  return (
    <MainContainer>
      <Box>
        <TitleText data-testid="title-text">
          {t('OTPVerificationPage.QRCodeExpired')}
        </TitleText>
        <SecondaryText data-testid="secondary-text">
          {t('OTPVerificationPage.RefreshPage')}
        </SecondaryText>
      </Box>
      <Box sx={{ cursor: 'pointer' }}>
        <ReloadButton data-testid="reload-icon" />
      </Box>
    </MainContainer>
  );
};

export default BackOfficeVerificationErrorPage;
