import { Box, Stack, styled } from '@mui/material';

export const StyledCardContainer = styled(Box)(() => ({
  transition: 'all 0.3s ease',
  cursor: 'pointer',
}));

export const StyledCardsContainer = styled(Stack)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: spacing(3),
}));
