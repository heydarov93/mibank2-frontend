import { Box, styled } from '@mui/material';

export const PageWrapper = styled(Box)(({ theme: { palette } }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  color: palette.common.black,
}));

export const StyledBoxContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 768,
}));
