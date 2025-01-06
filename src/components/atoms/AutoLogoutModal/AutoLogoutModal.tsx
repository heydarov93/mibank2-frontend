import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledAutoLogoutModal } from './AutoLogoutModal.styled';

import { useGetRefreshTokenMutation } from 'api/refreshTokenApi';
import { useAppDispatch } from 'hooks';
import { TokenType } from 'models/IAuth';
import { routes } from 'router';
import { setError } from 'store/reducers';
import { logoutFromApp, setIsAutoLogout } from 'store/reducers/AuthSlice';
import { localTokenHandler, getEmail, removeAuthData } from 'utils';

export const AutoLogoutModal = () => {
  const { t } = useTranslation('translation');

  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);

  const countdownRef = useRef<number>(60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [refreshToken] = useGetRefreshTokenMutation();
  const email = getEmail();
  const dispatch = useAppDispatch();
  const pathName = window.location.pathname;

  const resetInactivityTimer = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    const newTimer = setTimeout(
      () => {
        setIsPopupVisible(true);
      },
      9 * 60 * 1000,
    );
    intervalRef.current = newTimer;
  };

  type UserChoice = 'logout' | 'extend';

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
  };

  const startCountdown = () => {
    const interval = setInterval(() => {
      countdownRef.current -= 1;
      setCountdown(countdownRef.current);
      if (countdownRef.current <= 0) {
        dispatch(setIsAutoLogout(true));
        setIsPopupVisible(false);
        logout();
        clearInterval(interval);
        resetInactivityTimer();
      }
    }, 1000);
  };

  useEffect(() => {
    const handleActivity = () => {
      resetInactivityTimer();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    resetInactivityTimer();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);

      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPopupVisible) {
      startCountdown();
    }
  }, [isPopupVisible]);

  const logout = () => {
    dispatch(logoutFromApp());
    routes.navigate('/signin');
    localTokenHandler.clearToken(TokenType.ACCESS);
    localTokenHandler.clearToken(TokenType.REFRESH);
    removeAuthData();
  };

  const getBack = async () => {
    const oldRefreshToken = localTokenHandler.getToken(TokenType.REFRESH);
    const payloadData = {
      email: email,
      refreshToken: oldRefreshToken,
    };
    try {
      const data = await refreshToken(payloadData).unwrap();

      localTokenHandler.storeToken(data.refreshToken, TokenType.REFRESH);
      localTokenHandler.storeToken(data.accessToken, TokenType.ACCESS);
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
      } else {
        dispatch(setError('An unknown error occurred'));
      }
    }
  };

  return (
    <StyledAutoLogoutModal
      open={isPopupVisible && pathName !== '/signin'}
      onClose={() => {
        handleUserChoice('logout');
      }}
    >
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
        <p>00: {countdown >= 10 ? countdown : `0${countdown}`}</p>
      </DialogContent>
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
