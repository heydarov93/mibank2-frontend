import { Box, styled } from '@mui/material';

export const StyledContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'blur',
})<{ blur?: boolean }>(({ blur, theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(3),
  padding: spacing(4, 5, 2.5, 2.5),
  filter: blur ? 'blur(4px)' : 'none',
  position: 'relative',
  top: 0,
  left: 0,
}));
