import { Box, styled } from "@mui/material";

export const StyledSearchContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '44px',
  gap: spacing(3),
}));
