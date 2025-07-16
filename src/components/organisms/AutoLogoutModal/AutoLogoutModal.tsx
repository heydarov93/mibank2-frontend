import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Box } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledAutoLogoutModal } from './AutoLogoutModal.styled';

import { useGetRefreshTokenMutation } from 'api/services/user-account-service/user-accounts.api';
import { ReactComponent as StopWatch } from 'assets/icons/StopWatch.svg';
import {
  COUNT_DOWN_SECONDS,
  COUNTDOWN_LEADING_ZERO_THRESHOLD,
} from 'constants/business/numbers';
import { TIMER_TIMEOUT_IN_MILLISECONDS } from 'constants/ui/layout';
import { ETokenType } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { routes } from 'router';
import {
  getIsVerifying,
  logoutFromApp,
  setError,
  setIsAutoLogout,
} from 'store/slices/auth';
import {
  getAuthStatus,
  getEmail,
  localTokenHandler,
  removeAuthData,
} from 'utils/auth';

export const AutoLogoutModal = () => {
  const { t } = useTranslation('translation');

  type UserChoice = 'logout' | 'extend';

  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(COUNT_DOWN_SECONDS);

  const countdownRef = useRef<number>(60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sixtySecondTimerInterval = useRef<NodeJS.Timeout | null>(null);
  const [refreshToken] = useGetRefreshTokenMutation();
  const email = getEmail();
  const dispatch = useAppDispatch();
  const isAuth = getAuthStatus();
  const isVerifying = useAppSelector(getIsVerifying);
  const resetInactivityTimer = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    const newTimer = setTimeout(() => {
      setIsPopupVisible(true);
    }, TIMER_TIMEOUT_IN_MILLISECONDS);
    intervalRef.current = newTimer;
  };

  const handleUserChoice = (choice: UserChoice) => {
    if (choice === 'logout') {
      if (logout) {
        logout();
      }
    } else if (choice === 'extend') {
      getBack();
    }
    setIsPopupVisible(false);
    resetInactivityTimer();
    countdownRef.current = COUNT_DOWN_SECONDS;
    setCountdown(COUNT_DOWN_SECONDS);
    if (sixtySecondTimerInterval.current) {
      clearInterval(sixtySecondTimerInterval.current);
    }
  };

  const startCountdown = () => {
    if (sixtySecondTimerInterval.current) {
      clearInterval(sixtySecondTimerInterval.current);
    }
    if (countdownRef.current <= COUNT_DOWN_SECONDS) {
      countdownRef.current = COUNT_DOWN_SECONDS;
      setCountdown(COUNT_DOWN_SECONDS);
    }
    const interval = setInterval(() => {
      countdownRef.current -= 1;
      setCountdown(countdownRef.current);
      if (countdownRef.current <= 0) {
        countdownRef.current = COUNT_DOWN_SECONDS;
        handleUserChoice('logout');
        clearInterval(interval);
        sixtySecondTimerInterval.current = null;
        dispatch(setIsAutoLogout(true));
      }
    }, 1000);
    sixtySecondTimerInterval.current = interval;
  };
  useEffect(() => {
    const handleActivity = () => {
      resetInactivityTimer();
    };
    if (isAuth) {
      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keydown', handleActivity);
      window.addEventListener('click', handleActivity);
      resetInactivityTimer();
    } else {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      if (sixtySecondTimerInterval.current) {
        clearInterval(sixtySecondTimerInterval.current);
      }
    }
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);

      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      if (sixtySecondTimerInterval.current) {
        clearInterval(sixtySecondTimerInterval.current);
      }
      setCountdown(COUNT_DOWN_SECONDS);
      countdownRef.current = COUNT_DOWN_SECONDS;
    };
  }, [isAuth, isVerifying]);

  useEffect(() => {
    if (isPopupVisible) {
      startCountdown();
    }
  }, [isPopupVisible]);

  const logout = () => {
    dispatch(logoutFromApp());
    routes.navigate('/signin');
    localTokenHandler.clearToken(ETokenType.ACCESS);
    localTokenHandler.clearToken(ETokenType.REFRESH);
    removeAuthData();
  };

  const getBack = async () => {
    const oldRefreshToken = localTokenHandler.getToken(ETokenType.REFRESH);
    const payloadData = {
      email: email,
      refreshToken: oldRefreshToken,
    };
    try {
      const data = await refreshToken(payloadData).unwrap();
      localTokenHandler.storeToken(data.refreshToken, ETokenType.REFRESH);
      localTokenHandler.storeToken(data.accessToken, ETokenType.ACCESS);
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
      } else {
        dispatch(setError('An unknown error occurred'));
      }
    }
  };

  return (
    <StyledAutoLogoutModal open={isPopupVisible}>
      <DialogTitle>
        {t('AutoLogout.autoLogoutTitle')}
        <IconButton
          onClick={() => {
            handleUserChoice('extend');
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('AutoLogout.autoLogoutDescription')}
        </DialogContentText>
      </DialogContent>
      <Box className="timer">
        <StopWatch />
        <p style={{ paddingLeft: '10px' }}>
          00:{' '}
          {countdown >= COUNTDOWN_LEADING_ZERO_THRESHOLD
            ? countdown
            : `0${countdown}`}
        </p>
      </Box>
      <DialogActions>
        <Button
          onClick={() => {
            handleUserChoice('logout');
          }}
          className="cancelButton"
        >
          {t('AutoLogout.logoutBtn')}
        </Button>
        <Button
          onClick={() => {
            handleUserChoice('extend');
          }}
          className="confirmButton"
        >
          {t('AutoLogout.getBackBtn')}
        </Button>
      </DialogActions>
    </StyledAutoLogoutModal>
  );
};
