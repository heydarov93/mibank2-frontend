import { Box, styled } from '@mui/material';

export const StyledLogoContainer = styled(Box)<{ isMedium: boolean }>(
  ({ theme: { spacing }, isMedium }) => ({
    display: 'flex',
    flexDirection: isMedium ? 'column' : 'row',
    alignItems: 'center',
    gap: spacing(1),
  }),
);

export const StyledLogoNameContainer = styled(Box)<{ isSmall: boolean }>(
  ({ theme: { palette }, isSmall }) => ({
    color: palette.common.black,
    ...(isSmall && {
      maxWidth: '70px',
    }),
  }),
);

export const StyledLogo = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSmall',
})<{ isSmall: boolean }>(({ isSmall }) => {
  return {
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      width: isSmall ? '36px' : '75px',
      height: isSmall ? '36px' : '75px',
    },
  };
});
