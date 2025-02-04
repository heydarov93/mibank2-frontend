import { Box, styled, Typography } from '@mui/material';

export const MainContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
}));

export const StyledHeader = styled(Typography)(({ theme: { typography } }) => ({
  fontFamily: typography.mediumLogo?.fontFamily,
  fontWeight: '500',
  fontSize: '32px',
  lineHeight: '37.5px',
}));

export const InputLabel = styled(Typography)(({ theme: { typography } }) => ({
  fontFamily: typography.mediumLogo?.fontFamily,
  fontWeight: '500',
  fontSize: typography.mediumLogo?.fontSize,
  lineHeight: '20px',
}));
