import { Box, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const StyledNavMenu = styled(Box)(
  ({ theme: { palette, breakpoints } }) => ({
    display: 'none',
    justifyContent: 'start',
    alignItems: 'center',

    '& a:last-child': {
      borderLeft: `solid 1px ${palette.grey[100]}`,
    },

    [breakpoints.up('lg')]: {
      display: 'flex',
    },
  }),
);

export const StyledNavLink = styled(NavLink)(
  ({ theme: { spacing, palette } }) => ({
    textDecoration: 'none',
    fontWeight: '500',
    padding: spacing(1, 3.5),
    margin: spacing(0.5, 0),
    color: palette.common.black,
    '&.active': {
      color: palette.primary.dark,
    },
    ':hover': {
      color: palette.primary.main,
    },
  }),
);
