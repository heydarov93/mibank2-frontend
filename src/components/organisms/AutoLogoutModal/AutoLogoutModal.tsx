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
import { ETokenType } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { routes } from 'router';
import { setError } from 'store/reducers';
import { logoutFromApp, setIsAutoLogout } from 'store/reducers/AuthSlice';
import { getIsVerifying } from 'store/selectors';
import { getAuthStatus, getEmail, localTokenHandler, removeAuthData } from 'utils/auth';


export const AutoLogoutModal = () => {
  const { t } = useTranslation('translation');

  type UserChoice = 'logout' | 'extend';

  const In_Activity_Timeout_In_Milliseconds: number = 9 * 60 * 1000;

  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);

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
    }, In_Activity_Timeout_In_Milliseconds);
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
    countdownRef.current = 60;
    setCountdown(60);
    if (sixtySecondTimerInterval.current) {
      clearInterval(sixtySecondTimerInterval.current);
    }
  };

  const startCountdown = () => {
    if (sixtySecondTimerInterval.current) {
      clearInterval(sixtySecondTimerInterval.current);
    }
    if (countdownRef.current <= 60) {
      countdownRef.current = 60;
      setCountdown(60);
    }
    const interval = setInterval(() => {
      countdownRef.current -= 1;
      setCountdown(countdownRef.current);
      if (countdownRef.current <= 0) {
        countdownRef.current = 60;
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
      setCountdown(60);
      countdownRef.current = 60;
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
          00: {countdown >= 10 ? countdown : `0${countdown}`}
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
