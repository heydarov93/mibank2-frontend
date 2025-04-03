import { Box, styled, Typography } from '@mui/material';

export const MainContainer = styled(Box)(({ theme: { palette } }) => ({
  display: 'flex',
  padding: '32px',
  border: `1px solid ${palette.error.main}`,
  borderRadius: '8px',
  justifyContent: 'space-between',
  backgroundColor: palette.common.white,
  zIndex: '10',
  width: '532px',
  height: '124px',
}));

export const StyledHeader = styled(Typography)(({ theme: { typography } }) => ({
  fontSize: '24px',
  fontFamily: typography.mediumLogo?.fontFamily,
  lineHeight: '28px',
  fontWeight: 600,
  marginBottom: '8px',
}));

export const SecondaryText = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    fontSize: '16px',
    color: palette.grey[400],
    lineHeight: '24px',
  }),
);

export const StyledIcon = styled(Box)(({ theme: { palette, spacing } }) => ({
  height: spacing(6),
  width: spacing(6),
  padding: spacing(1),
  backgroundColor: palette.error.light,
  borderRadius: spacing(1),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));