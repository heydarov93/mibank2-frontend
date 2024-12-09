import { Box, styled } from '@mui/material';

export const PageWrapper = styled(Box)(
  ({ theme: { palette, breakpoints, spacing } }) => ({
    display: 'flex',
    flex: 1,
    color: palette.common.black,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: palette.common.white,
    [breakpoints.down(600)]: {
      flexDirection: 'column',
    },
  }),
);
