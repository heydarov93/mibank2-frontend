import { SettingsOutlined, LogoutOutlined } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
  StyledButtonsContainer,
  StyledIconButton,
  StyledPersonalMenu,
} from './PersonalMenu.styled';

import { UserCard } from 'components/molecules';
import { useAppSelector } from 'hooks/hook';
import { useAppDispatch } from 'hooks/hook';
//TODO: add logic for logoutFromApp
// import { logoutFromApp } from 'store/reducers/AuthSlice';
import { getUser } from 'store/selectors/AuthSelectors';

export const PersonalMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const openSettingsHandler = () => {
    // TODO: need to change later
    // eslint-disable-next-line no-console
    console.log('Open settings');
  };

  const logoutHandler = () => {
    // dispatch(logoutFromApp());

    navigate('/signin');
  };

  const theme = useTheme();
  const isDesctopView = useMediaQuery(theme.breakpoints.up('md'));
  const user = useAppSelector(getUser);

  return (
    <StyledPersonalMenu>
      {user && <UserCard user={user} isShowUserInfo={isDesctopView} />}

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
