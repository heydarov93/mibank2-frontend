import IconButton from '@mui/material/IconButton';
import Link, { LinkProps } from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { LinkProps as RouterLinkProps } from 'react-router-dom';

export const StyledIconButton = styled(IconButton)(
  ({ theme: { spacing, palette } }) => ({
    width: '24px',
    height: '24px',
    padding: spacing(1),
    backgroundColor: palette.primary.main,
    color: palette.common.white,
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  }),
);

export const StyledLink = styled(Link)<LinkProps & RouterLinkProps>(
  ({ theme: { palette, spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing(0.5),
    width: 'max-content',
    color: palette.grey[500],
    textDecoration: 'none',
  }),
);

export const StyledTitle = styled(Typography)(() => ({
  fontFamily: 'inherit',
  fontSize: '26px',
  fontWeight: 600,
  width: 'max-content',
}));

export const StyledTopContainer = styled('div')(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: spacing(4),
}));
