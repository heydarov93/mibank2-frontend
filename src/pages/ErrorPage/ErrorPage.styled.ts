import { Box, styled } from '@mui/material';

export const ErrorPageWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

export const StyledBox = styled(Box)(({ theme: { spacing } }) => ({
  padding: spacing(2),
}));
