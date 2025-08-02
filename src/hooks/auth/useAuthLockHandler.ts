import { Dispatch, SetStateAction } from 'react';

import { useAppDispatch } from 'hooks';
import { IErrorData } from 'models/IError';
import { setError } from 'store/slices/auth/AuthSlice';

export const useAuthLockHandler = () => {
  const dispatch = useAppDispatch();

  const handleLockedError = (
    error: IErrorData,
    setIsFormDisabled: Dispatch<SetStateAction<boolean>>,
    setRemainingTime: Dispatch<SetStateAction<number>>,
    setEndTime: Dispatch<SetStateAction<number>>,
  ) => {
    const { blockTimeRemaining, blocked, exceptionMessage } = error.data;

    dispatch(setError(exceptionMessage));

    if (blocked) {
      setIsFormDisabled(true);
      const endTimestamp = Date.now() + blockTimeRemaining * 1000;
      setEndTime(endTimestamp);
      setRemainingTime(blockTimeRemaining * 1000);
    }
  };

  return { handleLockedError };
};
