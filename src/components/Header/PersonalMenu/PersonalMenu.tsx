import { useNavigate } from 'react-router-dom';

import {
  StyledButtonsContainer,
  StyledIconButton,
  StyledPersonalMenu,
} from './PersonalMenu.styled';

import { ReactComponent as LogoutIcon } from 'assets/icons/Logout.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/Settings.svg';
import { UserCard } from 'components/molecules';

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

  return (
    <StyledPersonalMenu>
      <UserCard
        // TODO: need delete mock data
        user={{
          firstName: 'Alexandra',
          lastName: 'Vegas',
        }}
      />

      <StyledButtonsContainer>
        <StyledIconButton aria-label="settings" onClick={openSettingsHandler}>
          <SettingsIcon />
        </StyledIconButton>
        <StyledIconButton aria-label="logout" onClick={logoutHandler}>
          <LogoutIcon />
        </StyledIconButton>
      </StyledButtonsContainer>
    </StyledPersonalMenu>
  );
};
