import { Box, styled } from '@mui/material';

export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    backgroundColor: palette.primary.light,
    minHeight: '100dvh',
    padding: spacing(9),
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(9),
  }),
);
