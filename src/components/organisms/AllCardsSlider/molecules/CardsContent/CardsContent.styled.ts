import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export const StyledCardContainer = styled(Box)(() => ({
  transition: 'all 0.3s ease',
  cursor: 'pointer',
}));

export const StyledCardsContainer = styled(Stack)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: spacing(3),
}));
