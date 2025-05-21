import { Breakpoints, styled } from '@mui/material';

const getDefaultBreakpointsStyle = (breakpoints: Breakpoints) => ({
  width: 275,

  [breakpoints.up('sm')]: {
    width: 375,
  },

  [breakpoints.up('md')]: {
    width: 420,
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
