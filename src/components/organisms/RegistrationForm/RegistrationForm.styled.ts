import { Box, styled } from '@mui/material';

import { createComponentWithDefaultBreakpoints } from 'constants/defaultBreakpointsStyle';

export const StyledActionsWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
}));

export const StyledContentContainer = createComponentWithDefaultBreakpoints(Box);
