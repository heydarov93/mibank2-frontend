import { Box, styled, Typography } from '@mui/material';

export const MainContainer = styled(Box)(({ theme: { palette, spacing } }) => ({
  backgroundColor: palette.primary.light,
  borderRadius: spacing(1),
  minWidth: '1054px',
  padding: spacing(5),
}));

export const StyledHeader = styled(Typography)(
  ({ theme: { palette, typography, spacing } }) => ({
    color: palette.common.black,
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: spacing(4),
  }),
);
