import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const StyledTableTitle = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontSize: typography.mediumLogo?.fontSize,
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    color: palette.grey[400],
  }),
);
