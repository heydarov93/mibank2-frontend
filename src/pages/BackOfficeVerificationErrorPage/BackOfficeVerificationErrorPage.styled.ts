import { Box, styled, Typography } from '@mui/material';

export const StyledContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80dvh',
  gap: spacing(1),
}));

export const StyledTitleText = styled(Typography)(
  ({ theme: { typography } }) => ({
    fontSize: '32px',
    fontFamily: typography.mediumLogo?.fontFamily,
    lineHeight: '37px',
    fontWeight: 500,
    textAlign: 'center',
  }),
);

export const StyledSecondaryText = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontSize: '16px',
    fontFamily: typography.mediumLogo?.fontFamily,
    lineHeight: '24px',
    textAlign: 'center',
    color: palette.grey[400],
  }),
);
