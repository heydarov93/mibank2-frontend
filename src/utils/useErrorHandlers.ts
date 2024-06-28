import { Dispatch, SetStateAction } from 'react';

import { useAppDispatch } from 'hooks/hook';
import { IErrorData } from 'models/IError';
import { setError } from 'store/reducers/AuthSlice';

type FormatErrorMessageType = (
  remainingAttempts: number,
  message: string,
) => string;

export const useErrorHandlers = () => {
  const dispatch = useAppDispatch();

  const handleNotFoundError = (
    error: IErrorData,
    formatErrorMessage: FormatErrorMessageType,
  ) => {
    const { remainingAttempts, message } = error.data;

    const errorMessage = message
      ? formatErrorMessage(remainingAttempts, message)
      : 'An unknown error occurred';

    dispatch(setError(errorMessage));
  };

  const handleLockedError = (
    error: IErrorData,
    setIsFormDisabled: Dispatch<SetStateAction<boolean>>,
    setRemainingTime: Dispatch<SetStateAction<number>>,
    setEndTime: Dispatch<SetStateAction<number>>,
  ) => {
    const { blockTimeRemaining, isBlocked, message } = error.data;
    dispatch(setError(message));

    if (isBlocked) {
      setIsFormDisabled(true);
      const endTimestamp = Date.now() + blockTimeRemaining * 1000;
      setEndTime(endTimestamp);
      setRemainingTime(blockTimeRemaining * 1000);
    }
  };

  return { handleNotFoundError, handleLockedError };
};
