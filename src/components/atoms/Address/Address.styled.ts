import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";


export const StyledTypography = styled(Typography)(
  ({ theme: { palette } }) => ({
    color: palette.grey[400],
    lineHeight: 1.5,
  }),
);

export const StyledButton = styled(Box)(({ theme: { palette } }) => ({
  textDecoration: 'underline',
  color: palette.primary.dark,
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 500,
}));
