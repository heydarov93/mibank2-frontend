import { Box, styled, Typography } from '@mui/material';

export const MainContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80dvh',
  gap: '8px',
}));

export const TitleText = styled(Typography)(({ theme: { typography } }) => ({
  fontSize: '32px',
  fontFamily: typography.mediumLogo?.fontFamily,
  lineHeight: '37.5px',
  fontWeight: 500,
  textAlign: 'center',
}));

export const SecondaryText = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontSize: '16px',
    fontFamily: typography.mediumLogo?.fontFamily,
    lineHeight: '24px',
    textAlign: 'center',
    color: palette.grey[400],
  }),
);
