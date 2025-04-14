import { Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledHeader = styled('header')(
  ({ theme: { palette, spacing, breakpoints } }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: palette.common.white,
    padding: spacing(0.5, 2),
    // boxShadow: `0px 2px 8px 0px ${palette.grey[200]}`,

    [breakpoints.up('sm')]: {
      padding: spacing(0.25, 4),
    },
  }),
);

export const StyledBox = styled(Box)(({ theme: { spacing, breakpoints } }) => ({
  display: 'flex',
  gap: spacing(2),
  alignItems: 'center',

  [breakpoints.up('lg')]: {
    gap: spacing(8),
  },
}));

export const StyledHeaderContent = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
}));

export const StyledPersonalMenuContainer = styled(Box)(
  ({ theme: { breakpoints, spacing } }) => ({
    display: 'flex',
    gap: spacing(0.5),
    alignItems: 'center',

    [breakpoints.up('md')]: {
      gap: spacing(2.5),
    },
  }),
);

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));
