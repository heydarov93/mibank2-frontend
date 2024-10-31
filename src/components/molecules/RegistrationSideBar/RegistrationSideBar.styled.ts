import { Box, styled } from '@mui/material';

export const StyledBoxContainer = styled(Box)(
  ({ theme: { spacing, breakpoints } }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '30%',
    backgroundColor: '#1847C1',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingTop: spacing(6),
      paddingBottom: spacing(6),
    },
  }),
);
