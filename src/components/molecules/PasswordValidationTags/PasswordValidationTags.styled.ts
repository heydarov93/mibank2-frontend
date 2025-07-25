import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(0.5),
  flexWrap: 'wrap',
  paddingBlock: spacing(0.5),
}));
