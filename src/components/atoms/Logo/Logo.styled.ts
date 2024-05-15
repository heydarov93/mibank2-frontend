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

export const StyledLogo = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSmall',
})<{ isSmall: boolean }>(({ isSmall }) => {
  return {
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      width: isSmall ? '35px' : '50px',
      height: isSmall ? '35px' : '50px',
    },
  };
});
