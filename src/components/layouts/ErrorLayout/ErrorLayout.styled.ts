import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledPageWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

export const StyledBox = styled(Box)(({ theme: { spacing } }) => ({
  padding: spacing(2),
}));
