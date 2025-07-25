import Button, { ButtonProps } from '@mui/material/Button';
import Link, { LinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import { LinkProps as RouterLinkProps } from 'react-router-dom';

export const StyledNavButton = styled(Button)<ButtonProps & RouterLinkProps>(
  () => ({
    paddingBlock: '12px',
    borderRadius: '8px',
    minWidth: 'max-content',
  }),
);

export const StyledButtonContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 16,
}));

export const StyledNavContainer = styled('nav')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 4,
  width: '100%',
}));

export const StyledLink = styled(Link)<LinkProps & RouterLinkProps>(
  ({ theme: { palette } }) => ({
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 400,
    color: palette.common.black,
    '&.active': {
      color: palette.primary.dark,
      fontWeight: 500,
    },
    '&:hover': {
      textDecoration: 'none',
      color: palette.primary.main,
    },
  }),
);
