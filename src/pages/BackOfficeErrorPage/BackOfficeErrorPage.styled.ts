import { Box, styled, Typography } from '@mui/material';

export const MainContainer = styled(Box)(({ theme: { palette, spacing } }) => ({
  width: '100%',
  height: '100dvh',
  backgroundColor: palette.primary.main,
  padding: spacing(4),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));

export const MainHeader = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontSize: '32px',
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.common.white,
  }),
);

export const SecondaryText = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontSize: '16px',
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.common.white,
  }),
);
