import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { MemoizedVerificationCode } from './VerificationCode';
import {
  StyledButton,
  StyledVerificationForm,
  StyledVerificationFormContent,
} from './VerificationForm.styled';
import { VerificationTitle } from './VerificationTitle';

import { useAppDispatch, useFormatErrorMessage } from 'hooks';
import { TokenType } from 'models/IAuth';
import { setError } from 'store/reducers';
import {
  convertSecondsToTime,
  getEmailFromToken,
  localTokenHandler,
} from 'utils';

const mockCode = '123456';

export const VerificationForm = () => {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();

  const token = localTokenHandler.getToken(TokenType.TEMPORARY);

  const [email, setEmail] = useState('');
  const [value, setValue] = useState('');
  const [remainingTime, setRemainingTime] = useState<number>(60);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
  const [isCodeWrong, setIsCodeWrong] = useState<boolean>(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(1);
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean>(false);

  const navigate = useNavigate();

  const { formatErrorMessage } = useFormatErrorMessage();

  const handleVerificationCode = useCallback(
    (newValue: string) => {
      setValue(newValue);
      setIsCodeCorrect(newValue === mockCode);
      handleVerificationSubmit(newValue, email);
    },
    [value, email],
  );

  const handleVerificationSubmit = (value: string, currentEmail: string) => {
    // Simulate backend verification (replace with actual API call in real implementation)
    const maxAttempts = 3;

    if (value === mockCode) {
      setIsCodeCorrect(true);
      setFailedAttempts(1);
      setIsCodeWrong(false);

      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('email', currentEmail);

      setTimeout(() => navigate('/'), 1000);
    } else {
      setIsCodeWrong(true);
      setTimeout(() => {
        setIsCodeWrong(false), setValue('');
      }, 1000);

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
    if (!token) return;

    const email = getEmailFromToken(token);
    setEmail(email || '');
  }, [token]);

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
      <VerificationTitle email={email} />
      <StyledVerificationForm>
        <StyledVerificationFormContent>
          <MemoizedVerificationCode
            onReady={handleVerificationCode}
            isFormDisabled={isFormDisabled}
            isCodeWrong={isCodeWrong}
            isCodeCorrect={isCodeCorrect}
            separator={<span>-</span>}
            length={6}
          />
        </StyledVerificationFormContent>
      </StyledVerificationForm>
      <StyledButton disabled={remainingTime > 0}>
        {remainingTimeLabel}
      </StyledButton>
    </>
  );
};
