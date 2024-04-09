import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LogoutIcon } from 'assets/icons/Logout.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/Settings.svg';

import {
  StyledAvatar,
  StyledButtonsContainer,
  StyledGreetings,
  StyledGreetingsContainer,
  StyledGreetingsName,
  StyledIconButton,
  StyledPersonalMenu,
} from './PersonalMenu.styled';
import { useNavigate } from 'react-router-dom';

type PersonalMenuProps = {
  user: {
    firstName: string;
    lastName: string;
  };
};

export const PersonalMenu = ({ user }: PersonalMenuProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  const navigate = useNavigate(); 

  const openSettingsHandler = () => {
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
      <StyledGreetingsContainer>
        <Box>
          <StyledGreetings>
            {/* TODO: need to setup line-heaght into the theme */}
            <Typography sx={{ lineHeight: '16px' }} variant="caption">
              {`${t('greetings')},`}
            </Typography>
          </StyledGreetings>
          <StyledGreetingsName>
            <Typography sx={{ lineHeight: '24px' }} variant="body1">
              {user.firstName}
            </Typography>
          </StyledGreetingsName>
        </Box>
        <StyledAvatar>{initials}</StyledAvatar>
      </StyledGreetingsContainer>

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
