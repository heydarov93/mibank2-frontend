import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledHeader = styled('header')(() => ({
  position: 'fixed',
  width: '100%',
  height: '120px',
}));

export const StyledContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(6),
  paddingInline: spacing(4),
  paddingTop: spacing(2),
}));
