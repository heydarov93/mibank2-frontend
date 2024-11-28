import { styled, Box } from '@mui/material';

export const StyledBoxContainer = styled(Box)(
  ({ theme: { spacing, breakpoints } }) => ({
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    flexBasis: '70%',
    paddingTop: spacing(10),
    backgroundColor: 'white',
    [breakpoints.down('sm')]: {
      paddingTop: spacing(0),
    },
  }),
);
