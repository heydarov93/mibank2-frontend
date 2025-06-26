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

import { useSendcodeMutation, useVerifyCodeMutation } from 'api/authApi';
import { useLazyGetUserInfoQuery } from 'api/userInfoApi';
import { Timer } from 'components/molecules';
import { EErrorStatus, EUserStatus, ETokenType } from 'enums';
import {
  useAppDispatch,
  useAppSelector,
  useConnectionStatus,
  useErrorHandlers,
} from 'hooks';
import { IErrorData } from 'models/IError';
import { setError, setVerifying } from 'store/reducers';
import { getVerifyingTimer } from 'store/selectors';
import {
  getAuthStatus,
  getEmailFromToken,
  localTokenHandler,
  setAuthData,
} from 'utils';

type VerificationFormProps = {
  disableFields?: boolean;
};

export const VerificationForm = ({
  disableFields = false,
}: VerificationFormProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'VerificationPage',
  });
  const dispatch = useAppDispatch();

  const [sendcode] = useSendcodeMutation();
  const [verifyCode] = useVerifyCodeMutation();
  const [triggerGetUserInfo] = useLazyGetUserInfoQuery();

  const token = localTokenHandler.getToken(ETokenType.TEMPORARY);
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
  useConnectionStatus();

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
      const data = await verifyCode({
        verificationCode: value,
      }).unwrap();

      const paramsForUserInfo = {
        email: currentEmail,
        token: data.accessToken,
      };

      const userInfoResult =
        await triggerGetUserInfo(paramsForUserInfo).unwrap();

      localTokenHandler.storeToken(data.accessToken, ETokenType.ACCESS);
      localTokenHandler.storeToken(data.refreshToken, ETokenType.REFRESH);
      if (localTokenHandler.getToken(ETokenType.ACCESS)) {
        setIsCodeCorrect(true);
        setIsCodeWrong(false);

        setAuthData(true, currentEmail);
        localTokenHandler.clearToken(ETokenType.TEMPORARY);
        if (userInfoResult.status === EUserStatus.ACTIVE) {
          setTimeout(() => {
            navigate('/registration');
            dispatch(setVerifying(false));
          }, 1000);
        }
        if (userInfoResult.status === EUserStatus.REGISTRED) {
          setTimeout(() => {
            navigate('/');
            dispatch(setVerifying(false));
          }, 1000);
        }
      }
    } catch (e) {
      setIsCodeWrong(true);
      setIsCodeCorrect(false);

      const error = e as IErrorData;

      if (e instanceof Error) {
        dispatch(setError(t('serverError')));
      } else {
        switch (error.status) {
          case EErrorStatus.NOT_FOUND:
            dispatch(setError(error.data.exceptionMessage));
            break;
          case EErrorStatus.LOCKED:
            handleLockedError(
              error,
              setIsFormDisabled,
              setRemainingTime,
              setLockoutEndTime,
            );
            break;
          default:
            dispatch(setError(t('serverError')));
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
      const response = await sendcode(null).unwrap();
      setIsFormDisabled(false);
      startTimer(response.expiredTimer);
    } catch (e) {
      const error = e as IErrorData;
      setIsFormDisabled(true);
      switch (error.status) {
        case EErrorStatus.TOO_MANY_REQUESTS:
          startTimer(error.data.expiredTimer);
          break;
        case EErrorStatus.BAD_REQUEST:
          dispatch(setError(error.data.exceptionMessage));
          break;
        case EErrorStatus.UNAUTHORIZED:
        default:
          dispatch(setError(t('serverError')));
          break;
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
    if (remainingTime > 0) {
      setShouldClearFields(false);
      return;
    } else {
      setIsFormDisabled(true);
      setShouldClearFields(true);
    }

    const isAuth = getAuthStatus();
    if (isAuth) {
      const timer = setTimeout(() => navigate('/'), 1000);

      return () => clearTimeout(timer);
    }
  }, [remainingTime, navigate]);

  useEffect(() => {
    if (expiredTimer === 0) return;

    setIsFormDisabled(disableFields);
    startTimer(expiredTimer);
  }, [expiredTimer]);

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
