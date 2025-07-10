import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import {
  StyledContainer,
  StyledImage,
} from './BackOfficeVerificationPage.styled';

import { useGetAuthenticateEmployeeQuery } from 'api/services/employee-service/employees.api';
import {
  BackOfficeVerificationStep,
  OneTimePasscodeForm,
} from 'components/organisms';
import { BackOfficeVerificationErrorPage } from 'pages/BackOfficeVerificationErrorPage/BackOfficeVerificationErrorPage';

export const BackOfficeVerificationPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'OTPVerificationPage',
  });
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get('token') ?? '', [searchParams]);
  const { data, error, isLoading } = useGetAuthenticateEmployeeQuery({ token });

  if (error) return <BackOfficeVerificationErrorPage />;

  const email = data?.email ?? '';
  const qrCode = data?.qrCodeBaseUrl ?? '';
  const isFetching = isLoading || !data;

  return (
    <StyledContainer data-testid="main-container">
      <BackOfficeVerificationStep
        stepLabel={t('stepOne')}
        headerLabel={t('qrCodeTitle')}
        descriptionLabel={t('qrCodeText')}
        loading={isFetching || qrCode === ''}
      >
        <StyledImage
          src={`data:image/png;base64,${qrCode}`}
          alt="QR Code"
          width="200"
          height="200"
        />
      </BackOfficeVerificationStep>
      <BackOfficeVerificationStep
        stepLabel={t('stepTwo')}
        headerLabel={t('verificationTitle')}
        descriptionLabel={t('verificationText')}
        loading={isFetching || email === ''}
      >
        <OneTimePasscodeForm email={email} />
      </BackOfficeVerificationStep>
    </StyledContainer>
  );
};
