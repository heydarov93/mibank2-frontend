import { useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ErrorNotification } from '../';
import { StyledBoxContainer } from '../LoginForm/LoginForm.styled';

import { VerificationField } from './VerificationField';
import {
  StyledButton,
  StyledVerificationBoxTitle,
  StyledVerificationForm,
  StyledVerificationFormContent,
  StyledVerificationSubTitle,
  StyledVerificationTitle,
} from './VerificationForm.styled';

import { Logo, ELogoSize } from 'components/atoms';
import { useAppDispatch } from 'hooks/hook';
import { setError } from 'store/reducers';
import { convertSecondsToTime, useFormatErrorMessage } from 'utils';

const mockEmail = 'user1@gmail.com';
const mockCode = '123456';

export const VerificationForm = () => {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();

  const [value, setValue] = useState('');
  const [remainingTime, setRemainingTime] = useState<number>(60);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(1);
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean>(false);

  const theme = useTheme();
  const navigate = useNavigate();
  const isDesktopView = useMediaQuery(theme.breakpoints.up('md'));

  const { formatErrorMessage } = useFormatErrorMessage();

  const handleInputChange = (newValue: string) => {
    setValue(newValue);
    setIsCodeCorrect(newValue === mockCode);

    if (newValue.length === 6) {
      handleVerificationSubmit(newValue);
    }
  };

  const handleVerificationSubmit = (value: string) => {
    // Simulate backend verification (replace with actual API call in real implementation)
    const maxAttempts = 3;

    if (value === mockCode) {
      setIsCodeCorrect(true);
      setFailedAttempts(1);

      setTimeout(() => navigate('/'), 1000);
    } else {
      setValue('');
      setFailedAttempts((prevAttempts) => prevAttempts + 1);
      setIsCodeCorrect(false);

      if (failedAttempts < maxAttempts) {
        const remainingAttempts = maxAttempts - failedAttempts;
        const message =
          'Verification code is incorrect. Enter correct code or resend the code or contact us.';

        const errorMessage = formatErrorMessage(remainingAttempts, message);

        dispatch(setError(errorMessage));
      } else if (failedAttempts >= maxAttempts) {
        setIsFormDisabled(true);
        setRemainingTime(600);
        setFailedAttempts(1);

        const errorMessage =
          'Too many failed attempts. Please try to request the code again in 10 minutes or contact us for assistance';

        dispatch(setError(errorMessage));
      }
    }
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
      <ErrorNotification
        position={{ vertical: 'bottom', horizontal: 'center' }}
      />
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
          <VerificationField
            value={value}
            onChange={handleInputChange}
            isFormDisabled={isFormDisabled}
            isCodeCorrect={isCodeCorrect}
          />
        </StyledVerificationFormContent>
      </StyledVerificationForm>
      <StyledButton disabled={remainingTime > 0}>
        {remainingTimeLabel}
      </StyledButton>
    </StyledBoxContainer>
  );
};
