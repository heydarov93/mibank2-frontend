import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacing(2),
  maxWidth: '1030px',
  minWidth: '1030px',
}));
