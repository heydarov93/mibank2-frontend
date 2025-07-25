import { Box, styled } from '@mui/material';

export const PageWrapper = styled(Box)(
  ({ theme: { palette, breakpoints, spacing } }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    color: palette.common.black,
    marginTop: spacing(4),
    marginBottom: spacing(8),
    [breakpoints.down('sm')]: {
      marginTop: spacing(11),
      marginBottom: spacing(10),
    },
  }),
);

export const StyledBoxContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: spacing(96),
}));
