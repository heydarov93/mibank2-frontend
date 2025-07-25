import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledSearchContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '44px',
  gap: spacing(3),
}));
