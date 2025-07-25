import { styled, Box } from '@mui/material';

import { createComponentWithDefaultBreakpoints } from 'utils/helpers/breakpointHelpers';

export const StyledBoxContainer = styled(Box)(
  ({ theme: { spacing, palette, breakpoints } }) => ({
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    flexBasis: '70%',
    justifyContent: 'flex-start',
    paddingLeft: spacing(6),
    paddingRight: spacing(6),
    paddingTop: spacing(12),
    paddingBottom: spacing(6),
    backgroundColor: palette.common.white,
    [breakpoints.down('sm')]: {
      paddingTop: spacing(2),
    },
    [breakpoints.down(600)]: {
      paddingTop: spacing(2),
    },
  }),
);

export const StyledActionsWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
}));

export const StyledContentContainer =
  createComponentWithDefaultBreakpoints(Box);
