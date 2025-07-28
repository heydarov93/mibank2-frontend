import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const PrimaryHeader = styled(Typography)(
  ({ theme: { typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: '600',
    fontSize: '26px',
    lineHeight: '28px',
  }),
);

export const SecondaryHeader = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '18px',
    fontWeight: '600',
    color: palette.grey[400],
    lineHeight: '28px',
  }),
);
