import { Box } from '@mui/material';

import { Logo } from '../atoms/Logo';

import { StyledHeader, StyledLink } from './Header.styled';
import { NavMenu } from './NavMenu';
import { PersonalMenu } from './PersonalMenu';

import Drawer from 'components/organisms/Drawer/Drawer';

export const Header = () => {
  return (
    <StyledHeader>
      <StyledLink to="/">
        <Logo />
      </StyledLink>
      <NavMenu />
      <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <PersonalMenu />
        <Drawer />
      </Box>
    </StyledHeader>
  );
};
