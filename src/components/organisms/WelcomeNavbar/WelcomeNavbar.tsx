import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useTranslation } from 'react-i18next';
import { NavLink, Link as RouterLink } from 'react-router-dom';

import {
  StyledButtonContainer,
  StyledLink,
  StyledNavButton,
  StyledNavContainer,
} from './WelcomeNavbar.styled';

import { WELCOME_NAV_LINKS } from 'constants/navigation/navigation';
import {
  TO_BUSINESS_LOG_IN,
  TO_BUSINESS_SIGN_UP,
  TO_SIGN_IN,
  TO_SIGN_UP,
} from 'constants/navigation/routePaths';

enum EWelcomeNav {
  Personal,
  Business,
  About,
}

interface WelcomeNavbarProps {
  activePanel: EWelcomeNav;
}

export const WelcomeNavbar = ({ activePanel }: WelcomeNavbarProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'header.welcomeNavMenu',
  });
  // TODO: update with actual routes
  const isPersonal = activePanel === EWelcomeNav.Personal;
  const signIn = {
    label: isPersonal ? t('personalSignIn') : t('businessSignIn'),
    route: isPersonal ? TO_SIGN_IN : TO_BUSINESS_LOG_IN,
  };
  const signUp = {
    label: isPersonal ? t('personalSignUp') : t('businessSignUp'),
    route: isPersonal ? TO_SIGN_UP : TO_BUSINESS_SIGN_UP,
  };

  return (
    <StyledNavContainer>
      <List sx={{ display: 'flex', gap: '16px' }}>
        {WELCOME_NAV_LINKS.map(({ label, path }) => (
          <ListItem key={label}>
            <StyledLink underline="hover" component={NavLink} to={path}>
              {t(label)}
            </StyledLink>
          </ListItem>
        ))}
      </List>
      {activePanel !== EWelcomeNav.About && (
        <StyledButtonContainer>
          <StyledNavButton
            to={signIn.route}
            component={RouterLink}
            variant="outlined"
          >
            {signIn.label}
          </StyledNavButton>
          <StyledNavButton
            to={signUp.route}
            component={RouterLink}
            variant="contained"
          >
            {signUp.label}
          </StyledNavButton>
        </StyledButtonContainer>
      )}
    </StyledNavContainer>
  );
};
