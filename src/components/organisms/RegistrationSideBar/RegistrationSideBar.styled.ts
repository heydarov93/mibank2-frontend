import { Box, styled } from '@mui/material';

export const StyledBoxContainer = styled(Box)(
  ({ theme: { spacing, breakpoints } }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '30%',
    backgroundColor: '#1847C1',
    [breakpoints.down(600)]: {
      flexDirection: 'column',
      paddingTop: spacing(8),
      paddingBottom: spacing(8),
    },
  }),
);
