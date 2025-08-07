import { Breakpoints, styled } from '@mui/material';

import {
  DEFAULT_BREAKPOINT_KEYS,
  DEFAULT_BREAKPOINT_WIDTHS,
} from 'constants/ui/layout';

export const getDefaultBreakpointsStyle = (breakpoints: Breakpoints) => ({
  width: DEFAULT_BREAKPOINT_WIDTHS.BASE,

  [breakpoints.up(DEFAULT_BREAKPOINT_KEYS.sm)]: {
    width: DEFAULT_BREAKPOINT_WIDTHS.SM,
  },

  [breakpoints.up(DEFAULT_BREAKPOINT_KEYS.md)]: {
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
