import { Breakpoints, styled } from '@mui/material';

import { DEFAULT_BREAKPOINT_WIDTHS } from 'constants/breakpoints';



export const getDefaultBreakpointsStyle = (breakpoints: Breakpoints) => ({
  width: DEFAULT_BREAKPOINT_WIDTHS.BASE,

  [breakpoints.up('sm')]: {
    width: DEFAULT_BREAKPOINT_WIDTHS.SM,
  },

  [breakpoints.up('md')]: {
    width: DEFAULT_BREAKPOINT_WIDTHS.MD,
  },
});

export const defaultBreakpointsStyle = styled('form')(
  ({ theme: { breakpoints } }) => getDefaultBreakpointsStyle(breakpoints),
);

export const createComponentWithDefaultBreakpoints = <T extends React.FC>(
  Component: T,
) =>
  styled(Component)(({ theme: { breakpoints } }) =>
    getDefaultBreakpointsStyle(breakpoints),
  );
