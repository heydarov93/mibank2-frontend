import { Box, styled, Typography } from '@mui/material';

export const StyledContainer = styled(Box)(({ theme: { spacing } }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  height: 'auto',
  padding: spacing(5),
}));

export const StyledTitle = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: '125%',
    textAlign: 'center',
    color: palette.common.black,
  }),
);

export const StyledFormLabel = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.1px',
    color: palette.common.black,
  }),
);
