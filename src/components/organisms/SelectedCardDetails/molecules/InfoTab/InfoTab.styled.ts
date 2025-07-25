import { Box, styled } from "@mui/material";

export const StyledInfoSection = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: spacing(3),
}));
