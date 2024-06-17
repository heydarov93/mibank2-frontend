import { Box, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const StyledNavMenu = styled(Box)(
  ({ theme: { palette, breakpoints } }) => ({
    display: 'none',
    justifyContent: 'start',
    alignItems: 'center',
    [breakpoints.up('md')]: {
      display: 'flex',
    },
  }),
);

export const StyledNavLink = styled(NavLink)(
  ({ theme: { spacing, palette } }) => ({
    textDecoration: 'none',
    fontWeight: '400',
    padding: spacing(1, 3.5),
    margin: spacing(0.5, 0),
    color: palette.common.black,
    '&.active': {
      color: palette.primary.dark,
      fontWeight: '500',
    },
    ':hover': {
      color: palette.primary.main,
    },
  }),
);
