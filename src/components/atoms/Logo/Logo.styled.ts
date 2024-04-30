import { Box, styled } from '@mui/material';

export const StyledLogoContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(1),
}));

export const StyledLogoNameContainer = styled(Box)(
  ({ theme: { palette } }) => ({
    maxWidth: '70px',
    color: palette.common.black,
  }),
);

export const StyledLogo = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));
