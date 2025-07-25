import { styled, Typography } from "@mui/material";

export const StyledMainText = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    color: palette.common.black,
    lineHeight: '24px',
    letterSpacing: 0,
    fontSize: '16px',
  }),
);

export const StyledSecondaryText = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    color: palette.grey[400],
    lineHeight: '24px',
    letterSpacing: 0,
    fontSize: '16px',
  }),
);
