import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  MainContainer,
  StepContainer,
  Header,
  StepDescription,
  StepBox,
} from './BackOfficeVerificationPage.styled';

import { OneTimePasscodeForm } from 'components/organisms/OneTimePasscodeForm';

export const BackOfficeVerificationPage = () => {
  const { t } = useTranslation('translation');

  return (
    <MainContainer data-testid="main-container">
      <StepBox>
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StepContainer>{t('OTPVerificationPage.stepOne')}</StepContainer>
          <Header data-testid="step-one">
            {t('OTPVerificationPage.qrCodeTitle')}
          </Header>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <StepDescription data-testid="qr-code-title">
            {t('OTPVerificationPage.qrCodeText')}
          </StepDescription>
          {/* TODO MLB-1588 - remove temporary svg and replace with qr code once BE is ready */}
          <svg
            width="240"
            height="240"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M240 0H0V240H240V0Z" fill="black" />
          </svg>
        </Box>
      </StepBox>
      <StepBox>
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StepContainer>{t('OTPVerificationPage.stepTwo')}</StepContainer>
          <Header data-testid="step-two">
            {t('OTPVerificationPage.verificationTitle')}
          </Header>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <StepDescription data-testid="step-two-text">
            {t('OTPVerificationPage.verificationText')}
          </StepDescription>
          <OneTimePasscodeForm />
        </Box>
      </StepBox>
    </MainContainer>
  );
};
