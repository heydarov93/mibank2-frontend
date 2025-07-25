import { Alert, Link, styled } from '@mui/material';

export const StyledAlert = styled(Alert)(({ theme: { palette } }) => ({
  width: '100%',
  backgroundColor: palette.error.light,
  color: palette.error.main,
}));

export const StyledLink = styled(Link)(({ theme: { palette } }) => ({
  cursor: 'pointer',
  textDecoration: 'none',
  color: palette.primary.dark,
}));
