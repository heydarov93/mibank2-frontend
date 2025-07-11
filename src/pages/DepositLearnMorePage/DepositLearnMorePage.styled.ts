import { Box, styled } from '@mui/material';

export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    backgroundColor: palette.primary.light,
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    padding: spacing(6.25, 9, 15, 9),
    gap: spacing(14),
  }),
);
