import { Box, styled } from '@mui/material';

export const UnderDevPageWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh',
}));

export const StyledBox = styled(Box)(({ theme: { spacing } }) => ({
  padding: spacing(2),
}));
