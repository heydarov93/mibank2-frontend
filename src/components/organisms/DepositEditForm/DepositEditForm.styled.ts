import { Box, styled, Typography } from '@mui/material';

export const StyledContainer = styled(Box)(
  ({ theme: { spacing, palette } }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: spacing(5),
    borderRadius: spacing(1),
    gap: spacing(4),
    border: `1px solid ${palette.grey[300]}`,
    backgroundColor: palette.common.white,
    minWidth: '500px',
    maxHeight: '650px',
    position: 'absolute',
    top: '60px',
    left: '300px',
    overflowY: 'scroll',
  }),
);

export const StyledHeader = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontSize: '26px',
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.common.black,
    fontWeight: '600',
  }),
);

export const StyledLabel = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: typography.mediumLogo?.fontSize,
    colort: palette.common.black,
    fontWeight: '500',
  }),
);
