import { Box, styled } from '@mui/material';

export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    backgroundColor: palette.primary.light,
    padding: spacing(5),
    paddingTop: spacing(3.75),
    paddingBottom: '76px',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(8),
  }),
);
