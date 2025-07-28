import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const MainContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: spacing(4),
}));

export const StyledContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: spacing(3),
}));

export const StyledHeader = styled(Typography)(
  ({ theme: { palette, typography, spacing } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: spacing(5),
    fontWeight: 500,
    color: palette.common.black,
  }),
);
