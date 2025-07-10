import { Box, styled, Typography } from '@mui/material';

export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    position: 'relative',
    width: '100%',
    height: '100dvh',
    backgroundColor: palette.primary.main,
    padding: spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }),
);

export const StyledLogoContainer = styled(Box)(({ theme: { spacing } }) => ({
  position: 'absolute',
  left: spacing(5),
  top: spacing(5),
}));

export const StyledFlexColumn = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing(1.5),
}));

export const StyledTitle = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontSize: '32px',
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.common.white,
  }),
);

export const StyledSecondaryText = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontSize: '16px',
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.common.white,
  }),
);
