import { Box, List, styled, Typography } from '@mui/material';

export const MainContainer = styled(Box)(({ theme: { palette, spacing } }) => ({
  backgroundColor: palette.primary.light,
  padding: spacing(4),
}));

export const StyledHeader = styled(Typography)(
  ({ theme: { palette, typography, spacing } }) => ({
    color: palette.common.black,
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: spacing(4),
  }),
);

export const StyledDepositList = styled(List)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  height: 'min-content',
  padding: 0,
  overflow: 'auto',
}));
