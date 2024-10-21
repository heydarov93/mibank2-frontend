import { styled, Box, Link } from '@mui/material';

export const StyledButtonLinkContainer = styled(Box)(
  ({ theme: { breakpoints, palette } }) => ({
    display: 'flex',
    paddingTop: 39,
    fontSize: 16,
    fontWeight: 400,
    color: palette.common.black,

    [breakpoints.up('sm')]: {
      paddingTop: 31,
    },
  }),
);

export const StyledButtonLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'shake' && prop !== 'delay',
})<{ shake?: boolean; delay?: number }>(({ shake, delay, theme }) => ({
  paddingLeft: 8,
  fontWeight: 500,
  textDecoration: 'underline',
  color: theme.palette.primary.main,
  animation: shake ? `${theme.animations?.shake} 0.25s` : 'none',
  animationDelay: `${delay || 0}s`,
  animationIterationCount: '1',
}));
