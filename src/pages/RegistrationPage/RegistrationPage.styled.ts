import { Box, styled } from '@mui/material';

export const PageWrapper = styled(Box)(
  ({ theme: { palette, breakpoints } }) => ({
    display: 'flex',
    flex: 1,
    color: palette.common.black,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: '#1847C1',

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  }),
);
