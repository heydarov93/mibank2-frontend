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

    '&.Mui-disabled': {
      opacity: '0.65',
      color: palette.common.white,
      background: palette.primary.main,
    },

    [breakpoints.up('sm')]: {
      padding: '10px 22px',
      height: '56px',
    },
  }),
);
