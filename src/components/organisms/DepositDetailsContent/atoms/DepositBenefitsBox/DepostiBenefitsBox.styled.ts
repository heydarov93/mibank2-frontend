import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Box)(
  ({ theme: { spacing, palette } }) => ({
    maxWidth: '310px',
    minHeight: '312px',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(4),
    padding: spacing(3),
    borderRadius: spacing(1),
    backgroundColor: palette.common.white,
    textAlign: 'left',
    boxShadow: `0px 4px 24px 0px ${palette.shadow.shadowLight}`,
  }),
);

export const PrimaryHeader = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontWeight: 600,
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '24px',
    color: palette.common.black,
  }),
);

export const SecondaryText = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontWeight: 400,
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: typography.mediumLogo?.fontFamily,
    color: palette.common.black,
  }),
);
