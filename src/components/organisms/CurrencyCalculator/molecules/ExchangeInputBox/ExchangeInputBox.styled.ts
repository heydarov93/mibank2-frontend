import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const StyledInputContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    padding: spacing(2),
    border: `1px solid ${palette.border.lightBlue}`,
    borderRadius: spacing(1),
    boxShadow: `0px 4px 24px 0px ${palette.shadow.shadowLight}`,
  }),
);

export const StyledInputRow = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: spacing(2),
}));

export const StyledInputLabel = styled(Typography)(
  ({ theme: { palette, typography, spacing } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: typography.mediumLogo?.fontSize,
    fontWeight: 400,
    color: palette.grey[400],
    marginBottom: spacing(2),
  }),
);
