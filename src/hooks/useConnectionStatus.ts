import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'hooks';
import { clearError, setError } from 'store/reducers';
import { errorMessage } from 'store/selectors';

export const useConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { t } = useTranslation('translation', {
    keyPrefix: 'VerificationPage',
  });
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorMessage);
  const connectionError = error === t('lostConnection');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline && !connectionError) {
      dispatch(setError(t('lostConnection')));
    } else if (isOnline && connectionError) {
      dispatch(clearError());
    }
  }, [isOnline, connectionError]);
};
