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

import { useVerifyCodeMutation } from 'api/authApi';
import { useAppDispatch, useFormatErrorMessage } from 'hooks';
import { TokenType } from 'models/IAuth';
import { setError, setVerifying } from 'store/reducers';
import {
  convertSecondsToTime,
  getEmailFromToken,
  localTokenHandler,
} from 'utils';

export const VerificationForm = () => {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();
  const [verifyCode] = useVerifyCodeMutation();

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
      handleVerificationSubmit(newValue, email);
    },
    [value, email],
  );

  const handleVerificationSubmit = async (
    value: string,
    currentEmail: string,
  ) => {
    const maxAttempts = 3;
    try {
      const data = await verifyCode(value).unwrap();
      localTokenHandler.storeToken(data.accessToken, TokenType.ACCESS);
      if (localStorage.getItem('accessToken')) {
        setIsCodeCorrect(true);
        setFailedAttempts(1);
        setIsCodeWrong(false);
        dispatch(setVerifying(false));

        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('email', currentEmail);
        localTokenHandler.clearToken(TokenType.TEMPORARY);

        setTimeout(() => navigate('/'), 1000);
      } else {
        setIsCodeWrong(true);

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
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const handleResetCodeWrong = () => {
    setIsCodeWrong(false);
    setValue('');
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
            onResetCodeWrong={handleResetCodeWrong}
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
