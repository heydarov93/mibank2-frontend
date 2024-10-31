import { styled, Typography, Box } from '@mui/material';

import { defaultBreakpointsStyle } from 'constants/defaultBreakpointsStyle';

export const StyledBoxContainer = styled(Box)(
  ({ theme: { spacing, breakpoints } }) => ({
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    flexBasis: '70%',
    paddingTop: spacing(12),
    backgroundColor: 'white',
    [breakpoints.down('sm')]: {
      paddingTop: spacing(0),
    },
  }),
);

export const StyledForm = defaultBreakpointsStyle;

export const StyledFormContent = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing(2),
}));

export const StyledLabel = styled('label')(({ theme: { palette } }) => ({
  color: palette.common.black,
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
}));

export const StyledFormTitle = styled(Typography)(
  ({ theme: { spacing, breakpoints } }) => ({
    marginTop: spacing(6),
    marginBottom: spacing(3),

    [breakpoints.up('sm')]: {
      marginTop: spacing(5),
      marginBottom: spacing(2),
      fontSize: 32,
      fontWeight: 500,
    },
    [breakpoints.down('sm')]: {
      marginTop: spacing(1),
      marginBottom: spacing(2),
      fontSize: 24,
      fontWeight: 600,
    },
    [breakpoints.up('md')]: {
      marginTop: '18px',
    },
  }),
);
