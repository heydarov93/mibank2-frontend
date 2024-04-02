import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const StyledNavMenu = styled(Box)(({ theme: { spacing, palette } }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',

  '& a:last-child': {
    borderLeft: `solid 1px ${palette.grey[100]}`,
  },
}));

export const StyledNavLink = styled(Link)(
  ({ theme: { spacing, palette } }) => ({
    textDecoration: 'none',
    padding: spacing(1, 3.5),
    margin: spacing(0.5, 0),
    color: palette.common.black,
  }),
);
