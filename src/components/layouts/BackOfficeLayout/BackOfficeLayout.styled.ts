import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Box)(() => ({
  display: 'flex',
  minHeight: '100vh',
  height: 'auto',
  width: '100%',
}));

export const StyledSidebarContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    width: '25%',
    backgroundColor: palette.primary.dark,
    padding: spacing(5),
  }),
);
