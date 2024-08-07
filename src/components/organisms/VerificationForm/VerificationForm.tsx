import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MemoizedVerificationCode } from './VerificationCode';
import {
  StyledButton,
  StyledVerificationForm,
  StyledVerificationFormContent,
} from './VerificationForm.styled';
import { VerificationTitle } from './VerificationTitle';

import { useSendcodeMutation, useVerifyCodeMutation } from 'api/authApi';
import { Timer } from 'components/molecules';
import { ErrorStatus } from 'enums';
import { useAppDispatch, useAppSelector, useErrorHandlers } from 'hooks';
import { SendCodeResponse, TokenType } from 'models/IAuth';
import { IErrorData } from 'models/IError';
import { setError, setVerifying } from 'store/reducers';
import { getVerifyingTimer } from 'store/selectors';
import { CustomError, getEmailFromToken, localTokenHandler } from 'utils';

type VerificationFormProps = {
  disableFields?: boolean;
};

export const VerificationForm = ({
  disableFields = false,
}: VerificationFormProps) => {
  const dispatch = useAppDispatch();

  const [sendcode] = useSendcodeMutation();
  const [verifyCode] = useVerifyCodeMutation();

  const token = localTokenHandler.getToken(TokenType.TEMPORARY);
  const expiredTimer = useAppSelector(getVerifyingTimer);

  const [email, setEmail] = useState('');
  const [value, setValue] = useState('');

  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
  const [lockoutEndTime, setLockoutEndTime] = useState<number>(0);

  const [isCodeWrong, setIsCodeWrong] = useState<boolean>(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean>(false);
  const [shouldClearFields, setShouldClearFields] = useState<boolean>(false);

  const navigate = useNavigate();

  const { handleLockedError } = useErrorHandlers();

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
    try {
      const data = await verifyCode(value).unwrap();
      localTokenHandler.storeToken(data.accessToken, TokenType.ACCESS);
      if (localStorage.getItem('accessToken')) {
        setIsCodeCorrect(true);
        setIsCodeWrong(false);

        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('email', currentEmail);
        localTokenHandler.clearToken(TokenType.TEMPORARY);

        setTimeout(() => {
          navigate('/');
          dispatch(setVerifying(false));
        }, 1000);
      }
    } catch (e) {
      setIsCodeWrong(true);
      setIsCodeCorrect(false);

      const error = e as IErrorData;

      if (e instanceof Error) {
        dispatch(setError(e.message));
      } else {
        switch (error.status) {
          case ErrorStatus.NOT_FOUND:
            dispatch(setError(error.data.message));
            break;
          case ErrorStatus.TOO_MANY_REQUESTS:
            handleLockedError(
              error,
              setIsFormDisabled,
              setRemainingTime,
              setLockoutEndTime,
            );
            break;
          default:
            dispatch(setError('An unknown error occurred'));
            break;
        }
      }
    }
  };

  const startTimer = (seconds: number) => {
    const millis = seconds * 1000;
    const endTimestamp = Date.now() + millis;
    setLockoutEndTime(endTimestamp);
    setRemainingTime(millis);
  };

  const handleResendButton = async () => {
    try {
      const response = await sendcode(null);
      setIsFormDisabled(false);

      const data = (response as SendCodeResponse).data;
      const isError = 'error' in response;

      if (!isError) {
        const expiredTimer = data ? data.expiredTimer : null;

        if (expiredTimer) startTimer(expiredTimer);
      } else {
        const error = response.error as SendCodeResponse;
        if (error.data.expiredTimer) {
          throw new CustomError<number>(
            error.data.status,
            error.data.expiredTimer,
          );
        }
      }
    } catch (e) {
      if (e instanceof CustomError) {
        startTimer(e.details);
        setIsFormDisabled(true);
      } else if (e instanceof Error) {
        dispatch(setError(e.message));
      }
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
    if (expiredTimer === 0) return;

    if (disableFields) setIsFormDisabled(true);
    startTimer(expiredTimer);
  }, []);

  useEffect(() => {
    if (remainingTime > 0) {
      setIsFormDisabled(disableFields);
      setShouldClearFields(false);
      return;
    } else {
      setIsFormDisabled(true);
      setShouldClearFields(true);
    }

    const isAuth = localStorage.getItem('isAuth');
    if (isAuth) {
      const timer = setTimeout(() => navigate('/'), 1000);

      return () => clearTimeout(timer);
    }
  }, [remainingTime, navigate]);

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
            shouldClearFields={shouldClearFields}
          />
        </StyledVerificationFormContent>
      </StyledVerificationForm>
      <StyledButton onClick={handleResendButton} disabled={remainingTime > 0}>
        <Timer
          time={remainingTime}
          endTime={lockoutEndTime}
          runTimer={setIsFormDisabled}
          hasResendBtn={true}
          setTime={setRemainingTime}
        />
      </StyledButton>
    </>
  );
};
