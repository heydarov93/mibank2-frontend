import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const MainContainer = styled(Box)(({ theme: { palette, spacing } }) => ({
  display: 'flex',
  padding: spacing(4),
  border: `1px solid ${palette.error.main}`,
  borderRadius: '8px',
  justifyContent: 'space-between',
  backgroundColor: palette.common.white,
  zIndex: '10',
  width: '532px',
  height: '124px',
}));

export const StyledHeader = styled(Typography)(
  ({ theme: { typography, spacing } }) => ({
    fontSize: '24px',
    fontFamily: typography.mediumLogo?.fontFamily,
    lineHeight: '28px',
    fontWeight: 600,
    marginBottom: spacing(1),
  }),
);

export const SecondaryText = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    fontSize: '16px',
    color: palette.grey[400],
    lineHeight: '24px',
  }),
);

export const StyledIcon = styled(Box)(({ theme: { palette, spacing } }) => ({
  height: spacing(6),
  width: spacing(6),
  padding: spacing(1),
  backgroundColor: palette.error.light,
  borderRadius: spacing(1),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StyledBackButton = styled(Button)(
  ({ theme: { spacing, typography } }) => ({
    width: '110px',
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
}));
