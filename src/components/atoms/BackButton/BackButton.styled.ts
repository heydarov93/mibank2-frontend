import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const StyledButton = styled(Button)(
  ({ theme: { breakpoints, spacing } }) => ({
    minWidth: 50,
    width: 50,
    height: 50,
    padding: 0,
    borderRadius: '50%',
    position: 'absolute',
    top: spacing(2.5),
    left: spacing(2.5),

    [breakpoints.up('sm')]: {
      top: spacing(5),
      left: spacing(5),
    },

    [breakpoints.up('lg')]: {
      top: spacing(7.5),
      left: spacing(10),
    },
  }),
);
