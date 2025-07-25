import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const StyledSidebar = styled(Box)(({ theme: { palette } }) => ({
  backgroundColor: palette.primary.dark,
  minWidth: '520px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
}));

export const StyledLogoContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledLogo = styled(Box)(({ theme: { spacing, palette } }) => ({
  backgroundColor: palette.common.white,
  width: '60px',
  height: '60px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: spacing(1.25),
}));

export const StyledLogoText = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.common.white,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '20px',
    letterSpacing: '0.25px',
    fontWeight: 400,
  }),
);
