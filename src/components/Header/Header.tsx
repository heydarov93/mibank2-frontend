import { Logo } from '../atoms/Logo';

import { StyledHeader } from './Header.styled';
import { NavMenu } from './NavMenu';
import { PersonalMenu } from './PersonalMenu';

export const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      <NavMenu />
      <PersonalMenu
        // TODO: need delete mock data
        user={{
          firstName: 'Alexandra',
          lastName: 'Vegas',
        }}
      />
    </StyledHeader>
  );
};
