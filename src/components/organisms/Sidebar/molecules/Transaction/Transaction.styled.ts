import { styled, Typography } from '@mui/material';

export const StyledContainer = styled('div')(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: spacing(1),
}));

export const StyledTopRow = styled('div')(({ theme: { palette } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  fontFamily: 'Inter',
  fontSize: 16,
  fontWeight: 500,
  color: palette.common.black,
}));

export const StyledBtmRow = styled('div')(({ theme: { palette } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  fontFamily: 'Roboto',
  fontSize: 14,
  fontWeight: 400,
  color: palette.grey[400],
}));

export const StyledTypography = styled(Typography)(() => ({
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  color: 'inherit',
}));
