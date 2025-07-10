import { Box, styled } from '@mui/material';

export const StyledFlexRow = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(1),
}));
