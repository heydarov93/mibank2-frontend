import { Box, IconButton, styled, Typography } from '@mui/material';

export const StyledInputsColumn = styled(Box)(({ theme: { spacing } }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(2),
}));

export const StyledCurrencyText = styled(Typography)(
  ({ theme: { typography, palette, spacing } }) => ({
    color: palette.grey[400],
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    fontSize: typography.mediumLogo?.fontSize,
    letterSpacing: 0,
    marginTop: spacing(1),
  }),
);

export const StyledIconButton = styled(IconButton)(
  ({ theme: { palette } }) => ({
    position: 'absolute',
    top: '50%',
    left: 'min(50%, 160px)',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    borderRadius: '8px',
    backgroundColor: palette.primary.main,
    color: palette.common.white,
    '&:hover': {
      backgroundColor: palette.primary.main,
    },
  }),
);

export const StyledTitle = styled(Typography)(
  ({ theme: { palette, spacing } }) => ({
    color: palette.common.black,
    fontFamily: 'Urbanist',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '28px',
    marginBottom: spacing(1.75),
  }),
);
