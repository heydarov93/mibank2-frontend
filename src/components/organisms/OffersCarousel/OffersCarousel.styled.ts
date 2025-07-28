import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export const StyledCarouselContainer = styled(Box)(() => ({
  position: 'relative',
  height: '197px',
}));

export const StyledStack = styled(Stack)(({ theme: { palette, spacing } }) => ({
  color: palette.error.main,
  gap: spacing(1),
  alignItems: 'center',
}));
