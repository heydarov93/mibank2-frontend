import { Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import {
  Header,
  ImageContainer,
  MainContainer,
  StepBox,
  StepContainer,
  StepDescription,
} from './BackOfficeVerificationPage.styled';

import { useGetAuthenticateEmployeeQuery } from 'api/services/employee-service/employees.api';
import { OneTimePasscodeForm } from 'components/organisms';
import { BackOfficeVerificationErrorPage } from 'pages/BackOfficeVerificationErrorPage/BackOfficeVerificationErrorPage';

export const BackOfficeVerificationPage = () => {
  const { t } = useTranslation('translation');

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const queryParam = useQuery();
  const token = queryParam.get('token');

  const { data, error, isLoading } = useGetAuthenticateEmployeeQuery({ token: token ?? '' });

  const email = data?.email || null;
  const imgUrl = data?.qrCodeBaseUrl || null;

  if (error) {
    return <BackOfficeVerificationErrorPage />;
  }

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
          {isLoading || !imgUrl ? (
            <CircularProgress />
          ) : (
            <ImageContainer
              src={`data:image/png;base64,${imgUrl}`}
              alt="QR Code"
              width="200"
              height="200"
            />
          )}
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
          {isLoading || !email ? (
            <CircularProgress />
          ) : (
            <OneTimePasscodeForm email={email} />
          )}
        </Box>
      </StepBox>
    </MainContainer>
  );
};
