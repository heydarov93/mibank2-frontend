import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledLoadingBox = styled(Box)(({ theme: { palette } }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',

  // TODO: Remove '!important' overrides if a cleaner solution is found.
  '& .MuiCircularProgress-root': {
    width: '100px !important',
    height: '100px !important',
    color: palette.primary.dark,
  },
}));
