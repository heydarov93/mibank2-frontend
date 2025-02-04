import { Box, styled, Typography } from '@mui/material';

export const MainContainer = styled(Box)(({ theme: { palette } }) => ({
  display: 'flex',
  padding: '32px',
  border: `1px solid ${palette.success.main}`,
  borderRadius: '8px',
  gap: '12px',
}));

export const StyledHeader = styled(Typography)(({ theme: { typography } }) => ({
  fontSize: '24px',
  fontFamily: typography.mediumLogo?.fontFamily,
  lineHeight: '28px',
  fontWeight: '600',
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
