import { styled, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledButtonLinkContainer = styled(Box)(
  ({ theme: { palette } }) => ({
    display: 'flex',
    fontSize: 16,
    fontWeight: 400,
    color: palette.common.black,
  }),
);

export const StyledButtonLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'shake' && prop !== 'delay',
})<{ shake?: boolean; delay?: number }>(({ shake, delay, theme }) => ({
  fontWeight: 500,
  textDecoration: 'underline',
  color: theme.palette.primary.main,
  animation: shake ? `${theme.animations?.shake} 0.25s` : 'none',
  animationDelay: `${delay || 0}s`,
  animationIterationCount: '1',
}));
