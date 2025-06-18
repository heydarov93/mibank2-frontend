import { Box, styled } from '@mui/material';

export const StyledContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(0.5),
  flexWrap: 'wrap',
  paddingBlock: spacing(0.5),
}));
