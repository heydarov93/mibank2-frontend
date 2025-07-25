import { Box, styled, Typography } from '@mui/material';

export const StyledItemsCountContainer = styled(Box)(
  ({ theme: { spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing(2.25),
  }),
);

export const StyledPageCountContainer = styled(Box)(
  ({ theme: { palette } }) => ({
    border: `1px solid ${palette.primary.main}`,
    backgroundColor: palette.primary.light,
    padding: '10px',
    width: '40px',
    height: '36px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
  }),
);

export const StyledActionsContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(5),
}));

export const StyledPageCountIndicator = styled(Box)(
  ({ theme: { spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing(1),
  }),
);

export const StyledNavButtonRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
}));

export const StyledSecondaryText = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontSize: typography.mediumLogo?.fontSize,
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.grey[400],
    fontWeight: '500',
  }),
);
