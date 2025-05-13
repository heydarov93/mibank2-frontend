import { List, ListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NavLink, Link as RouterLink } from 'react-router-dom';

import {
  StyledButtonContainer,
  StyledLink,
  StyledNavButton,
  StyledNavContainer,
} from './WelcomeNav.styled';

import {
  TO_SIGN_IN,
  TO_SIGN_UP,
  TO_BUSINESS_SIGN_IN,
  TO_BUSINESS_SIGN_UP,
} from 'constants/routesName';
import { navMenuLinks } from 'constants/welcomeNavigation';

enum EPanel {
  Personal,
  Business,
  About,
}

export const WelcomeNav = ({ activePanel }: { activePanel: EPanel }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'header.welcomeNavMenu',
  });
  // TODO - update with actual routes
  const isPersonal = activePanel === EPanel.Personal;
  const signIn = {
    label: isPersonal ? t('personalSignIn') : t('businessSignIn'),
    route: isPersonal ? TO_SIGN_IN : TO_BUSINESS_SIGN_IN,
  };
  const signUp = {
    label: isPersonal ? t('personalSignUp') : t('businessSignUp'),
    route: isPersonal ? TO_SIGN_UP : TO_BUSINESS_SIGN_UP,
  };

  return (
    <StyledNavContainer>
      <List sx={{ display: 'flex', gap: '16px' }}>
        {navMenuLinks.map(({ content, path }) => (
          <ListItem key={content}>
            <StyledLink underline="hover" component={NavLink} to={path}>
              {t(content)}
            </StyledLink>
          </ListItem>
        ))}
      </List>
      {activePanel !== EPanel.About && (
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
