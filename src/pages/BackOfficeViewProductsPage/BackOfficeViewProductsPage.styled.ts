import { Box, styled } from '@mui/material';

export const MainContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(3),
  padding: spacing(4, 5, 2.5, 2.5),
}));

export const HeaderContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
  height: '44px',
}));
