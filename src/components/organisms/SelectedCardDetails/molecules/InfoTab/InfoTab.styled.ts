import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledInfoSection = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: spacing(3),
}));
