import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledFlexRow = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(1),
}));
