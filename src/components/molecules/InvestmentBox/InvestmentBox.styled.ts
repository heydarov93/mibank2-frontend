import { Box, styled, Typography } from '@mui/material';

export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    backgroundColor: palette.common.white,
    borderRadius: spacing(1),
    padding: spacing(5, 6),
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(4),
    minWidth: '416px',
  }),
);

export const PrimaryText = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '24px',
    fontWeight: 600,
    color: palette.common.black,
  }),
);

export const SecondaryText = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '16px',
    fontWeight: 400,
    color: palette.grey[400],
  }),
);
