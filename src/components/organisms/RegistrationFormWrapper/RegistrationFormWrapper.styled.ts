import { styled, Box } from '@mui/material';

export const StyledBoxContainer = styled(Box)(
  ({ theme: { spacing, palette, breakpoints } }) => ({
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    flexBasis: '70%',
    justifyContent: 'center',
    paddingLeft: spacing(6),
    paddingRight: spacing(6),
    paddingTop: spacing(12),
    paddingBottom: spacing(6),
    backgroundColor: palette.common.white,
    [breakpoints.down('sm')]: {
      paddingTop: spacing(2),
    },
  }),
);
