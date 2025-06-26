import { Box, styled } from '@mui/material';

export const StyledIconContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  width: 'min-content',
  marginBottom: spacing(4),
}));
