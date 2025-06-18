import { styled, Typography, Box } from '@mui/material';

import { defaultBreakpointsStyle } from 'constants/defaultBreakpointsStyle';

export const StyledForm = defaultBreakpointsStyle;

export const StyledFormContent = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: spacing(2),
  width: '100%',
}));

export const StyledFormTitle = styled(Typography)(
  ({ theme: { spacing, breakpoints } }) => ({
    marginBlock: spacing(6, 3),
    fontSize: 20,
    fontWeight: 500,

    [breakpoints.up('sm')]: {
      marginBlock: spacing(5, 2),
      fontSize: 32,
      fontWeight: 400,
    },

    [breakpoints.up('md')]: {
      marginTop: spacing(2.25),
    },
  }),
);
