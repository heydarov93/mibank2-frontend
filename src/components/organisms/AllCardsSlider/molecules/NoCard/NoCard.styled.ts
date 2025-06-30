import { Box, Button, styled } from '@mui/material';

export const StyledEmptyContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StyledAddButton = styled(Button)(
  ({ theme: { spacing, palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '100%',

    height: '55px',
    minWidth: '140px',
    padding: spacing(1, 2),
    backgroundColor: palette.primary.main,
    color: palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing(1),
    marginTop: spacing(3),
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  }),
);
