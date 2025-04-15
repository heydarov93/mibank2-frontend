import { Box, styled } from '@mui/material';

export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    backgroundColor: palette.primary.light,
    minHeight: '100dvh',
    padding: "64px 72px 120px 72px",
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(14),
  }),
);
