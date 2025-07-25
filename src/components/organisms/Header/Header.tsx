import {
  StyledBox,
  StyledHeader,
  StyledLink,
  StyledPersonalMenuContainer,
} from './Header.styled';
import { NavMenu, PersonalMenu } from './molecules';

import { Logo } from 'components/atoms';
import { SideNavDrawer } from 'components/organisms';
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
        <SideNavDrawer />
      </StyledPersonalMenuContainer>
    </StyledHeader>
  );
};
