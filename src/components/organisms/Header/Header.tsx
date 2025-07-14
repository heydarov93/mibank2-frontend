import {
  StyledBox,
  StyledHeader,
  StyledLink,
  StyledPersonalMenuContainer,
} from './Header.styled';
import { NavMenu } from './NavMenu';
import { PersonalMenu } from './PersonalMenu';

import { Logo } from 'components/atoms';
import { Drawer } from 'components/organisms';
import { TO_HOME } from 'constants/navigation/routePaths';

export const Header = () => {
  return (
    <StyledHeader>
      <StyledBox>
        <StyledLink to={TO_HOME}>
          <Logo />
        </StyledLink>
        <NavMenu />
      </StyledBox>
      <StyledPersonalMenuContainer>
        <PersonalMenu />
        <Drawer />
      </StyledPersonalMenuContainer>
    </StyledHeader>
  );
};
