import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

export const StyledDrawerContainer = styled(Box)(
  ({ theme: { breakpoints } }) => ({
    display: 'block',

    [breakpoints.up('md')]: {
      display: 'none',
    },
  }),
);

export const StyledListItemButton = styled(NavLink)(
  ({ theme: { palette } }) => ({
    textDecoration: 'none',
    fontWeight: '400',
    color: palette.common.black,
    '&.active': {
      color: palette.primary.dark,
    },

    '&.active .MuiSvgIcon-root': {
      color: palette.primary.dark,
    },
  }),
);

export const StyledUserCardContainer = styled(Box)(
  ({ theme: { spacing } }) => ({
    padding: spacing(1.5, 0.5),
  }),
);
