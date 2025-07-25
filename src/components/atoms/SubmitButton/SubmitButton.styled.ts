import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const StyledButton = styled(Button)(
  ({ theme: { palette, breakpoints, spacing } }) => ({
    fontSize: '16px',
    padding: spacing(1.5, 3),
    height: '43px',
    borderRadius: '8px',

    '&.Mui-disabled': {
      opacity: '0.65',
      color: palette.common.white,
      background: palette.primary.main,
    },

    [breakpoints.up('sm')]: {
      padding: spacing(1.25, 3),
      height: '56px',
    },
  }),
);
