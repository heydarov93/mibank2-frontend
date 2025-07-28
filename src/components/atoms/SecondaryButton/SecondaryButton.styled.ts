import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const StyledButtonContainer = styled(Box)(
  ({ theme: { breakpoints, spacing } }) => ({
    paddingTop: spacing(3),

    [breakpoints.up('sm')]: {
      paddingTop: spacing(2),
    },
  }),
);

export const StyledButton = styled(Button)(
  ({ theme: { palette, breakpoints, spacing } }) => ({
    fontSize: '16px',
    padding: spacing(1.5, 3),
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
      padding: spacing(1.25, 3),
      height: '56px',
      width: '84px',
    },
  }),
);
