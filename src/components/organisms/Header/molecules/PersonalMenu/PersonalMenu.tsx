import { SettingsOutlined, LogoutOutlined } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  StyledButtonsContainer,
  StyledIconButton,
  StyledPersonalMenu,
} from './PersonalMenu.styled';

import { useGetUserInfoQuery } from 'api/services/user-account-service/user-accounts.api';
import { UserProfile } from 'components/molecules';
import { TO_SIGN_IN } from 'constants/navigation/routePaths';
import { ETokenType } from 'enums';
import { useAppSelector, useAppDispatch } from 'hooks';
import { getUser } from 'store/slices/auth';
import { logoutFromApp, setUserData } from 'store/slices/auth/AuthSlice';
import { getEmail, localTokenHandler, removeAuthData } from 'utils/auth';

export const PersonalMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const openSettingsHandler = () => {
    // TODO: need to change later
    // eslint-disable-next-line no-console
    console.log('Open settings');
  };

  const logoutHandler = () => {
    dispatch(logoutFromApp());
    navigate(TO_SIGN_IN);
    localTokenHandler.clearToken(ETokenType.ACCESS);
    removeAuthData();
  };

  const theme = useTheme();
  const isDesctopView = useMediaQuery(theme.breakpoints.up('md'));
  const user = useAppSelector(getUser);

  const email = getEmail();
  const paramsForUserInfo = {
    email: email,
    token: localTokenHandler.getToken(ETokenType.ACCESS),
  };

  const { data, isLoading } = useGetUserInfoQuery(
    paramsForUserInfo ? paramsForUserInfo : skipToken,
  );

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUserData(data));
    } else if (!isLoading && !data) {
      logoutHandler();
    }
  }, [isLoading, data]);

  return (
    <StyledPersonalMenu data-testid="personal-menu">
      {data && (
        <UserProfile
          user={user}
          isShowUserInfo={isDesctopView}
          isLoading={isLoading}
        />
      )}

      <StyledButtonsContainer>
        <StyledIconButton aria-label="settings" onClick={openSettingsHandler}>
          <SettingsOutlined />
        </StyledIconButton>
        <StyledIconButton aria-label="logout" onClick={logoutHandler}>
          <LogoutOutlined />
        </StyledIconButton>
      </StyledButtonsContainer>
    </StyledPersonalMenu>
  );
};
