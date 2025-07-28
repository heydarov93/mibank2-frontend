import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledButtonsContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 'min(24px, 5%)',
  maxWidth: '1000px',
  marginTop: spacing(6),
  marginInline: 'auto',
}));
