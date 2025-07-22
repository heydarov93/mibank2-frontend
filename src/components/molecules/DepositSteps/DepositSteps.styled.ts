import { Box, styled, Typography } from '@mui/material';

export const StepsContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  maxWidth: '474px',
  padding: spacing(5),
  paddingBottom: '0px',
}));

export const StepsRowContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: spacing(4, 0),
}));

export const StepsHeader = styled(Box)(({ theme: { typography } }) => ({
  fontFamily: typography.mediumLogo?.fontFamily,
  fontWeight: 500,
  fontSize: '32px',
  lineHeight: '125%',
  letterSpacing: 0,
}));

export const StepsFooterText = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.grey[400],
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '125%',
    letterSpacing: 0,
  }),
);
