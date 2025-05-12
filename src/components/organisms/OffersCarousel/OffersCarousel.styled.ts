import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCarouselContainer = styled(Box)(() => ({
  position: 'relative',
  width: '974px',
  height: '197px',
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  color: theme.palette.error.main,
  gap: '8px',
  alignItems: 'center',
}));
