import { styled } from '@mui/material';

export const defaultBreakpointsStyle = styled('form')(
  ({ theme: { breakpoints } }) => ({
    width: 275,

    [breakpoints.up('sm')]: {
      width: 375,
    },

    [breakpoints.up('md')]: {
      width: 420,
    },
  }),
);
