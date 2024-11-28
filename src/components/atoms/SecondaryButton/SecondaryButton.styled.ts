import { Box, Button, styled } from '@mui/material';

export const StyledButtonContainer = styled(Box)(
  ({ theme: { breakpoints, spacing } }) => ({
    paddingTop: spacing(3),

    [breakpoints.up('sm')]: {
      paddingTop: spacing(2),
    },
  }),
);

export const StyledButton = styled(Button)(
  ({ theme: { palette, breakpoints } }) => ({
    fontSize: '16px',
    padding: '12px 22px',
    height: '43px',
    borderRadius: '8px',
    '&:hover': {
      borderColor: palette.primary.dark,
      color: palette.primary.dark,
      backgroundColor: palette.common.white,
    },
    '&:active': {
      borderColor: palette.primary.dark,
      color: palette.common.white,
      backgroundColor: palette.primary.dark,
    },

    '&.Mui-disabled': {
      opacity: '0.65',
      borderColor: palette.primary.main,
      color: palette.primary.main,
      background: palette.common.white,
    },

    [breakpoints.up('sm')]: {
      padding: '10px 22px',
      height: '56px',
    },
  }),
);
