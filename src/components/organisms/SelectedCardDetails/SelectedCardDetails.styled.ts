import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    height: 'fit-content',
    backgroundColor: palette.common.white,
    borderRadius: '12px',
    padding: spacing(5),
    boxShadow: `0 4px 24px 0 ${palette.shadow.shadowLight}`,
    border: `1px solid ${palette.border.lightBlue}`,
  }),
);

export const StyledHeader = styled(Box)(({ theme: { spacing } }) => ({
  marginBottom: spacing(5),
}));

export const StyledTitle = styled(Typography)(
  ({ theme: { spacing, typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '26px',
    color: palette.common.black,
    marginBottom: spacing(2),
    lineHeight: '125%',
    fontWeight: 600,
  }),
);

export const StyledPrimaryLabel = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '18px',
    color: palette.common.black,
    lineHeight: '28px',
    fontWeight: 600,
  }),
);


