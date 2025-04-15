import { Box, styled, Typography } from '@mui/material';

export const StepsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  maxWidth: '520px',
  marginLeft: '50px',
}));

export const StepsRowContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 95px 32px 0px',
}));

export const StepsHeader = styled(Box)(({ theme: { typography } }) => ({
  fontFamily: typography.mediumLogo?.fontFamily,
  fontWeight: 500,
  fontSize: '40px',
  letterSpacing: 0,
}));

export const StepsFooterText = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.grey[400],
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: '125%',
    letterSpacing: 0,
    width: '470px',
  }),
);
