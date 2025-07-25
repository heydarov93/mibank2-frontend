import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledPageWrapper = styled(Box)(
  ({ theme: { palette, breakpoints } }) => ({
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
