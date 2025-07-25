import { Box, FormControlLabel, styled, Typography } from "@mui/material";

export const StyledFormControlLabel = styled(FormControlLabel)(
  ({ theme: { palette } }) => ({
    border: `1px solid ${palette.grey[100]}`,
    width: '100%',
    margin: '0',
    padding: '4px 10px 4px 0',
  }),
);

export const StyledLabel = styled(Typography)(({ theme: { typography } }) => ({
  fontSize: typography.mediumLogo?.fontSize,
  fontFamily: typography.mediumLogo?.fontFamily,
  fontWeight: '500',
}));

export const StyledHeaderBox = styled(Box)(({ theme: { palette } }) => ({
  border: `1px solid ${palette.grey[100]}`,
  width: '100%',
  margin: '0',
  padding: '8px 12px',
}));
