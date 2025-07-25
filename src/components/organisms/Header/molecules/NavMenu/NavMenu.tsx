import { useTranslation } from 'react-i18next';

import { StyledNavLink, StyledNavMenu } from './NavMenu.styled';

import { MAIN_NAV_LINKS } from 'constants/navigation/navigation';

export const NavMenu = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'header.navMenu' });

  return (
    <StyledNavMenu data-testid="nav-menu">
      {MAIN_NAV_LINKS.map(({ label, path }) => (
        <StyledNavLink to={path} key={label}>
          {t(label)}
        </StyledNavLink>
      ))}
    </StyledNavMenu>
  );
};
