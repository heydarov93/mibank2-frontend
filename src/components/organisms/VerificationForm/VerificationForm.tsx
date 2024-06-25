import { useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledBoxContainer } from '../LoginForm/LoginForm.styled';

import {
  StyledButton,
  StyledVerificationBoxTitle,
  StyledVerificationForm,
  StyledVerificationFormContent,
  StyledVerificationSubTitle,
  StyledVerificationTitle,
} from './VerificationForm.styled';

import { Logo, ELogoSize } from 'components/atoms';
import { VerificationInputs } from 'components/molecules';
import { convertSecondsToTime } from 'utils';

const mockEmail = 'user1@gmail.com';

export const VerificationForm = () => {
  const { t } = useTranslation('translation');

  const [value, setValue] = useState('');
  const [remainingTime, setRemainingTime] = useState<number>(60);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up('md'));

  const handleResendCode = () => {
    // TODO: logic for resend code
    console.log('Resend code');

    setRemainingTime(600); //for failed attempts
    setIsFormDisabled(true); //move to submit for 3 unfailed attempts
  };

  useEffect(() => {
    if (remainingTime <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsFormDisabled(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  const remainingTimeLabel =
    remainingTime > 0
      ? ` ${t('VerificationPage.resendCodeIn')} ${convertSecondsToTime(remainingTime)}`
      : t('VerificationPage.resendCode');

  return (
    <StyledBoxContainer>
      <Logo size={ELogoSize.MEDIUM} />
      <StyledVerificationBoxTitle>
        <StyledVerificationTitle>
          {t('VerificationPage.verificationTitle')}
        </StyledVerificationTitle>
        <StyledVerificationSubTitle>
          {isDesktopView
            ? t('VerificationPage.verificationTextMd')
            : t('VerificationPage.verificationTextSm')}{' '}
          {mockEmail}
        </StyledVerificationSubTitle>
      </StyledVerificationBoxTitle>
      <StyledVerificationForm>
        <StyledVerificationFormContent>
          <VerificationInputs
            value={value}
            onChange={setValue}
            isFormDisabled={isFormDisabled}
          />
        </StyledVerificationFormContent>
      </StyledVerificationForm>
      <StyledButton onClick={handleResendCode} disabled={remainingTime > 0}>
        {remainingTimeLabel}
      </StyledButton>
    </StyledBoxContainer>
  );
};
