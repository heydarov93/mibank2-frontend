import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

import {
  StyledContainer,
  StyledSidebarContainer,
} from './BackOfficePage.styled';

import { BackOfficeSidebar } from 'components/organisms';

export const BackOfficePage = () => {
  return (
    <StyledContainer>
      <StyledSidebarContainer>
        <BackOfficeSidebar />
      </StyledSidebarContainer>
      <Box width="75%">
        <Outlet />
      </Box>
    </StyledContainer>
  );
};
