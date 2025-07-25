import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const MainContainer = styled(Box)(({ theme: { palette } }) => ({
  display: 'flex',
  padding: '32px',
  border: `1px solid ${palette.success.main}`,
  borderRadius: '8px',
  justifyContent: 'space-evenly',
  backgroundColor: palette.common.white,
  zIndex: '10',
  width: '532px',
  height: '124px',
}));

export const StyledHeader = styled(Typography)(({ theme: { typography } }) => ({
  fontSize: '24px',
  fontFamily: typography.mediumLogo?.fontFamily,
  lineHeight: '28px',
  fontWeight: '600',
  marginBottom: '8px',
}));

export const SecondaryText = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    fontSize: '16px',
    color: palette.grey[400],
    lineHeight: '24px',
  }),
);

export const StyledBackButton = styled(Button)(
  ({ theme: { spacing, typography } }) => ({
    width: '140px',
    height: '48px',
    borderRadius: '8px',
    padding: spacing(1, 3),
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '100%',
    letterSpacing: 0,
  }),
);

export const StyledButtonsRow = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  gap: spacing(1.5),
  marginTop: spacing(2),
}));
