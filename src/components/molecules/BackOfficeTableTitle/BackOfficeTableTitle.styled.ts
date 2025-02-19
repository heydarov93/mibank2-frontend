import { styled, Typography } from '@mui/material';

export const StyledTableTitle = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontSize: typography.mediumLogo?.fontSize,
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    color: palette.grey[400],
  }),
);
