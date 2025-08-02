import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '95vh',
  flexDirection: 'column',
  gap: spacing(3),
}));

export const StyledImage = styled('img')(({ theme: { palette } }) => ({
  height: '240px',
  width: '240px',
  border: `1px solid ${palette.border.lightBlue}`,
  borderRadius: '8px',
}));
