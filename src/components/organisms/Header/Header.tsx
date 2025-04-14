import {
  StyledBox,
  StyledHeader,
  StyledLink,
  StyledPersonalMenuContainer,
} from './Header.styled';
import { NavMenu } from './NavMenu';
import { PersonalMenu } from './PersonalMenu';
import { TopNavbar } from './TopNavbar';

import { Logo } from 'components/atoms';
import { Drawer } from 'components/organisms';

export const Header = () => {
  return (
    <>
      <TopNavbar />
      <StyledHeader>
        <StyledBox>
          <StyledLink to="/">
            <Logo />
          </StyledLink>
          <NavMenu />
        </StyledBox>
        <StyledPersonalMenuContainer>
          <PersonalMenu />
          <Drawer />
        </StyledPersonalMenuContainer>
      </StyledHeader>
    </>
  );
};
