import { SettingsOutlined, LogoutOutlined } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
  StyledButtonsContainer,
  StyledIconButton,
  StyledPersonalMenu,
} from './PersonalMenu.styled';

import { UserCard } from 'components/molecules';
// import { logoutHandler } from 'constants/index';

export const PersonalMenu = () => {
  const navigate = useNavigate();

  const openSettingsHandler = () => {
    // TODO: need to change later
    // eslint-disable-next-line no-console
    console.log('Open settings');
  };

  const logoutHandler = () => {
    const userToken = localStorage.getItem('userName');
    if (userToken) {
      localStorage.removeItem('userName');
      localStorage.removeItem('password');
      navigate('/signin');
    }
  };

  const theme = useTheme();
  const isDesctopView = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <StyledPersonalMenu>
      <UserCard
        // TODO: need delete mock data
        user={{
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'user1@gmail.com',
        }}
        isShowUserInfo={isDesctopView}
      />

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
