import { Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledHeader = styled('header')(
  ({ theme: { palette, spacing } }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: palette.common.white,
    padding: spacing(3, 4),
    boxShadow: `0px 2px 8px 0px ${palette.grey[200]}`,
  }),
);

export const StyledHeaderContent = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));
