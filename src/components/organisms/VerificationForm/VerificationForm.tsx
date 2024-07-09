import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { MemoizedVerificationField } from './VerificationField';
import {
  StyledButton,
  StyledVerificationBoxTitle,
  StyledVerificationForm,
  StyledVerificationFormContent,
  StyledVerificationSubTitle,
  StyledVerificationTitle,
} from './VerificationForm.styled';

import { useAppDispatch } from 'hooks/hook';
import { setError } from 'store/reducers';
import { convertSecondsToTime, useFormatErrorMessage } from 'utils';

const email = localStorage.getItem('email');
const mockCode = '123456';

export const VerificationForm = () => {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();

  const [value, setValue] = useState('');
  const [remainingTime, setRemainingTime] = useState<number>(60);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(1);
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean>(false);

  const navigate = useNavigate();

  const { formatErrorMessage } = useFormatErrorMessage();

  const handleInputChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      setIsCodeCorrect(newValue === mockCode);

      if (newValue.length === 6) {
        handleVerificationSubmit(newValue);
      }
    },
    [value],
  );

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
    const endTime = Date.now() + remainingTime * 1000;

    const timer = setInterval(() => {
      const now = Date.now();
      const timeLeft = Math.max((endTime - now) / 1000, 0);
      setRemainingTime(Math.floor(timeLeft));

      if (timeLeft <= 0) {
        setIsFormDisabled(false);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  const remainingTimeLabel =
    remainingTime > 0
      ? ` ${t('VerificationPage.resendCodeIn')} ${convertSecondsToTime(remainingTime)}`
      : t('VerificationPage.resendCode');

  return (
    <>
      <StyledVerificationBoxTitle>
        <StyledVerificationTitle>
          {t('VerificationPage.verificationTitle')}
        </StyledVerificationTitle>
        <StyledVerificationSubTitle>
          {t('VerificationPage.verificationText')} <span>{email}</span>
        </StyledVerificationSubTitle>
      </StyledVerificationBoxTitle>
      <StyledVerificationForm>
        <StyledVerificationFormContent>
          <MemoizedVerificationField
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
    </>
  );
};
