import { useTranslation } from 'react-i18next';

import { StyledNavLink, StyledNavMenu } from './NavMenu.styled';

import { navMenuLinks } from 'constants/navigation';

export const NavMenu = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'header.navMenu' });

  return (
    <StyledNavMenu data-testid="nav-menu">
      {navMenuLinks.map(({ content, path }) => (
        <StyledNavLink to={path} key={content}>
          {t(content)}
        </StyledNavLink>
      ))}
    </StyledNavMenu>
  );
};
