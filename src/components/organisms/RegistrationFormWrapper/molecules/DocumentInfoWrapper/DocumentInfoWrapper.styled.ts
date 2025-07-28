import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledBoxContainer = styled(Box)(
  ({ theme: { spacing, breakpoints } }) => ({
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    flexBasis: '70%',
    backgroundColor: 'white',
    [breakpoints.down(450)]: {
      paddingTop: spacing(0),
    },
  }),
);
