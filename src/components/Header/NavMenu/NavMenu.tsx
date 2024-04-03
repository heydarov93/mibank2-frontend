import { useTranslation } from 'react-i18next';
import { navMenuLinks } from './constants';
import { StyledNavLink, StyledNavMenu } from './NavMenu.styled';

export const NavMenu = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'header.navMenu' });

  return (
    <StyledNavMenu>
      {navMenuLinks.map(({ content, path }) => (
        <StyledNavLink to={path} key={content}>{t(content)}</StyledNavLink>
      ))}
    </StyledNavMenu>
  );
};
