import { Box, styled } from '@mui/material';

import { ReactComponent as BankLogoBoxIcon } from 'assets/icons/Logo.svg';

export const StyledLogoContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMedium',
})<{ isMedium: boolean }>(({ theme: { spacing }, isMedium }) => ({
  display: 'flex',
  flexDirection: isMedium ? 'column' : 'row',
  alignItems: 'center',
  gap: spacing(1),
}));

export const StyledLogoNameContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSmall' && prop !== 'isWhite',
})<{ isSmall: boolean; isWhite: boolean }>(
  ({ theme: { palette }, isSmall, isWhite }) => ({
    color: isWhite ? palette.common.white : palette.common.black,
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

export const StyledIcon = styled(BankLogoBoxIcon, {
  shouldForwardProp: (prop) => prop !== 'isWhite',
})<{ isWhite: boolean }>(({ isWhite }) => {
  return {
    '& path': {
      fill: isWhite ? '#1847C1' : 'white',
    },
    '& rect': {
      fill: isWhite ? 'white' : '#1847C1',
    },
  };
});
