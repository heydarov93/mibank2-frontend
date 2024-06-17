import { Dispatch, SetStateAction } from 'react';

import { formatErrorMessage } from './formatErrorMessage';

import { useAppDispatch } from 'hooks/hook';
import { IErrorData } from 'models/IError';
import { setError } from 'store/reducers/AuthSlice';

export const useErrorHandlers = () => {
  const dispatch = useAppDispatch();

  const handleNotFoundError = (error: IErrorData) => {
    const { remainingAttempts, message } = error.data;

    const errorMessage = formatErrorMessage(remainingAttempts, message);

    dispatch(setError(errorMessage));
  };

  const handleLockedError = (
    error: IErrorData,
    setIsFormDisabled: Dispatch<SetStateAction<boolean>>,
    setRemainingTime: Dispatch<SetStateAction<number>>,
  ) => {
    const { blockTimeRemaining, isBlocked, message } = error.data;
    dispatch(setError(message));

    if (isBlocked) {
      setIsFormDisabled(true);
      setRemainingTime(blockTimeRemaining);
    }
  };

  return { handleNotFoundError, handleLockedError };
};
