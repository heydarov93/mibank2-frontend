import { Box, styled, Typography } from '@mui/material';

export const StyledContainer = styled(Box)(
  ({ theme: { spacing, palette } }) => ({
    width: '416px',
    minHeight: '276px',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(4),
    padding: spacing(4, 4, 8, 4),
    borderRadius: spacing(1),
    backgroundColor: palette.common.white,
    alignItems: 'center',
  }),
);

export const PrimaryHeader = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontWeight: 600,
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '24px',
    color: palette.common.black,
  }),
);

export const SecondaryText = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontWeight: 400,
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: typography.mediumLogo?.fontFamily,
    color: palette.common.black,
    textAlign: 'center',
  }),
);
