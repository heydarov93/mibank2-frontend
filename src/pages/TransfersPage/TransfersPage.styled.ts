import { Box, styled, Typography } from '@mui/material';

export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    padding: spacing(4),
    border: `1px solid ${palette.grey[100]}`,
    borderRadius: '8px',
    boxShadow: `0px 4px 24px 0px ${palette.shadow.shadowLight}`,
  }),
);

export const StyledTitle = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '26px',
    fontWeight: 600,
    color: palette.common.black,
  }),
);