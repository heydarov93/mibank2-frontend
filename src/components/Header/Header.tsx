import { Logo } from '../atoms/Logo';

import {
  StyledBox,
  StyledHeader,
  StyledLink,
  StyledPersonalMenuContainer,
} from './Header.styled';
import { NavMenu } from './NavMenu';
import { PersonalMenu } from './PersonalMenu';

import Drawer from 'components/organisms/Drawer/Drawer';

export const Header = () => {
  return (
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
  );
};
