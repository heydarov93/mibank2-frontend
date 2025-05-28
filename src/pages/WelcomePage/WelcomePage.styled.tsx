import { Box, styled } from '@mui/material';

export const StyledHeader = styled('header')(() => ({
  position: 'fixed',
  width: '100%',
  height: '120px',
}));

export const StyledContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(6),
  paddingInline: spacing(3),
  paddingTop: spacing(2),
}));
