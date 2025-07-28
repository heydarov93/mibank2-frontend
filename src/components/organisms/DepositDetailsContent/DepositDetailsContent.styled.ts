import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    backgroundColor: palette.primary.light,
    padding: spacing(5),
    paddingTop: spacing(3.75),
    paddingBottom: '76px',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(8),
  }),
);
