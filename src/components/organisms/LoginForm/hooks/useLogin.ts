import { Action } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction, useState } from 'react';
import { UseFormResetField } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAuthorizeMutation, useSendcodeMutation } from 'api/authApi';
import { TO_VERIFICATION } from 'constants/routesName';
import { ErrorStatus } from 'enums';
import { useErrorHandlers } from 'hooks';
import { ILoginData, ILoginFormInput, TokenType } from 'models/IAuth';
import { IErrorData } from 'models/IError';
import {
  setError,
  setLoading,
  setVerifying,
  setVerifyingTimer,
} from 'store/reducers/AuthSlice';
import { localTokenHandler } from 'utils';

interface Props {
  dispatch: (action: Action) => void;
  setIsFormDisabled: Dispatch<SetStateAction<boolean>>;
  resetForm: () => void;
  resetField: UseFormResetField<ILoginFormInput>;
}

export function useLogin({
  dispatch,
  setIsFormDisabled,
  resetForm,
  resetField,
}: Props) {
  const navigate = useNavigate();
  const [authorize] = useAuthorizeMutation();
  const [sendcode] = useSendcodeMutation();
  const { handleLockedError } = useErrorHandlers();
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [lockoutEndTime, setLockoutEndTime] = useState<number>(0);

  const { t } = useTranslation('translation', { keyPrefix: 'LoginPage' });

  async function logIn(credentials: ILoginData) {
    try {
      const data = await authorize(credentials).unwrap();

      localTokenHandler.storeToken(data.accessToken, TokenType.TEMPORARY);
      dispatch(setVerifying(true));
      dispatch(setLoading(true));

      let isError = false;

      try {
        const response = await sendcode(null).unwrap();
        const expiredTimer = response.expiredTimer;
        dispatch(setVerifyingTimer(expiredTimer));
      } catch (e) {
        const error = e as IErrorData;
        isError = true;
        switch (error.status) {
          case ErrorStatus.TOO_MANY_REQUESTS:
            dispatch(setVerifyingTimer(error.data.expiredTimer));
            isError = false;
            break;
          case ErrorStatus.LOCKED:
            dispatch(setVerifyingTimer(error.data.blockTimeRemaining));
            break;
          case ErrorStatus.BAD_REQUEST:
            dispatch(setError(error.data.exceptionMessage));
            break;
          default:
            dispatch(setError(t('serverError')));
            break;
        }
      } finally {
        navigate(TO_VERIFICATION, { state: { isError } });
      }

      resetForm();
    } catch (e) {
      const error = e as IErrorData;
      switch (error.status) {
        case ErrorStatus.NOT_FOUND:
          dispatch(setError(error.data.exceptionMessage));
          resetField('password');
          break;
        case ErrorStatus.LOCKED:
          handleLockedError(
            error,
            setIsFormDisabled,
            setRemainingTime,
            setLockoutEndTime,
          );
          resetField('password');
          break;
        default:
          dispatch(setError(t('serverError')));
          break;
      }
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { logIn, remainingTime, lockoutEndTime };
}
