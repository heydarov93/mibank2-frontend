import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const MainContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: spacing(4, 0),
}));

export const StyledHeader = styled(Typography)(({ theme: { typography } }) => ({
  fontFamily: typography.mediumLogo?.fontFamily,
  fontWeight: '500',
  fontSize: '32px',
  lineHeight: '125%',
}));

export const InputLabel = styled(Typography)(({ theme: { typography } }) => ({
  fontFamily: typography.mediumLogo?.fontFamily,
  fontWeight: '500',
  fontSize: typography.mediumLogo?.fontSize,
  lineHeight: '20px',
}));
