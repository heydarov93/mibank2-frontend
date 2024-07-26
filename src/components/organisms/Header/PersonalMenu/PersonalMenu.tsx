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

import { useGetUserInfoQuery } from 'api/userInfoApi';
import { UserCard } from 'components/molecules';
import { useAppSelector, useAppDispatch } from 'hooks';
import { TokenType } from 'models/IAuth';
import { logoutFromApp, setUserData } from 'store/reducers/AuthSlice';
import { getUser } from 'store/selectors/AuthSelectors';
import { localTokenHandler } from 'utils';

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
    navigate('/signin');
    localTokenHandler.clearToken(TokenType.ACCESS);
    localStorage.removeItem('isAuth');
    localStorage.removeItem('email');
  };

  const theme = useTheme();
  const isDesctopView = useMediaQuery(theme.breakpoints.up('md'));
  const user = useAppSelector(getUser);

  const email = localStorage.getItem('email');

  const { data, isLoading } = useGetUserInfoQuery(email ?? skipToken);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUserData(data));
    } else if (!isLoading && !data) {
      logoutHandler();
    }
  }, [isLoading]);

  return (
    <StyledPersonalMenu data-testid="personal-menu">
      {data && (
        <UserCard
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
