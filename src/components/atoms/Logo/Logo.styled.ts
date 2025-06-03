import { Box, styled } from '@mui/material';

export const StyledContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(1),
  width: 'min-content',
}));
